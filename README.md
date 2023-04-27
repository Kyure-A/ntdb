# Train Delaying Notification Bot for Discord

## Description
This Discord bot is designed to post an embedded train delaying information to a channel via webhook.

## Demo

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
npm run build
```

Please create a similar file using the attached example.xlsx as a template, and remember to enter the Webhook URL in the property service when doing so, as it should work.

## License
[GPL 3.0](https://github.com/Kyure-A)

## Author
[Kyure-A](https://github.com/Kyure-A)
