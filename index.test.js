const { rejects, deepStrictEqual } = require('assert');

const { error } = require('./src/constants');
const File = require('./src/file');

(async () => {
  {
    const filePath = './mocks/emptyFile-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }

  {
    const filePath = './mocks/fourItems-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }

  {
    const filePath = './mocks/threeItems-valid.csv';
    const result = await File.csvToJson(filePath);
    const expected = [
      {
        id: 123,
        name: 'João Melo',
        profession: 'JavaScript Developer',
        birthDay: 2003,
      },
      {
        id: 321,
        name: 'Erick Wendel',
        profession: 'JavaScript Instructor',
        birthDay: 1996,
      },
      {
        id: 324,
        name: 'John Doe',
        profession: 'Java Developer',
        birthDay: 1991,
      },
    ];

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();
