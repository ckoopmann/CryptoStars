const assert = require("assert");
const { Blockchain } = require("../src/blockchain.js");
const { Block } = require("../src/block.js");
const bitcoinMessage = require("bitcoinjs-message");
const bitcoin = require("bitcoinjs-lib"); // v4.x.x

describe("Test Blockchain: ", () => {
  let blockchain = new Blockchain();
  let testData = "testdata";
  let block = new Block(testData);
  let keyPair = bitcoin.ECPair.fromWIF(
    "L4rK1yDtCWekvXuE6oXD9jCYfFNV2cWRpVuPLBcCU2z8TrisoyY1"
  );
  let privateKey = keyPair.privateKey;
  let { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });

  it("Has initial height of zero", () => {
    assert.equal(blockchain.height, 0);
  });

  it("can add new block", async () => {
    await blockchain._addBlock(block);
    assert.equal(blockchain.height, 1);
    // The height attribute of the block object itslef (as well as other ones) is also changed
    assert.equal(block.height, 1);
  });

  it("can request message", async () => {
    const message = await blockchain.requestMessageOwnershipVerification(
      address
    );
    assert.equal(typeof message, "string");
    assert(message.includes(address));
  });

  it("can submit star", async () => {
    console.log("Address: ", address);
    const message = await blockchain.requestMessageOwnershipVerification(
      address
    );
    var signature = bitcoinMessage.sign(
      message,
      privateKey,
      keyPair.compressed
    );
    console.log(signature);
    var star = {
      dec: "68° 52' 56.9",
      ra: "16h 29m 1.0s",
      story: "Testing the story 4",
    };

    const block = await blockchain.submitStar(
      address,
      message,
      signature,
      star
    );

    const data = await block.getBData();
    assert.equal(data.owner, address);
  });

  it("returns correct stars for owner", async () => {
    const stars = await blockchain.getStarsByWalletAddress(address);
    assert.equal(stars.length, 1);
  });

  it("returns no stars for non existing owner", async () => {
    const stars = await blockchain.getStarsByWalletAddress("WRONGADDRESS");
    assert.equal(stars.length, 0);
  });
});
