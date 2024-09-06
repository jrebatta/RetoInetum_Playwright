import { When, Then } from '@cucumber/cucumber';
import { PIMPage } from '@pages/pimPage';
import { Page } from 'playwright';

let pimPage: PIMPage;

When('el usuario navega a la sección PIM y hace click en Add Employee', async function () {
    pimPage = new PIMPage(this.page as Page);
    await pimPage.navigateToPIMAndAddEmployee();
});

When('el usuario crea un nuevo empleado con los datos:', async function (dataTable) {
    const data = dataTable.rowsHash();
    await pimPage.createEmployee(data['First Name'], data['Middle Name'], data['Last Name']);
});

Then('el usuario debería ver el mensaje de confirmación {string}', async function (expectedMessage: string) {
    await pimPage.verifySuccessMessage(expectedMessage);
});

Then('el usuario debería ver el nombre del empleado {string} y {string}', async function (firstName: string, lastName: string) {
    await pimPage.verifyEmployeeName(`${firstName} ${lastName}`);
});

Then('el usuario aparece en la lista de empleados', async function () {
    await pimPage.verifyEmployeeNameInList();
});
