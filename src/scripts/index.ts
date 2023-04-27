import { parse } from "node-html-parser"
import { train_line_list } from "./train_line_list";
import { train_line_url } from "./train_line_list"
const himalaya = require("himalaya");

export function getTrainDelaying(line: string): string {
    const url: string | undefined = train_line_url.get(line);
    const param: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
        "method": "get"
    }
    const response: GoogleAppsScript.URL_Fetch.HTTPResponse = UrlFetchApp.fetch(url!, param);
    return response.getContentText('UTF-8')
}

export function parseDelayingData(line: string) {
    const html: string = getTrainDelaying(line);
    const parsed = parse(html).querySelector("#mdServiceStatus")?.toString();

    // クソカスの構造過ぎてだめ、イレギュラーな html が飛んできたら終わりだとはわかっている
    const data = himalaya.parse(parsed)[0]["children"][0]["children"];
    const title = data[0]["children"][1]["content"];
    const description = data[1]["children"][0]["children"][0]["content"];

    return [title, description];
}

export function genFields() {
    let fields = [];

    for (let i = 0; i < train_line_list.length; i++) {
        const train_line = train_line_list[i];
        const parsed_html = parseDelayingData(train_line);
        const title: string = parsed_html[0];
        const description: string = parsed_html[1];

        const json = {
            "name": train_line + "(" + title + ")",
            "value": description,
            "inline": false
        }

        fields.push(json);
    }

    return fields;
}

export function postToDiscord() {
    // PropertiesService.getDocumentProperties().setProperty("discord", "insert_your_webhook_url");

    const discord_url: string | null = PropertiesService.getDocumentProperties().getProperty("discord");

    const message = {
        "embeds": [
            {
                "title": "遅延情報",
                "fields": genFields()
            }
        ]
    }

    const param: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
        "method": "post",
        "headers": { 'Content-type': "application/json" },
        "payload": JSON.stringify(message)
    }

    UrlFetchApp.fetch(discord_url!, param);
}

export function main() {
    postToDiscord();
}
