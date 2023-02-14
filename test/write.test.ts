import { expect } from "chai";
import hre from "hardhat";
import mockStdin from "mock-stdin";
import testConsole from "test-console";
import write from "../src/writeEncryptedWallet";
const stdin = mockStdin.stdin();
const stdout = testConsole.stdout;

describe("Write", function () {
  it("should request user password input", async function () {
    const output = stdout.inspectSync(write);

    expect(output[output.length - 1].toString()).to.be.eq("Enter password: ");
  });
});
