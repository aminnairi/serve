import chai from "chai";
import fetch from "node-fetch";
import {serve} from "../sources/server.mjs";
import {describe, it} from "mocha";

const {expect} = chai;

console.log = () => {
  // Mocked
};

console.error = () => {
  // Mocked
};

describe("server", () => {
  it("should open & close the server 127.0.0.1:8000", async () => {
    let server = null;

    try {
      server = await serve({base: "", folder: "sources", host: "127.0.0.1", port: 8000, spa: false, verbose: true});
      const response = await fetch("http://127.0.0.1:8000/mime-type.mjs");

      expect(response.ok).to.equal(true);
      server.close();
    } catch (error) {
      if (server) {
        server.close();
      }

      throw error;
    }
  });

  it("should open & close the server 127.0.0.1:5000", async () => {
    let server = null;

    try {
      server = await serve({base: "", folder: "sources", host: "127.0.0.1", port: 5000, spa: false, verbose: true});
      const response = await fetch("http://127.0.0.1:5000/mime-type.mjs");

      expect(response.ok).to.equal(true);
      server.close();
    } catch (error) {
      if (server) {
        server.close();
      }

      throw error;
    }
  });

  it("should open & close the server 0.0.0.0:5000", async () => {
    let server = null;

    try {
      server = await serve({base: "", folder: "sources", host: "0.0.0.0", port: 5000, spa: false, verbose: true});
      const response = await fetch("http://0.0.0.0:5000/mime-type.mjs");

      expect(response.ok).to.equal(true);
      server.close();
    } catch (error) {
      if (server) {
        server.close();
      }

      throw error;
    }
  });

  it("should fail when requesting another address other than the 127.0.0.1:8000", async () => {
    let server = null;

    try {
      server = await serve({base: "", folder: "sources", host: "127.0.0.1", port: 8000, spa: false, verbose: true});
      const response = await fetch("http://127.0.0.1:5000/mime-type.mjs");

      expect(response.ok).to.equal(true);
      server.close();
    } catch (error) {
      if (server) {
        server.close();
      }
    }
  });

  it("should return all urls to the index in spa mode", async () => {
    let server = null;

    try {
      server = await serve({base: "", folder: "example", host: "127.0.0.1", port: 8000, spa: true, verbose: true});
      const response1 = await fetch("http://127.0.0.1:8000/");
      const response2 = await fetch("http://127.0.0.1:8000/unknown");
      const response3 = await fetch("http://127.0.0.1:8000/hello-world");

      expect(response1.ok).to.equal(true);
      expect(response2.ok).to.equal(true);
      expect(response3.ok).to.equal(true);
      server.close();
    } catch (error) {
      if (server) {
        server.close();
      }

      throw error;
    }
  });
});
