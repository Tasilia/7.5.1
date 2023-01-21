const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { clickElement, getText } = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  const data = "";
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`http://qamid.tmweb.ru/client${string}`, {
    setTimeout: 5000,
  });
});

When("user choose time", async function () {
  await clickElement(
    this.page,
    ".movie-seances__time:not(.acceptin-button-disabled)"
  );
});
When("user choose free chair", async function () {
  await this.page.waitForSelector(".buying__info-title", {
    visible: true,
  });
  await clickElement(
    this.page,
    ".buying-scheme__row span:not(.buying-scheme__chair_taken)"
  );
  await clickElement(this.page, "button.acceptin-button");
});

Then("user sees the ticket booking confirmation", async function () {
  await this.page.waitForSelector(".ticket__check-title", {
    visible: true,
  });
  expect(await getText(this.page, ".ticket__check-title")).equal(
    "ВЫ ВЫБРАЛИ БИЛЕТЫ:"
  );
});

When("user choose tomorrow", async function () {
  const data = await getText(this.page, ".page-nav a + a span + span");
  await clickElement(this.page, ".page-nav a + a");
  this.data = data;
});

Then("user sees the data", async function () {
  expect(await getText(this.page, "div p + p + p + p span")).contain(this.data);
});

When("user choose reserved chair", async function () {
  await this.page.waitForSelector(".buying__info-title", {
    visible: true,
  });
  await clickElement(this.page, ".buying-scheme__chair_taken");
  await clickElement(this.page, "button.acceptin-button");
});

Then("user stays on the purchase page", async function () {
  expect(await this.page.$(".buying").visible);
});
