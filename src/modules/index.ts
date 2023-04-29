import { parse } from "node-html-parser"
import { train_line_list } from "./train_line_list";
import { train_line_url } from "./train_line_list"
const himalaya = require("himalaya");

export function newTrigger(): void {
    for (let trigger of ScriptApp.getScriptTriggers()) {
        let function_name: string = trigger.getHandlerFunction();
        if (function_name == "main" || function_name == "newTrigger") ScriptApp.deleteTrigger(trigger);
    }

    let now: Date = new Date();
    let time: number[][] = [[7, 30], [8, 0], [8, 30]];

    for (let i = 0; i < 3; i++) {
        let date: Date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, time[i][0], time[i][1]);
        ScriptApp.newTrigger("main").timeBased().at(date).create();
    }
    let trigger_date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 19, 0);
    ScriptApp.newTrigger("newTrigger").timeBased().at(trigger_date).create();
}

export function getTrainDelaying(line: string): string {
    const url: string | undefined = train_line_url.get(line);
    const param: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
        "method": "get"
    }
    const response: GoogleAppsScript.URL_Fetch.HTTPResponse = UrlFetchApp.fetch(url!, param);
    return response.getContentText('UTF-8');
}

export function parseDelayingData(line: string): string[] {
    const html: string = getTrainDelaying(line);
    const parsed = parse(html).querySelector("#mdServiceStatus")?.toString();

    // クソカスの構造過ぎてだめ、イレギュラーな html が飛んできたら終わりだとはわかっている
    const data = himalaya.parse(parsed)[0]["children"][0]["children"];
    const title = data[0]["children"][1]["content"];
    const description = data[1]["children"][0]["children"][0]["content"];

    return [title, description];
}

export function titleBuilder() {
    let title: string = "遅延情報 ";
    const date: Date = new Date();
    title += "(" + Utilities.formatDate(date, "JST", "M/dd") + " " + String(date.getHours()) + ":" + String(date.getMinutes()) + " 現在)";
    return title;
}

export function fieldsBuilder() {
    let fields: Embed[] = [];

    for (let i = 0; i < train_line_list.length; i++) {
        const train_line: string = train_line_list[i];
        const parsed_html = parseDelayingData(train_line);
        let title: string = parsed_html[0];
        if (title != "平常運転") title += "⚠";
        const description: string = parsed_html[1];

        const json: Embed = {
            "name": train_line + "(" + title + ")",
            "value": description,
            "inline": false
        }

        fields.push(json);
    }

    return fields;
}

export function postToDiscord(): void {
    // PropertiesService.getDocumentProperties().setProperty("discord", "insert_your_webhook_url");

    const discord_url: string | null = PropertiesService.getDocumentProperties().getProperty("discord");

    const message: DiscordMessage = {
        "embeds": [
            {
                "title": titleBuilder(),
                "fields": fieldsBuilder()
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

export function main(): void {
    postToDiscord();
}
