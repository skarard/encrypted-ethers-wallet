import { expect } from "chai";
import hre from "hardhat";
import mockStdin from "mock-stdin";
import testConsole from "test-console";
import { main } from "../src/index";
const stdin = mockStdin.stdin();
const stdout = testConsole.stdout;

describe("Main", function () {
  it("should request user password input", async function () {
    const output = stdout.inspectSync(main);

    expect(output[output.length - 1].toString()).to.be.eq("Enter password: ");
  });
});
