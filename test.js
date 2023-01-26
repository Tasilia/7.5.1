const { clickElement, getText } = require("./lib/commands.js");

let page;

afterEach(() => {
  page.close();
});
beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php");
});

describe("ticketBooking", () => {
  test("should book a ticket today", async () => {
    await clickElement(
      page,
      ".movie-seances__time:not(.acceptin-button-disabled)"
    );
    await page.waitForSelector(".buying__info-title", {
      visible: true,
    });
    await clickElement(
      page,
      ".buying-scheme__row span:not(.buying-scheme__chair_taken)"
    );
    await clickElement(page, "button.acceptin-button");
    await page.waitForSelector(".ticket__check-title", {
      visible: true,
    });
    expect(await getText(page, ".ticket__check-title")).toEqual(
      "ВЫ ВЫБРАЛИ БИЛЕТЫ:"
    );
  });

  test("should book a ticket tomorrow", async () => {
    const data = await getText(
      page,
      ".page-nav__day:nth-of-type(2) .page-nav__day-number"
    );
    await clickElement(page, ".page-nav__day:nth-of-type(2)");
    await clickElement(
      page,
      ".movie-seances__time:not(.acceptin-button-disabled)"
    );
    await page.waitForSelector(".buying__info-title", {
      visible: true,
    });
    await clickElement(
      page,
      ".buying-scheme__row span:not(.buying-scheme__chair_taken)"
    );
    await clickElement(page, "button.acceptin-button");
    await page.waitForSelector(".ticket__check-title", {
      visible: true,
    });
    expect(await getText(page, ".ticket__check-title")).toEqual(
      "ВЫ ВЫБРАЛИ БИЛЕТЫ:"
    );
    expect(
      await getText(page, ".ticket__info:nth-of-type(4) .ticket__details")
    ).toContain(data);
  });

  test("choice of reserved seat", async () => {
    await clickElement(
      page,
      ".movie-seances__time:not(.acceptin-button-disabled)"
    );
    await page.waitForSelector(".buying__info-title", {
      visible: true,
    });
    await clickElement(page, ".buying-scheme__chair_taken");
    const actual = await page.$eval(
      "button.acceptin-button",
      (el) => el.disabled
    );
    expect(actual).toEqual(true);
  });
});
