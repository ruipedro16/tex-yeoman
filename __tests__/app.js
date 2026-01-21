"use strict";
const path = require("path");
// F: const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-tex-yeoman:app", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts({ someAnswer: true });
  });

  // F: it("creates files", () => {
  // F:   assert.file(["dummyfile.txt"]);
  // F: });
});
