import {describe, it} from "mocha";
import chai from "chai";
import {serve} from "../sources/server.mjs";
import fetch from "node-fetch";

const {expect} = chai;

console.log = () => {};

describe("server", () => {
  it("should open & close the server 127.0.0.1:8000", async () => {
    let server;

    try {
      server = await serve({folder: "sources", host: "127.0.0.1", port: 8000, verbose: true});
      const response = await fetch("http://127.0.0.1:8000/mime-type.mjs");

      expect(response.ok).to.be.true;
      server.close();
    } catch (error) {
      server.close();
      throw error;
    }
  });

  it("should open & close the server 127.0.0.1:5000", async () => {
    let server;

    try {
      server = await serve({folder: "sources", host: "127.0.0.1", port: 5000, verbose: true});
      const response = await fetch("http://127.0.0.1:5000/mime-type.mjs");

      expect(response.ok).to.be.true;
      server.close();
    } catch (error) {
      server.close();
      throw error;
    }
  });

  it("should open & close the server 0.0.0.0:5000", async () => {
    let server;

    try {
      server = await serve({folder: "sources", host: "0.0.0.0", port: 5000, verbose: true});
      const response = await fetch("http://0.0.0.0:5000/mime-type.mjs");

      expect(response.ok).to.be.true;
      server.close();
    } catch (error) {
      server.close();
      throw error;
    }
  });

  it("should fail when requesting another address other than the 127.0.0.1:8000", async () => {
    let server;

    try {
      server = await serve({folder: "sources", host: "127.0.0.1", port: 8000, verbose: true});
      const response = await fetch("http://127.0.0.1:5000/mime-type.mjs");

      expect(response.ok).to.be.false;
      server.close();
    } catch (error) {
      server.close();
    }
  });
});
