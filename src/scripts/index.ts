import { parse } from "node-html-parser"

export function getTrainDelaying(): string {
    // const url: string = "https://transit.yahoo.co.jp/diainfo/area/6" // 関西エリア
    const url: string = "https://transit.yahoo.co.jp/diainfo/279/0"; // narasen
    const param: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
        "method": "get"
    }
    const response: GoogleAppsScript.URL_Fetch.HTTPResponse = UrlFetchApp.fetch(url, param);
    return response.getContentText('UTF-8')
}

export function parseDelayingData(html: string = getTrainDelaying()) {
    const parsed_html = parse(html).querySelector("#mdServiceStatus");
    return parsed_html;
}

export function test() {
    const json = parseDelayingData();
    console.log(json);
}

export function main() {
    // PropertiesService.getDocumentProperties().setProperty("discord", "insert_your_webhook_url");

    const discord_url: string | null = PropertiesService.getDocumentProperties().getProperty("discord");

    const message = {
        "embeds": [
            {
                "title": "",
                "fields": ""
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
