import writeEncryptedWallet from "./writeEncryptedWallet";
import readEncryptedWallet from "./readEncryptedWallet";
import { createInterface } from "node:readline";
import { Writable } from "node:stream";

const nonMutableCharacters = ["\x1B[1G", "\x1B[0J", "\x1B[25G", "\r\n", "\n"];
export var muteStdout = false;

var mutableStdout = new Writable({
  write: function (chunk, encoding, callback) {
    const isPrompt = chunk.toString() === rl.getPrompt();
    const isNonMutable = nonMutableCharacters.includes(chunk.toString());
    const parsedChunk = muteStdout
      ? !(isPrompt || isNonMutable)
        ? Buffer.from("")
        : chunk
      : chunk;
    process.stdout.write(parsedChunk, encoding);
    callback();
  },
});

export const question = async (query: string, mute: boolean = false) => {
  try {
    muteStdout = mute;
    return await new Promise((resolve: (value: string) => void) => {
      rl.question(query, resolve);
    });
  } finally {
    muteStdout = false;
  }
};

export const rl = createInterface({
  input: process.stdin,
  output: mutableStdout,
  terminal: true,
});

export { writeEncryptedWallet, readEncryptedWallet };
