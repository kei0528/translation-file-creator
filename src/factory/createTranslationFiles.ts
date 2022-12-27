import fs from "fs";
import fsPromise from "fs/promises";
import { TranslationProcessed } from "../types/translation.type";

/**
 * Create Tranlation files and drop these into ./translations directory
 * @param translations
 */
export const createTranslationFiles = async (translations: TranslationProcessed) => {
  // Create translation directory if it doesn't exists. This is the directory where translation files get dropped
  const dir = "./translations";
  if (fs.existsSync(dir)) {
    await fsPromise.rmdir(dir, { recursive: true });
  }
  fs.mkdirSync(dir);

  // Create files
  await Promise.all(
    translations.map(async (translation) => {
      const contentAsString = JSON.stringify(translation.contents);

      await fs.writeFileSync(
        `${dir}/${translation.lang}.js`,
        ` /* Translation for ${translation.lang} */
      export default ${contentAsString}
      `
      );
    })
  );
};
