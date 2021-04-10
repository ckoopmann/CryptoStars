const assert = require("assert");
const { Blockchain } = require("../src/blockchain.js");
const { Block } = require("../src/block.js");

describe("Test Blockchain: ", () => {
  let blockchain = new Blockchain();
  let testData = "testdata"
  let block = new Block(testData)

  it("Has initial height of zero", () => {
    assert.equal(blockchain.height, 0);
  });

  it("can add new block", async () => {
    await blockchain._addBlock(block)
    assert.equal(blockchain.height, 1);
    // The height attribute of the block object itslef (as well as other ones) is also changed
    assert.equal(block.height, 1)
  });

});
