import chai from "chai";
import {describe, it} from "mocha";
import {removeLeading, removeTrailing} from "../sources/string.mjs";

const {expect} = chai;

describe("string", () => {
  describe("removeLeading", () => {
    it("should remove the leading text", () => {
      const result = removeLeading("/", "/api");
      const expectation = "api";

      expect(result).to.equal(expectation);
    });
  });

  describe("removeTrailing", () => {
    it("should remove the trailing text", () => {
      const result = removeTrailing("/", "api/");
      const expectation = "api";

      expect(result).to.equal(expectation);
    });
  });
});
