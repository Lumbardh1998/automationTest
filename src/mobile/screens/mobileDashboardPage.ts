import {Page, Locator} from "@playwright/test";

export default class MobileDashboardPage {

        private brightLineLogo: Locator;
        private oneWay: Locator;
        private selectFrom: Locator;
        private orlando: Locator;
        private miami: Locator;
        private selectDate: Locator;
        private departureDate: Locator;
        private addGuest: Locator;
        private addAdult: Locator;
        private searchTickets: Locator;
        private continue: Locator;
        private nextButton: Locator;
        private topBanner: Locator;
        private bottomBanner: Locator;

    constructor(public page: Page) {
        this.brightLineLogo = this.page.getByRole('link', { name: 'Brightline', exact: true });
        this.oneWay = this.page.getByRole('button', { name: 'One-way' }).nth(1);
        this.selectFrom = this.page.getByRole('textbox', { name: '*From' });
        this.orlando = this.page.getByRole('option', { name: 'Orlando' }).nth(1);
        this.miami = this.page.getByRole('option', { name: 'Miami' }).nth(0);
        this.selectDate = this.page.getByRole('tabpanel', { name: 'Train Tickets' }).getByLabel('*Departure');
        this.addGuest = this.page.getByRole('button', { name: 'Number of guests 1 Adult' });
        this.addAdult = this.page. getByRole('button', { name: 'increase number of Adults' });
        this.searchTickets = this.page.getByRole('button', { name: 'Search Tickets' }).nth(1);
        this.continue = this.page.getByRole('button', { name: 'Continue' });
        this.nextButton = this.page.getByRole('button', { name: '', exact: true }).nth(3);
        this.topBanner = this.page.locator('#alertBannner').getByRole('button', { name: '' });
        this.bottomBanner = this.page.getByLabel('Cookie consent banner').getByRole('button', { name: '' });
    }

    async clickBrightlineLogo(): Promise<void> {
        await this.brightLineLogo.click();
    };
    async clickOneWay(): Promise<void> {
        await this.oneWay.click();
    };
    async clickSelectFrom(): Promise<void> {
        await this.selectFrom.click();
    };
    async clickOrlando(): Promise<void> {
        await this.orlando.click();
    };
    async clickMiami(): Promise<void> {
        await this.miami.click();
    };
    async clickContinue(): Promise<void> {
        await this.continue.click();
    };
    async clickSelectDate(): Promise<void> {
        await this.selectDate.click();
    };
    async clickAddGuest(): Promise<void> {
        await this.addGuest.click();
    };
    async clickAddAdult(): Promise<void> {
        await this.addAdult.click();
    };
    async clickSearchTickets(): Promise<void> {
        await this.searchTickets.click();
    };
    async clickNextButton(): Promise<void> {
        await this.nextButton.click();
    };
    async selectCalendarDate(isRoundTrip): Promise<void> {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } as const;
        const tomorrow = new Date(Date.now() + 168 * 60 * 60 * 1000);
        await this.page.getByLabel(`Choose ${tomorrow.toLocaleDateString('en-US', options)}`).nth(1).click();
        if (isRoundTrip) {
          const afterTomorrow = new Date(tomorrow.valueOf() + 168 * 60 * 60 * 1000);
          await this.page.getByLabel(`Choose ${afterTomorrow.toLocaleDateString('en-US', options)}`).first().click();
        }
    }
    async closeBanners(): Promise<void> {
        await this.topBanner.click();
        await this.bottomBanner.click();
    }
};
