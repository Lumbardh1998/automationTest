import { test } from '@playwright/test';
import MobileLoginPage from '../screens/mobileLoginPage';
import MobileDashboardPage from '../screens/mobileDashboardPage';
import MobileJourneySearchPage from '../screens/mobileJourneySearchPage';
import MobileRtiPage from '../screens/mobileRtiPage';
import MobileConfirmationPage from '../screens/mobileConfirmationPage';

test('User should be able to log in successfully', async ({ page }) => {
  const mobileLoginPage = new MobileLoginPage(page);
  const mobileDashboardPage = new MobileDashboardPage(page);
  const mobileJourneySearchPage = new MobileJourneySearchPage(page);
  const mobileRtiPage = new MobileRtiPage(page);
  const mobileConfirmationPage = new MobileConfirmationPage(page);

  await page.goto('https://staging.gobrightline.com');
  await mobileLoginPage.clickMenu();
  await mobileLoginPage.clickGoToLoginPageButton();
  await mobileLoginPage.enterEmailAddress();
  await mobileLoginPage.clickContinue();
  await mobileLoginPage.enterPassword();
  await mobileLoginPage.clickContinue();

  await test.step('BookingWidget', async () => {
    await mobileDashboardPage.clickBrightlineLogo();
    await mobileDashboardPage.closeBanners();
    await mobileDashboardPage.clickSelectFrom();
    await mobileDashboardPage.clickOrlando();
    await mobileDashboardPage.clickMiami();
    await mobileDashboardPage.clickContinue();
    await mobileDashboardPage.clickOneWay();
    //await mobileDashboardPage.clickNextButton();
    await mobileDashboardPage.selectCalendarDate(false);
    await mobileDashboardPage.clickContinue();
    await mobileDashboardPage.clickContinue();
    await mobileDashboardPage.clickSearchTickets();
  });

  await test.step('Journey Search Page', async () => {
   await mobileJourneySearchPage.assertFarePageElements();
   await mobileJourneySearchPage.assertSortBy();
   await mobileJourneySearchPage.assertDeparture();
   await mobileJourneySearchPage.selectSmartTrain();
   await mobileJourneySearchPage.clickSmartFare();
   await mobileJourneySearchPage.clickContinue();
  });

  await test.step('RTI Page', async () => {
   await mobileRtiPage.clickSaveAndContinue();
   await mobileRtiPage.asserSeats();
   await mobileRtiPage.assertBaggage();
   await mobileRtiPage.clickAddBags();
   await mobileRtiPage.clickOversizedMenu();
   await mobileRtiPage.openUserOversized();
   await mobileRtiPage.clickOversized();
   await mobileRtiPage.clickCheckedBagMenu();
   await mobileRtiPage.clickUserCheckedBag();
   await mobileRtiPage.clickCheckedBag();
   await mobileRtiPage.clickAddToTrip();
   await mobileRtiPage.assertBaggageHeading();
   await mobileRtiPage.assertBaggages();
   await mobileRtiPage.assertPets();
   await mobileRtiPage.clickAddPets();
   await mobileRtiPage.clickDogsMenu();
   await mobileRtiPage.clickUserDog();
   await mobileRtiPage.clickAddDog();
   await mobileRtiPage.clickAddToTrip();
   await mobileRtiPage.clickCreditCard();
   await mobileRtiPage.clickPayAndBook();
  });
  await test.step('Confirmation Page', async () => {
   await mobileConfirmationPage.assertConfirmationElements();
   await mobileConfirmationPage.clickTripDetailsButton();
  });
});
