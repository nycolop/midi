import puppeteer, { Browser, Page } from "puppeteer";
import fs from "fs";

/**
 * Puppeteer custom async browser.
 */
export default class Navigator {
  private browser: Browser | undefined;
  private page: Page | undefined;

  /**
   * Opens the navigator
   *
   * @param viewMode true or false for enabling view mode for the browser.
   */
  async open(viewMode: boolean): Promise<void> {
    if (this.browser && this.page) {
      console.log("Error on open(): browser and page is already open.");
      return;
    }

    this.browser = await puppeteer.launch({ headless: !viewMode });
    this.page = await this.browser.newPage();
  }

  /**
   * Goes to the desired webpage.
   *
   * @param link The link to go.
   */
  async goto(link: string): Promise<void> {
    if (!this.page) {
      console.log("Error on goto(): open the browser first.");
      return;
    }

    await this.page.goto(link);
  }

  /**
   * Closes the browser.
   */
  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      console.log("Browser closed.");
      return;
    }

    console.log("Error on close(): browser it's not running.");
  }

  /**
   * Takes a screenshot in the current webpage.
   *
   * @param folder The name of the folder to save, only local support.
   * @param name The name of the screenshot for saving, without extension.
   */
  async screenshot(folder: string, name: string): Promise<void> {
    if (!this.page) {
      console.log("Error on screenshot(): open the browser first.");
      return;
    }

    if (!fs.existsSync(`./${folder}`)) {
      fs.mkdirSync(`./${folder}`);
    }

    await this.page.screenshot({ path: `./${folder}/${name}.png` });
  }

  /**
   * Executes a function based in the DOM.
   *
   * @param callBack a function to execute in the evaluate, DOM oriented.
   */
  async evaluate(callback: Function): Promise<void> {
    if (!this.page) {
      console.log("Error on evaluate(): Open the browser first.");
      return;
    }

    await this.page.evaluate(() => {
      callback();
    });
  }
}
