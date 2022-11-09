const { error } = require("./src/constants");
const File = require("./src/file");
const { rejects } = require("assert");

(async () => {
  const filePath = "./mocks/threeItems-valid.csv";
  const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
  const result = await File.csvToJson(filePath);
  await rejects(rejection, result);
})();
