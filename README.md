# Time Table Posting bot for Discord

## Description
This Discord bot is designed to post an embedded schedule from a schedule registered on a Google Spreadsheet (see example.xlsx) to a channel via webhook.

## Demo
![Demo](https://user-images.githubusercontent.com/49436968/232452515-ea5d1836-5795-4b22-a4f3-61dc1c563267.png)


## Requirement
- Node.js
- yarn 
- Typescript
- Clasp (Command Line Apps Script Projects)

## Usage

Please create a .clasp.json file in the following format:

``` json
{
    "scriptId": "INSERT YOUR SCRIPT ID",
    "rootDir": "./dist/"
}
```
To use this code in a Google Apps Script project after registering the script ID, please execute the following command:

``` shell
yarn build
clasp push
```

Please create a similar file using the attached example.xlsx as a template, and remember to enter the Webhook URL in the property service when doing so, as it should work.

## License
[GPL 3.0](https://github.com/Kyure-A)

## Author
[Kyure-A](https://github.com/Kyure-A)
