const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage", function () {
  let simpleStorageFactory, simpleStorage;

  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("Should start with a favorite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";
    assert.equal(currentValue.toString(), expectedValue);
    // example of test written with expect
    // expect(currentValue.toString()).to.equal(expectedValue);
  });
  it("Should update when we call store", async function () {
    const expectedValue = "7";
    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait(1);

    const currrentValue = await simpleStorage.retrieve();
    assert.equal(currrentValue.toString(), expectedValue);
  });
  it("Should update when we call addPerson", async function () {
    const name = "Long";
    const favoriteNum = 10;
    const expectedValue = favoriteNum;
    const transactionResponse = await simpleStorage.addPerson(
      name,
      favoriteNum
    );
    await transactionResponse.wait(1);
    const currentValue = await simpleStorage.nameToFavoriteNumber(name);
    assert.equal(currentValue, expectedValue);
  });
});
