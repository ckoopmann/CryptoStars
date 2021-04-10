const assert = require("assert");
const { Block } = require("../src/block.js");

describe("Test Block: ", () => {
  let block = new Block("Testdata");

  it("Has initial height of zero", () => {
    assert.equal(block.height, 0);
  });

  it("Has initial itmestamp of zero", () => {
    assert.equal(block.time, 0);
  });

  it("Has initial hash of null", () => {
    assert.equal(block.hash, null);
  });

  it("Has initial previous hash of null", () => {
    assert.equal(block.previousBlockHash, null);
  });

  it("Is initially invalid", async () => {
    const validity = await block.validate();
    assert.equal(validity, false);
  });

  it("Is valid after rehashing", async () => {
    block.rehash();
    const validity = await block.validate();
    assert.equal(validity, true);
  });

  it("Block is invalidated when changing height", async () => {
    block.rehash();
    const oldValidity = await block.validate();
    assert.equal(oldValidity, true);

    block.height = 999;
    const validity = await block.validate();
    assert.equal(validity, false);
  });
});
