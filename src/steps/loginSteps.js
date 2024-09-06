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
const cucumber_1 = require("@cucumber/cucumber");
const loginPage_1 = require("@pages/loginPage");
let loginPage;
(0, cucumber_1.Given)('ingreso a OrangeHRM', function () {
    return __awaiter(this, void 0, void 0, function* () {
        loginPage = new loginPage_1.LoginPage(this.page);
        yield loginPage.visit();
    });
});
(0, cucumber_1.Given)('el usuario ingresa {string} y {string} y hace clic en el botón de login', function (username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        yield loginPage.login(username, password);
    });
});
(0, cucumber_1.Then)('el usuario debería ver el mensaje del Dashboard {string}', function (expectedMessage) {
    return __awaiter(this, void 0, void 0, function* () {
        yield loginPage.verifySuccessMessage(expectedMessage);
    });
});
