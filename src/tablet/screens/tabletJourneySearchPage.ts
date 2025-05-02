import { Locator, Page, expect } from "@playwright/test";

export default class TabletJourneySearchPage {

  private continueWithSmartSaverButton: Locator;
  private samrtFare: Locator;
  private premiumFare: Locator;
  private trainsFound: Locator;
  private sortBy: Locator;
  private select: Locator;

  constructor(public page: Page) {
    this.continueWithSmartSaverButton = this.page.getByRole('button', { name: 'Continue with SMART Saver' });
    this.samrtFare = this.page.getByRole('button', { name: 'Smart wifi  +1 Comfortable' });
    this.premiumFare = this.page.getByRole('button', { name: 'Premium wifiglassapple' });
    this.trainsFound = this.page.getByRole('heading', { name: 'trains found' });
    this.sortBy = this.page.getByRole('combobox', { name: 'Sort by' });
    this.select = this.page.getByRole('button', { name: 'Select', exact: true });
  }

  async selectSmartTrain(): Promise<void> {
    const trainSelector = '.blte-price-item-desktop--class-smart';
    try {

      const trainButtons = await this.page.locator(trainSelector).elementHandles();
      for (const button of trainButtons) {
        const isDisabled = await button.evaluate((btn: HTMLElement) => btn.hasAttribute("disabled"));
        if (!isDisabled) {
          await button.click();
          return; 
        }
      } 
    } catch (error) {
      console.error('Error selecting Smart Train:', error);
      throw error;
    }
  }

  async selectPremiumTrain(): Promise<void> {
    const trainSelector = ".blte-price-item--class-premium";
    try {
      const trainButtons = await this.page.locator(trainSelector).elementHandles();
      for (const button of trainButtons) {
        const isDisabled = await button.evaluate((btn: HTMLElement) => btn.hasAttribute("disabled"));
        if (!isDisabled) {
          await button.click();
          return;
        }
      }
    } catch (error) {
      console.error('Error selecting Premium Train:', error);
      throw error;
    }
  }

 async selectSmartSaverTrain(): Promise<void> {
  const trainSelector = ".blte-price-item-desktop--class-smart";
  const smartSaverButton = this.page.locator("#smartSaverSelectButton");
  try {
    const trainButtons = await this.page.locator(trainSelector).elementHandles();
    for (const button of trainButtons) {
      const isDisabled = await button.evaluate((btn: HTMLElement) => btn.hasAttribute("disabled"));
      await this.page.waitForSelector('.blte-price-item-desktop--class-smart'); // waits until the selector is visible
      if (!isDisabled) {
        await button.click();
        if (await smartSaverButton.isEnabled()) {
          await smartSaverButton.click(); 
        } else {
          console.warn("Smart Saver button is not enabled after selecting train.");
        }
        return; 
      }
    }
  } catch (error) {
    throw error;
  }
}

  
  async clickSelect(): Promise<void> {
    await this.select.click();
  }

  async continueWithSmartSaver(): Promise<void> {
    await this.continueWithSmartSaverButton.click();
  }

  async assertSmartFare(): Promise<void> {
    await expect(this.samrtFare).toBeVisible();
  }
  async assertPremiumFare(): Promise<void> {
    await expect(this.premiumFare).toBeVisible();
  }
  async assertTrainsFound(): Promise<void> {
    await expect(this.trainsFound).toBeVisible();
  }
  async assertSortBy(): Promise<void> {
    await expect(this.sortBy).toBeVisible();
  }
}
