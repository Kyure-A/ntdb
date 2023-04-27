import { parse } from "himalaya"

function getTrainDelaying(): string {
    const url: string = "https://transit.yahoo.co.jp/diainfo/area/6" // 関西エリア
    const param: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
        "method": "get"
    }
    const response: GoogleAppsScript.URL_Fetch.HTTPResponse = UrlFetchApp.fetch(url, param);
    return response.getContentText('UTF-8')
}

function parseDelayingData(html: string = getTrainDelaying()) {
    const json = parse(html);
    return json;
}

function test() {
    const json = parseDelayingData();
    console.log(json);
}

function main() {
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
