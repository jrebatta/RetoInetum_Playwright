"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    visit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.goto(this.url);
            yield this.page.setViewportSize({ width: 1280, height: 720 });
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.fill(this.inputUser, username);
            yield this.page.fill(this.inputPassword, password);
            yield this.page.click(this.btnLogin);
        });
    }
    verifySuccessMessage(expectedMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.waitForSelector(this.loggedInAsElement);
            const message = yield this.page.textContent(this.loggedInAsElement);
            if (!(message === null || message === void 0 ? void 0 : message.includes(expectedMessage))) {
                throw new Error(`Expected message to contain "${expectedMessage}" but got "${message}"`);
            }
        });
    }
}
exports.LoginPage = LoginPage;
