import {Page, Locator} from "@playwright/test";

export default class TabletDashboardPage {

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
        private topBanner: Locator;
        private bottomBanner: Locator;

    constructor(public page: Page) {
        this.brightLineLogo = this.page.getByRole('link', { name: 'Brightline', exact: true });
        this.oneWay = this.page.getByRole('button', { name: 'One-way' });
        this.selectFrom = this.page.getByRole('textbox', { name: '*From *From' });
        this.orlando = this.page.getByRole('option', { name: 'Orlando' });
        this.miami = this.page.getByRole('option', { name: 'Miami' });
        this.selectDate = this.page.getByRole('tabpanel', { name: 'Train Tickets' }).getByLabel('*Departure');
        this.addGuest = this.page.getByRole('button', { name: 'Number of guests 1 Adult' });
        this.addAdult = this.page. getByRole('button', { name: 'increase number of Adults' });
        this.searchTickets = this.page.getByRole('button', { name: 'Search Tickets' });
        this.topBanner = this.page.locator('#alertBannner').getByRole('button', { name: '' });
        this.bottomBanner = this.page.getByRole('button', { name: 'I AGREE' });
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
    async selectCalendarDate(isRoundTrip): Promise<void> {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } as any;
        const tomorrow = new Date( Date.now() + 168 * 60 * 60 * 1000 )
        this.departureDate = this.page.getByLabel(`Choose ${tomorrow.toLocaleDateString('en-US', options)}`);
           await this.departureDate.click();
        if (isRoundTrip) {
          const afterTomorrow = new Date(tomorrow.valueOf() + 168 * 60 * 60 * 1000);
          this.departureDate = this.page.getByLabel(
               `Choose ${afterTomorrow.toLocaleDateString('en-US', options)}`
             );
             await this.departureDate.click();
        }
      };

    async closeBanners(): Promise<void> {
        await this.topBanner.click();
        await this.bottomBanner.click();
    }
};
