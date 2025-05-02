import { Page, Locator, expect } from "@playwright/test";

export default class ConfirmationPage {

  private points: Locator;
  private rewardsTittle: Locator;
  private emailSent: Locator;
  private emailAddres: Locator;
  private thankYouTittle: Locator;
  private viewTickets: Locator;
  private tripDetailsButton: Locator;
  private blLogo: Locator;
  private tickets: Locator;
  private experience: Locator;
  private destination: Locator;
  private offers: Locator; 
  private travel: Locator;
  private images: Locator;


  constructor(public page: Page) {
    this.points = this.page.locator('.blte-celebration-banner__rewards');
    this.rewardsTittle = this.page.getByRole('img', { name: 'The Brightline Loyalty' });
    this.emailSent = this.page.getByText('Your tickets have been sent');
    this.emailAddres = this.page.getByText('lsallauka+1@bltrain.com');
    this.thankYouTittle = this.page.getByText('Thank you for your purchase!');
    this.viewTickets = this.page.getByRole('link', { name: ' View tickets' });
    this.tripDetailsButton = this.page.getByRole('link', { name: ' Trip details' });
    this.blLogo = this.page.getByRole('link', { name: 'Brightline', exact: true });
    this.tickets = this.page.getByRole('button', { name: 'TICKETS & TRAVEL' });
    this.experience = this.page.getByRole('button', { name: 'EXPERIENCE' });
    this.destination = this.page.getByRole('button', { name: 'DESTINATIONS' });
    this.offers = this.page.getByRole('link', { name: 'OFFERS' });
    this.travel = this.page.getByRole('link', { name: 'TRAVEL ADVISORS' });
    this.images = this.page.getByRole('region', { name: 'Carousel :r0:' });
  }

  async assertConfirmationElements(): Promise<void> {
    await Promise.all([
      expect.soft(this.blLogo).toBeVisible(),
      expect.soft(this.tickets).toBeVisible(),
      expect.soft(this.experience).toBeVisible(),
      expect.soft(this.destination).toBeVisible(),
      expect.soft(this.travel).toBeVisible(),
      expect.soft(this.images).toBeVisible(),
      expect.soft(this.offers).toBeVisible(),
      expect.soft(this.points).toBeVisible(),
      expect.soft(this.rewardsTittle).toBeVisible(),
      expect.soft(this.emailAddres).toBeVisible(),
      expect.soft(this.emailSent).toBeVisible(),
      expect.soft(this.thankYouTittle).toBeVisible(),
      expect.soft(this.viewTickets).toBeVisible(),
    ]);
  }
  

  async clickTripDetailsButton(): Promise<void> {
    await expect.soft(this.tripDetailsButton).toBeVisible();
    await this.tripDetailsButton.click({ timeout: 10000 });
   }

  
}

