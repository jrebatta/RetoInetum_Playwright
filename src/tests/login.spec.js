"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const loginPage_1 = require("../pages/loginPage");
const pimPage_1 = require("../pages/pimPage");
// @ts-ignore
const testData = __importStar(require("../data/testData.json"));
test_1.test.describe('Login y gestión de empleados en OrangeHRM', () => {
    let loginPage;
    let pimPage;
    test_1.test.beforeEach(async ({ page }) => {
        loginPage = new loginPage_1.LoginPage(page);
        pimPage = new pimPage_1.PIMPage(page);
    });
    (0, test_1.test)('Inicio de sesión exitoso con credenciales válidas', async ({ page }) => {
        await loginPage.visit();
        const { username, password } = testData.validCredentials;
        await loginPage.login(username, password);
        const { dashboard } = testData.expectedMessages;
        await loginPage.verifySuccessMessage(dashboard);
    });
    (0, test_1.test)('Creación de un nuevo empleado', async ({ page }) => {
        await loginPage.visit();
        const { username, password } = testData.validCredentials;
        await loginPage.login(username, password);
        const { dashboard } = testData.expectedMessages;
        await loginPage.verifySuccessMessage(dashboard);
        await pimPage.navigateToPIMAndAddEmployee();
        const { firstName, middleName, lastName } = testData.employeeData;
        await pimPage.createEmployee(firstName, middleName, lastName);
        const { successfullySaved, employeeName } = testData.expectedMessages;
        await pimPage.verifySuccessMessage(successfullySaved);
        await pimPage.verifyEmployeeName(employeeName);
        await pimPage.verifyEmployeeNameInList();
    });
});
