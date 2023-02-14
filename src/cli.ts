import { writeEncryptedWallet, readEncryptedWallet } from "./";

(async () => {
  if (process.argv[2] === "-w") writeEncryptedWallet();
  else if (process.argv[2] === "-r") readEncryptedWallet();
  else {
    console.log("Use the flag -w to write and -r to read");
    process.exit(0);
  }
})();
