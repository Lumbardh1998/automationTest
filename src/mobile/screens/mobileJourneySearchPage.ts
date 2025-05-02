import { Locator, Page, expect } from "@playwright/test";
import { privateDecrypt } from "crypto";

export default class MobileJourneySearchPage {

  private sortBy: Locator;
  private selectDeparture: Locator;
  private selectSmartFare: Locator;
  private selectAndContinue: Locator;
  private editSearch: Locator;
  private premiumFares: Locator;
  private blLogo: Locator;
  private email: Locator;
  private language: Locator;

  constructor(public page: Page) {
    this.sortBy = this.page.getByRole('combobox', { name: 'Sort by' });
    this.selectDeparture = this.page.getByRole('heading', { name: 'Select Departure' });
    this.selectSmartFare = this.page.locator('.blte-fare-compare-selection-item--fareVariant-SMART_STANDARD');
    this.selectAndContinue = this.page.getByRole('button', { name: 'Select and Continue' });
    this.editSearch = this.page.getByRole('button', { name: 'Edit Search' });
    this.premiumFares = this.page.getByRole('heading', { name: 'Premium Fares' });
    this.blLogo = this.page.getByRole('link', { name: 'Brightline Logo' });
    this.email = this.page.getByRole('button', { name: 'lsallauka+' });
    this.language = this.page.getByRole('button', { name: 'English' });
  }
  async assertFarePageElements(): Promise<void> {
    await Promise.all([
      expect.soft(this.editSearch).toBeVisible(),
      expect.soft(this.premiumFares).toBeVisible(),
      expect.soft(this.blLogo).toBeVisible(),
      expect.soft(this.email).toBeVisible(),
      expect.soft(this.language).toBeVisible(),
    ]);
  }
  async clickContinue(): Promise<void> {
    await this.selectAndContinue.click();
  }
  async assertDeparture(): Promise<void> {
    await expect.soft(this.selectDeparture).toBeVisible();
  }
  async selectSmartTrain(): Promise<void> {
    const trainSelector = '.blte-price-item-mobile--class-smart';
    try {
      await this.page.waitForSelector(trainSelector, { timeout: 60000 });
      const trainButtons = await this.page.locator(trainSelector).elementHandles();
      for (const button of trainButtons) {
        const isDisabled = await button.evaluate((btn: HTMLElement) => btn.hasAttribute("disabled"));
        if (!isDisabled) {
          await button.click();
          return;
        }
      }
      throw new Error('No enabled Smart Train buttons found.');
    } catch (error) {
      console.error('Error selecting Smart Train:', error);
      throw error;
    }
  }
  

  async clickSmartFare(): Promise<void> {
    await this.selectSmartFare.click();
  }
  async assertSortBy(): Promise<void> {
    await expect.soft(this.sortBy).toBeVisible();
  }
}
