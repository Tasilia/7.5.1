module.exports = {
  clickElement: async function (page, selector) {
    try {
      const button = await page.$(selector);
      await button.click();
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },
  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (el) => el.innerText);
    } catch (error) {
      throw new Error(`Text is not available for selector: ${selector}`);
    }
  },
};
