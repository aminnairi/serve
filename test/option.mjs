import {describe, it} from "mocha";
import chai from "chai";
import {getOptionValue} from "../sources/option.mjs";

const {expect} = chai;

describe("getOptionValue", () => {
  it("should get the correct parameter value", () => {
    const options = ["--folder", "public"];
    expect(getOptionValue({name: "--folder", fallback: null, boolean: false, options})).to.equal("public");
  });

  it("should return the fallback if the parameter value is not found", () => {
    const options = ["--folder"];
    expect(getOptionValue({name: "--folder", fallback: null, boolean: false, options})).to.equal(null);
  });

  it("should return the fallback if the parameter is not found", () => {
    const options = [];
    expect(getOptionValue({name: "--folder", fallback: null, boolean: false, options})).to.equal(null);
  });

  it("should return the fallback if the parameter is not found", () => {
    const options = [];
    expect(getOptionValue({name: "--folder", fallback: null, boolean: false, options})).to.equal(null);
  });

  it("should return the fallback if the parameter is not found", () => {
    const options = [];
    expect(getOptionValue({name: "--folder", fallback: null, boolean: false, options})).to.equal(null);
  });

  it("should return true if the parameter is a boolean", () => {
    const options = ["--verbose"];
    expect(getOptionValue({name: "--verbose", fallback: false, boolean: true, options})).to.equal(true);
  });

  it("should return false if the parameter is a boolean not found", () => {
    const options = [];
    expect(getOptionValue({name: "--verbose", fallback: false, boolean: true, options})).to.equal(false);
  });
});
