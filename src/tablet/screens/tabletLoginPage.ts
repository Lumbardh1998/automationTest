import { Page, Locator } from "@playwright/test";
import { credentials } from "../../testData/credentials";

export default class TabletLoginPage {
  private emailAddressField: Locator;
  private continueButton: Locator;
  private passwordField: Locator;
  private goToLoginPageButton: Locator;
  private loginButton: Locator;

  constructor(public page: Page) {
    this.goToLoginPageButton = this.page.getByLabel('Login');
    this.emailAddressField = this.page.getByLabel("Email address");
    this.continueButton = this.page.getByRole('button', { name: 'Continue', exact: true })
    this.passwordField = this.page.getByLabel("Password");
    this.loginButton = this.page.getByRole("button", { name: "Login" });

  }
  async clickGoToLoginPageButton(): Promise<void> {
    await this.goToLoginPageButton.click();
  }
  async enterEmailAddress(): Promise<void> {
    await this.emailAddressField.fill(credentials.email);
  }
  async enterPassword(): Promise<void> {
    await this.passwordField.fill(credentials.password);
  }
  async clickOnLoginButton(): Promise<void> {
    await this.loginButton.click();
  }
  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}
