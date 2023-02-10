import { Wallet } from "ethers";
import { createInterface } from "node:readline";
import { Writable } from "node:stream";
import { writeFileSync } from "node:fs";

var mutableStdout = new Writable({
  write: function (chunk, encoding, callback) {
    if (chunk.toString() === rl.getPrompt())
      process.stdout.write(chunk, encoding);
    callback();
  },
});

const rl = createInterface({
  input: process.stdin,
  output: mutableStdout,
  terminal: true,
});

const question = (query: string) =>
  new Promise((resolve: (value: string) => void) =>
    rl.question(query, resolve)
  );

const createEncryptWriteWallet = async (password: string) => {
  const wallet = Wallet.createRandom();
  const encryptedWallet = JSON.parse(await wallet.encrypt(password));

  const filename = encryptedWallet["x-ethers"].gethFilename + ".json";
  writeFileSync(filename, JSON.stringify(encryptedWallet));

  return { address: wallet.address, filename };
};

const main = async () => {
  console.log("******************************");
  console.log("* Create an encrypted wallet *");
  console.log("******************************");
  const password = await question("Enter password: ");
  process.stdout.write("\n");
  const confirmedPassword = await question("Confirm password: ");
  process.stdout.write("\n");

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

  rl.close();
};

main()
  .then((_) => process.exit(0))
  .catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
