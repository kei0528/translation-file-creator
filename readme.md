# Translation Creator

## About

It’s a program that creates JS translation files based on Notion Database.
[Video about how it works](https://youtu.be/JKmkW1YMgYE)

---

## Getting Started

### 1. Set up Notion Integration Token

Notion’s admin user have to create an integration and get the integration token that we need for using Notion API.

[Start building with the Notion API](https://developers.notion.com/docs/create-a-notion-integration)

If you get a key, create .env file in root directory and paste this:

```bash
# .env
NOTION_TOKEN=secret_NOTION_INTEGRATION_TOKEN # Don't forget to put secret_ in the beginning
```

### 2. Create a translation database

The database’s format must be like this ↓ If you don’t need all of these languages, you can just delete the column. It’s important, that the first column’s title is “**Key**”. An empty table row or an empty key might cause error.

### 3. Connect with Integration

1. Go to the database page in your workspace.
2. Click the **`••`**on the top right corner of the page.
3. At the bottom of the pop-up, click `Add connections`.
4. Search for and select your integration in the `Search for connections...` menu.

Your integration now has permission to edit the database.

### 4. Getting database ID

You can find this id from database’s share link.

Click on “Share” → “Copy link”. Then you copied something like this: https://www.notion.so/username/DATABASE_ID?v=123123123. The strings between username/ and ?v is database id.

<img src="/public/images/screenshot.png" width="400">

### 5. Starting program

The program is made with TypeScript. So at first time, you need to install packages with `npm i`. If the installation is completed, you can hit `node .` to the console.

The CLI asks you for database id. Hit the database id and you can find the translation files inside `translations` folder. Extracted translation file has same format as we use right now. So we can keep all our currently used functions.

---

## Features

Table value with text-styling or/and link will be extracted as span or a element with style attribute.

You can also use any kind of string. /“@< >… Every string works so far. If needed, these strings can also be used as key value.

## Handling Error

There are few things that causes error.

1. **Empty table row**

| Key    | de-DE     |
| ------ | --------- |
| potato | Kartoffel |
|        |           |

↓

| Key    | de-DE     |
| ------ | --------- |
| potato | Kartoffel |

1. **Wrong key title**

| Title  | de-DE     |
| ------ | --------- |
| potato | Kartoffel |

↓

| Key    | de-DE     |
| ------ | --------- |
| potato | Kartoffel |

## Used Techs

- TypeScript 4.9.4
