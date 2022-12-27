#! /user/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const nanospinner_1 = require("nanospinner");
const createTranslation_1 = require("./factory/createTranslation");
const createTranslationFiles_1 = require("./factory/createTranslationFiles");
const createTranslationKeys_1 = require("./factory/createTranslationKeys");
const processTranslations_1 = require("./factory/processTranslations");
const notionService_1 = require("./services/notionService");
/* Database ID to test: 26d84dd5177940ddbc04789977298134 */
const runApp = () => __awaiter(void 0, void 0, void 0, function* () {
    const prompt = yield inquirer_1.default.prompt({
        name: "dataBaseId",
        type: "input",
        message: "Please enter database id.",
    });
    const spinner = (0, nanospinner_1.createSpinner)("Creating translations");
    spinner.start();
    try {
        const notionData = yield (0, notionService_1.getNotionDatabase)(prompt.dataBaseId);
        const translations = (0, createTranslation_1.createTranslation)(notionData);
        const keys = (0, createTranslationKeys_1.createTranslationKeys)(notionData);
        if (translations && translations.length !== 0 && keys && keys.length !== 0) {
            const translations_processed = (0, processTranslations_1.processTranslations)(translations, keys);
            yield (0, createTranslationFiles_1.createTranslationFiles)(translations_processed);
            spinner.stop();
        }
    }
    catch (err) {
        console.log("Oops Something is wrong!");
        console.log(err);
    }
});
runApp();
