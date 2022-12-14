const { readFile } = require("fs/promises");
const { join } = require("path");
const { error } = require("./constants.js");
const DEFAULT_OPTION = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"],
};
class File {
  static async csvToJson(filePath) {
    const content = await File.getFileContent(filePath);
    const validation = await File.isValid(content);
    if (!validation.valid) {
      throw new Error(validation.error);
    }
    return content;
  }
  static async getFileContent(filePath) {
    const filename = join(__dirname, filePath);
    return (await readFile(filename)).toString("utf8");
  }
  static async isValid(csvString, options = DEFAULT_OPTION) {
    const [header, ...fileWithoutHeader] = csvString.split("\n\r");
    const isHeaderValid = header === options.fields.join(",");

    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      };
    }
    const isContentLengthAccepted =
      fileWithoutHeader.length > 0 &&
      fileWithoutHeader.length <= options.maxLines;

    if (!isContentLengthAccepted) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false,
      };
    }
  }
}
module.exports = File;
