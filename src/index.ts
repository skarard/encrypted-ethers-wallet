import writeEncryptedWallet from "./writeEncryptedWallet";
import readEncryptedWallet from "./readEncryptedWallet";
import { createInterface } from "node:readline";
import { Writable } from "node:stream";

var mutableStdout = new Writable({
  write: function (chunk, encoding, callback) {
    if (chunk.toString() === rl.getPrompt())
      process.stdout.write(chunk, encoding);
    callback();
  },
});

export const rl = createInterface({
  input: process.stdin,
  output: mutableStdout,
  terminal: true,
});

export { writeEncryptedWallet, readEncryptedWallet };
