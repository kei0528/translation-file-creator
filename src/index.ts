#! /user/bin/env node
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";

import { createTranslation } from "./factory/createTranslation";
import { createTranslationFiles } from "./factory/createTranslationFiles";
import { createTranslationKeys } from "./factory/createTranslationKeys";
import { processTranslations } from "./factory/processTranslations";
import { getNotionDatabase } from "./services/notionService";

/* Database ID to test: 26d84dd5177940ddbc04789977298134 */

const runApp = async () => {
  const prompt = await inquirer.prompt({
    name: "dataBaseId",
    type: "input",
    message: "Please enter database id.",
  });
  const spinner = createSpinner("Creating translations");
  spinner.start();

  try {
    const notionData = await getNotionDatabase(prompt.dataBaseId);
    const translations = createTranslation(notionData);
    const keys = createTranslationKeys(notionData);

    if (translations && translations.length !== 0 && keys && keys.length !== 0) {
      const translations_processed = processTranslations(translations, keys);
      await createTranslationFiles(translations_processed);

      spinner.stop();
    }
  } catch (err) {
    console.log("Oops Something is wrong!");
    console.log(err);
  }
};

runApp();
