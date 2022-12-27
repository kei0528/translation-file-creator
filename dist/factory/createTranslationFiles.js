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
exports.createTranslationFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const promises_1 = __importDefault(require("fs/promises"));
/**
 * Create Tranlation files and drop these into ./translations directory
 * @param translations
 */
const createTranslationFiles = (translations) => __awaiter(void 0, void 0, void 0, function* () {
    // Create translation directory if it doesn't exists. This is the directory where translation files get dropped
    const dir = "./translations";
    if (fs_1.default.existsSync(dir)) {
        yield promises_1.default.rmdir(dir, { recursive: true });
    }
    fs_1.default.mkdirSync(dir);
    // Create files
    yield Promise.all(translations.map((translation) => __awaiter(void 0, void 0, void 0, function* () {
        const contentAsString = JSON.stringify(translation.contents);
        yield fs_1.default.writeFileSync(`${dir}/${translation.lang}.js`, ` /* Translation for ${translation.lang} */
      export default ${contentAsString}
      `);
    })));
});
exports.createTranslationFiles = createTranslationFiles;
