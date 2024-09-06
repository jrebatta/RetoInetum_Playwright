import { Given, Then } from '@cucumber/cucumber';
import { LoginPage } from '@pages/loginPage';
import { Page } from 'playwright';

let loginPage: LoginPage;

Given('ingreso a OrangeHRM', async function () {
    loginPage = new LoginPage(this.page as Page);
    await loginPage.visit();
});

Given('el usuario ingresa {string} y {string} y hace clic en el botón de login', async function (username: string, password: string) {
    await loginPage.login(username, password);
});

Then('el usuario debería ver el mensaje del Dashboard {string}', async function (expectedMessage: string) {
    await loginPage.verifySuccessMessage(expectedMessage);
});
