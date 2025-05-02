import { test } from '@playwright/test';
import TabletLoginPage from '../screens/tabletLoginPage';
import TabletDashboardPage from '../screens/tabletDashboardPage';
import TabletJourneySearchPage from '../screens/tabletJourneySearchPage';
import TabletRtiPage from '../screens/tabletRtiPage';
import TabletConfirmationPage from '../screens/tabletConfirmationPage';

test('User should be able to log in successfully', async ({ page }) => {
  test.setTimeout(60000);
  const tabletLoginPage = new TabletLoginPage(page);
  const tabletDashboardPage = new TabletDashboardPage(page);
  const tabletJourneySearchPage = new TabletJourneySearchPage(page);
  const tabletRtiPage = new TabletRtiPage(page);
  const tabletConfrimationPage = new TabletConfirmationPage(page);
  

  await page.goto('https://staging.gobrightline.com');
  await tabletLoginPage.clickGoToLoginPageButton();
  await tabletLoginPage.enterEmailAddress();
  await tabletLoginPage.clickContinue();
  await tabletLoginPage.enterPassword();
  await tabletLoginPage.clickContinue();

  await test.step('BookingWidget', async () => {
    await tabletDashboardPage.clickBrightlineLogo();
    await tabletDashboardPage.closeBanners();
    await tabletDashboardPage.clickOneWay();
    await tabletDashboardPage.clickSelectFrom();
    await tabletDashboardPage.clickOrlando();
    await tabletDashboardPage.clickMiami();
    await tabletDashboardPage.clickSelectDate();
    await tabletDashboardPage.selectCalendarDate(false);
    await tabletDashboardPage.clickAddGuest();
    await tabletDashboardPage.clickAddAdult();
    await tabletDashboardPage.clickSearchTickets();
  });

  await test.step('Journey Search Page', async () => {
    await tabletJourneySearchPage.assertSmartFare();
    await tabletJourneySearchPage.assertPremiumFare();
    await tabletJourneySearchPage.assertTrainsFound();
    await tabletJourneySearchPage.assertSortBy();
    await tabletJourneySearchPage.selectPremiumTrain();
    await tabletJourneySearchPage.clickSelect();
  });

  await test.step('RTI Page', async () => {
    await tabletRtiPage.enterGuestFirstName();
    await tabletRtiPage.enterGuestLastName();
    await tabletRtiPage.enterGuestDoB();
    await tabletRtiPage.clickSaveAndContinue();
    await tabletRtiPage.asserSeats();
    await tabletRtiPage.assertBaggage();
    await tabletRtiPage.assertBaggageHeading();
    await tabletRtiPage.clickAddBags();
    await tabletRtiPage.clickOversizedMenu();
    await tabletRtiPage.openGuestOversized();
    await tabletRtiPage.clickOversized();
    await tabletRtiPage.openUserOversized();
    await tabletRtiPage.clickSecondOversized();
    await tabletRtiPage.clickCheckedBagMenu();
    await tabletRtiPage.clickGuestCheckedBag();
    await tabletRtiPage.clickCheckedBag();
    await tabletRtiPage.clickUserCheckedBag();
    await tabletRtiPage.clickSecondCheckedBag();
    await tabletRtiPage.clickAddToTrip();
    await tabletRtiPage.assertBaggages();
    await tabletRtiPage.assertPets();
    await tabletRtiPage.clickAddPets();
    await tabletRtiPage.clickCatsMenu();
    await tabletRtiPage.clickGuestCat();
    await tabletRtiPage.clickAddCat();
    await tabletRtiPage.clickDogsMenu();
    await tabletRtiPage.clickUserDog();
    await tabletRtiPage.clickAddDog();
    await tabletRtiPage.clickAddToTrip();
    await tabletRtiPage.clickCreditCard();
    await tabletRtiPage.clickPayAndBook();
  });

  await test.step('Confirmation Page', async () => {
    await tabletConfrimationPage.assertConfirmationElements();
    await tabletConfrimationPage.clickTripDetailsButton();
  });
});
