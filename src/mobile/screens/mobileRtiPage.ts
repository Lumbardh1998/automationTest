import {Page, Locator, expect } from "@playwright/test";
import { guestCredentials } from "../../testData/credentials";


export default class MobileRtiPage {

    private saveAndContinueButton: Locator;

    private seats: Locator;
    private seatsMessage: Locator;
    private baggage: Locator;
    private baggageHeading: Locator;
    private baggageChecked: Locator;

    private addBagsButton: Locator;
    private oversizedDropDownMenu: Locator;
    private userOversizedBag: Locator;
    private oversizedBag: Locator;

    private checkedDropDownMenu: Locator;
    private userCheckedBag: Locator;
    private chekcedBag: Locator;
    
    private addToTripButton: Locator;

    private petsClass: Locator;
    private addPetsButton: Locator;
    private catsDropDownMenu: Locator;
    private dogsDropDownMenu: Locator;
    private addCat: Locator;
    private userDog: Locator;
    private addDog: Locator;

    private creditCard: Locator;
    private payAndBook: Locator;


    constructor(public page: Page) {
        this.saveAndContinueButton = this.page.getByRole('button', { name: 'Save and Continue' })
        this.seats = this.page.getByText('Seats');
        this.baggage = this.page.getByRole('img', { name: 'Extra Luggage Image' });
        this.baggageHeading = this.page.getByRole('heading', { name: 'Baggage' });
        this.baggageChecked = this.page.getByRole('group', { name: 'extras item' })
            .filter({has: page.getByRole('heading', { name: 'Baggage', level: 5 })
        });
        this.addBagsButton = this.page.getByRole('button', { name: 'Add' }).nth(0);
        this.oversizedDropDownMenu = this.page.getByText('Oversized Carry-on BaggageFrom$');
        this.userOversizedBag = this.page.locator('input[name="outbound0-passenger_1"]');
        this.oversizedBag = this.page.getByRole('button', { name: 'Oversized Carry-on - $20 / leg' });
        this.checkedDropDownMenu = this.page.getByText('Checked baggageFrom$');
        this.userCheckedBag = this.page.locator('input[name="outbound1-passenger_1"]');
        this.chekcedBag = this.page.getByRole('button', { name: 'Checked - $30 / leg' });
        this.addToTripButton = this.page.getByRole('button', { name: 'Add to Trip' });
        this.petsClass = this.page.locator('.blte-rti-extras__item-card', {hasText: 'Pets',});
        this.addPetsButton = this.page.getByRole('button', { name: 'Add' }).nth(1);
        this.catsDropDownMenu = this.page.getByText('CatsFrom$');
        this.addCat = this.page.getByRole('button', { name: 'Under seat - $45 / leg' });
        this.dogsDropDownMenu = this.page.getByText('DogsFrom$');
        this.userDog = this.page.locator('input[name="outbound1-passenger_1"]');
        this.addDog = this.page.getByRole('button', { name: 'Under seat - $45 / leg' }).nth(0);
        this.creditCard = this.page.locator('input[name="MFLWBP68BCM6GVT5"]');
        this.payAndBook = this.page.getByRole('button', { name: 'Pay and Book - $' });
    }

    async clickSaveAndContinue(): Promise<void> {
        await this.saveAndContinueButton.click();
    }
    async asserSeats(): Promise<void> {
        await expect(this.seats).toBeVisible();
    }
    async assertBaggage(): Promise<void> {
        await expect(this.baggage).toBeVisible();
    }
    async assertBaggageHeading(): Promise<void> {
        await expect.soft(this.baggageHeading).toBeVisible();
    }
    async clickAddBags(): Promise<void> {
        await this.addBagsButton.click();
    }
    async clickOversizedMenu(): Promise<void> {
        await this.oversizedDropDownMenu.click();
    }
    async openUserOversized(): Promise<void> {
        await this.userOversizedBag.click();
    }
    async clickOversized(): Promise<void> {
        await this.oversizedBag.click();
    }
    async clickCheckedBagMenu(): Promise<void> {
        await this.checkedDropDownMenu.click()
    }
    async clickUserCheckedBag(): Promise<void> {
        await this.userCheckedBag.click();
    }
    async clickCheckedBag(): Promise<void> {
        await this.chekcedBag.click();
    }
    async clickAddToTrip(): Promise<void> {
        await this.addToTripButton.click();    
    }
    async assertBaggages(): Promise<void> {
        await expect.soft(this.baggageChecked).toBeVisible();
    }
    async assertPets(): Promise<void> {
        await expect(this.petsClass).toBeVisible();
    }
    async clickAddPets(): Promise<void> {
        await expect(this.addPetsButton).toBeVisible();
        await this.addPetsButton.click();
    }
    async clickCatsMenu(): Promise<void> {
        await this.catsDropDownMenu.click();
    }
    async clickAddCat(): Promise<void> {
        await this.addCat.click();
    }
    async clickDogsMenu(): Promise<void> {
        await this.dogsDropDownMenu.click();
    }
    async clickUserDog(): Promise<void> {
        await this.userDog.click();
    }
    async clickAddDog(): Promise<void> {
        await this.addDog.click();
    }
    async clickCreditCard(): Promise<void> {
        await this.creditCard.click();
    }
    async clickPayAndBook(): Promise<void> {
        await this.payAndBook.click();
    }
}