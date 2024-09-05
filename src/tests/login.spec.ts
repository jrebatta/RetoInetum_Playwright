import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { PIMPage } from '../pages/pimPage';
// @ts-ignore
import * as testData from '../data/testData.json';

test.describe('Login y gestión de empleados en OrangeHRM', () => {
    let loginPage: LoginPage;
    let pimPage: PIMPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        pimPage = new PIMPage(page);
    });

    test('Inicio de sesión exitoso con credenciales válidas', async ({ page }) => {
        await loginPage.visit();
        const { username, password } = testData.validCredentials;
        await loginPage.login(username, password);
        const { dashboard } = testData.expectedMessages;
        await loginPage.verifySuccessMessage(dashboard);
    });

    test('Creación de un nuevo empleado', async ({ page }) => {
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
