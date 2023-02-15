import { Wallet } from "ethers";
import { writeFile } from "node:fs/promises";
import { rl, question } from "./";

const createEncryptWriteWallet = async (password: string) => {
  const wallet = Wallet.createRandom();
  const encryptedWallet = JSON.parse(await wallet.encrypt(password));

  const filename = encryptedWallet["x-ethers"].gethFilename + ".json";
  await writeFile(filename, JSON.stringify(encryptedWallet));

  return { address: wallet.address, filename };
};

const write = async () => {
  console.log("*****************************");
  console.log("* Write an encrypted wallet *");
  console.log("*****************************");
  const password = await question("Enter password: ", true);
  const confirmedPassword = await question("Confirm password: ", true);
  rl.close();

  if (password.length < 6 || password !== confirmedPassword)
    throw Error(
      "Passwords must be at least 6 characters and match, please start again"
    );

  process.stdout.write("Creating encrypted wallet... ");

  const { address, filename } = await createEncryptWriteWallet(
    confirmedPassword
  );
  console.log("✓");

  console.log("Wallet Address:", address);
  console.log("Encrypted Wallet Filename:", filename);
};

export default write;
