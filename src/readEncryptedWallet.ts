import { Wallet } from "ethers";
import { readFile } from "node:fs/promises";
import { rl, question } from "./";

const readWallet = async (path: string, password: string) => {
  const readBuffer = await readFile(path);
  return await Wallet.fromEncryptedJson(readBuffer.toString(), password);
};

const read = async () => {
  console.log("****************************");
  console.log("* Read an encrypted wallet *");
  console.log("****************************");
  const path = await question("Path to encrypted json: ");
  const password = await question("Enter password: ", true);
  rl.close();

  process.stdout.write("Reading encrypted wallet... ");

  const wallet = await readWallet(path, password);
  console.log("✓");
  console.log("Wallet Address:", wallet.address);

  return wallet;
};

export default read;
