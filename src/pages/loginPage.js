"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPage = void 0;
class LoginPage {
    constructor(page) {
        this.url = 'https://opensource-demo.orangehrmlive.com/';
        this.inputUser = 'input[name="username"]';
        this.inputPassword = 'input[name="password"]';
        this.btnLogin = 'button[type="submit"]';
        this.loggedInAsElement = 'h6';
        this.page = page;
    }
    async visit() {
        await this.page.goto(this.url);
        await this.page.setViewportSize({ width: 1280, height: 720 });
    }
    async login(username, password) {
        await this.page.fill(this.inputUser, username);
        await this.page.fill(this.inputPassword, password);
        await this.page.click(this.btnLogin);
    }
    async verifySuccessMessage(expectedMessage) {
        await this.page.waitForSelector(this.loggedInAsElement);
        const message = await this.page.textContent(this.loggedInAsElement);
        if (!message?.includes(expectedMessage)) {
            throw new Error(`Expected message to contain "${expectedMessage}" but got "${message}"`);
        }
    }
}
exports.LoginPage = LoginPage;
