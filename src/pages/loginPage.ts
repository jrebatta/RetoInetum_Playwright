import { Page } from '@playwright/test';

export class LoginPage {
    private page: Page;
    private url = 'https://opensource-demo.orangehrmlive.com/';
    private inputUser = 'input[name="username"]';
    private inputPassword = 'input[name="password"]';
    private btnLogin = 'button[type="submit"]';
    private loggedInAsElement = 'h6';

    constructor(page: Page) {
        this.page = page;
    }

    async visit() {
        await this.page.goto(this.url);
        await this.page.setViewportSize({ width: 1280, height: 720 });
    }

    async login(username: string, password: string) {
        await this.page.fill(this.inputUser, username);
        await this.page.fill(this.inputPassword, password);
        await this.page.click(this.btnLogin);
    }

    async verifySuccessMessage(expectedMessage: string) {
        await this.page.waitForSelector(this.loggedInAsElement);
        const message = await this.page.textContent(this.loggedInAsElement);
        if (!message?.includes(expectedMessage)) {
            throw new Error(`Expected message to contain "${expectedMessage}" but got "${message}"`);
        }
    }
}
