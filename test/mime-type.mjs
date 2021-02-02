import {describe, it} from "mocha";
import chai from "chai";
import {getMimeTypeOr} from "../sources/mime-type.mjs";

const {expect} = chai;

describe("getMimeTypeOr", () => {
  it("should get the correct mime type for HTML", () => {
    expect(getMimeTypeOr("text/plain", "index.html")).to.equal("text/html");
  });

  it("should get the correct mime type for CSS", () => {
    expect(getMimeTypeOr("text/plain", "index.css")).to.equal("text/css");
  });

  it("should get the correct mime type for JavaScript", () => {
    expect(getMimeTypeOr("text/plain", "index.js")).to.equal("application/javascript");
  });

  it("should get the correct mime type for ECMAScript Modules", () => {
    expect(getMimeTypeOr("text/plain", "index.mjs")).to.equal("application/javascript");
  });

  it("should return the fallback type", () => {
    expect(getMimeTypeOr("text/plain", "index.rb")).to.equal("text/plain");
  });
});
