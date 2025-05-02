import { test } from '@playwright/test';
import LoginPage from '../screens/loginPage';
import DashboardPage from '../screens/dashboardPage';
import JourneySearchPage from '../screens/journeySearchPage';
import RtiPage from '../screens/rtiPage';
import ConfirmationPage from '../screens/confrimationPage';

test('User should be able to log in successfully', async ({ page }) => {
  test.setTimeout(60000);
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const journeySearchPage = new JourneySearchPage(page);
  const rtiPage = new RtiPage(page);
  const confrimationPage = new ConfirmationPage(page);
  

  await page.goto('https://staging.gobrightline.com');
  await loginPage.clickGoToLoginPageButton();
  await loginPage.enterEmailAddress();
  await loginPage.clickContinue();
  await loginPage.enterPassword();
  await loginPage.clickContinue();

  await test.step('BookingWidget', async () => {
    await dashboardPage.clickBrightlineLogo();
    await dashboardPage.closeBanners();
    await dashboardPage.clickOneWay();
    await dashboardPage.clickSelectFrom();
    await dashboardPage.clickOrlando();
    await dashboardPage.clickMiami();
    await dashboardPage.clickSelectDate();
    await dashboardPage.selectCalendarDate(false);
    await dashboardPage.clickAddGuest();
    await dashboardPage.clickAddAdult();
    await dashboardPage.clickSearchTickets();
  });

  await test.step('Journey Search Page', async () => {
    await journeySearchPage.assertSmartFare();
    await journeySearchPage.assertPremiumFare();
    await journeySearchPage.assertTrainsFound();
    await journeySearchPage.assertSortBy();
    await journeySearchPage.selectSmartSaverTrain();
    await journeySearchPage.continueWithSmartSaver();
  });

  await test.step('RTI Page', async () => {
    await rtiPage.enterGuestFirstName();
    await rtiPage.enterGuestLastName();
    await rtiPage.enterGuestDoB();
    await rtiPage.clickSaveAndContinue();
    await rtiPage.asserSeats();
    await rtiPage.asserSeatsMessage();
    await rtiPage.assertBaggage();
    await rtiPage.assertBaggageHeading();
    await rtiPage.clickAddBags();
    await rtiPage.clickOversizedMenu();
    await rtiPage.openGuestOversized();
    await rtiPage.clickOversized();
    await rtiPage.openUserOversized();
    await rtiPage.clickSecondOversized();
    await rtiPage.clickCheckedBagMenu();
    await rtiPage.clickGuestCheckedBag();
    await rtiPage.clickCheckedBag();
    await rtiPage.clickUserCheckedBag();
    await rtiPage.clickSecondCheckedBag();
    await rtiPage.clickAddToTrip();
    await rtiPage.assertBaggages();
    await rtiPage.assertPets();
    await rtiPage.clickAddPets();
    await rtiPage.clickCatsMenu();
    await rtiPage.clickGuestCat();
    await rtiPage.clickAddCat();
    await rtiPage.clickDogsMenu();
    await rtiPage.clickUserDog();
    await rtiPage.clickAddDog();
    await rtiPage.clickAddToTrip();
    await rtiPage.clickCreditCard();
    await rtiPage.clickPayAndBook();
  });

  await test.step('Confirmation Page', async () => {
    await confrimationPage.assertConfirmationElements();
    await confrimationPage.clickTripDetailsButton();
  });
});
