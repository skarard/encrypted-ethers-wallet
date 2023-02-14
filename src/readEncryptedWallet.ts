import { Wallet } from "ethers";
import { readFile } from "node:fs/promises";
import { rl } from "./";

const question = (query: string) =>
  new Promise((resolve: (value: string) => void) =>
    rl.question(query, resolve)
  );

const readWallet = async (path: string, password: string) => {
  const readBuffer = await readFile(path);
  return await Wallet.fromEncryptedJson(readBuffer.toString(), password);
};

const read = async () => {
  console.log("****************************");
  console.log("* Read an encrypted wallet *");
  console.log("****************************");
  const path = await question("Path to encrypted json: ");
  process.stdout.write("\n");
  const password = await question("Enter password: ");
  process.stdout.write("\n");
  rl.close();

  process.stdout.write("Reading encrypted wallet... ");

  const wallet = await readWallet(path, password);
  console.log("✓");
  console.log("Wallet Address:", wallet.address);

  return wallet;
};

export default read;
