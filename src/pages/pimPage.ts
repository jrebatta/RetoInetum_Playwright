import { Page } from 'playwright';

export class PIMPage {
    private page: Page;
    private aPIM = 'a.oxd-main-menu-item[href="/web/index.php/pim/viewPimModule"]';
    private aAddEmployee = 'ul > li:nth-child(3) > a.oxd-topbar-body-nav-tab-item';
    private EmployeeList = 'ul > li:nth-child(2) > a.oxd-topbar-body-nav-tab-item';
    private inputFirstName = 'input[name="firstName"]';
    private inputMiddleName = 'input[name="middleName"]';
    private inputLastName = 'input[name="lastName"]';
    private inputEmployeeID = 'div[data-v-957b4417][data-v-304890b0].oxd-input-group.oxd-input-field-bottom-space > div.oxd-input-group__label-wrapper ~ div > input[data-v-1f99f73c].oxd-input.oxd-input--active';
    private inputEmployeeIDList = 'div.oxd-grid-item div.oxd-input-group input.oxd-input.oxd-input--active';
    private btnSave = 'button[type="submit"]:not([class*="oxd-button--ghost"])';
    private successfullySaved = 'p.oxd-text.oxd-text--p.oxd-text--toast-message.oxd-toast-content-text';
    private firstLastName = 'h6.oxd-text.oxd-text--h6.--strong';
    private btnSearchList = 'button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space';
    private EmployeeIDList = 'div.oxd-table-row div.oxd-table-cell div[data-v-6c07a142]';

    private employeeID: string | undefined;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToPIMAndAddEmployee() {
        await this.page.click(this.aPIM);
        await this.page.click(this.aAddEmployee);
    }

    async createEmployee(firstName: string, middleName: string, lastName: string) {
        await this.page.fill(this.inputFirstName, firstName);
        await this.page.fill(this.inputMiddleName, middleName);
        await this.page.fill(this.inputLastName, lastName);
        this.employeeID = await this.page.inputValue(this.inputEmployeeID);
        await this.page.click(this.btnSave);
    }

    async verifySuccessMessage(expectedMessage: string) {
        await this.page.waitForSelector(this.successfullySaved);
        const message = await this.page.textContent(this.successfullySaved);
        if (!message?.includes(expectedMessage)) {
            throw new Error(`Expected message to contain "${expectedMessage}" but got "${message}"`);
        }
    }

    async verifyEmployeeName(expectedName: string) {
        await this.page.waitForSelector(this.firstLastName);
        const name = await this.page.textContent(this.firstLastName);
        if (!name?.includes(expectedName)) {
            throw new Error(`Expected employee name to be "${expectedName}" but got "${name}"`);
        }
    }

    async verifyEmployeeNameInList() {
        await this.page.click(this.EmployeeList);
        if (this.employeeID) {
            await this.page.fill(this.inputEmployeeIDList, this.employeeID);
        } else {
            throw new Error('Employee ID is not set.');
        }
        await this.page.click(this.btnSearchList);
        const displayedEmployeeID = await this.page.textContent(this.EmployeeIDList);
        if (displayedEmployeeID !== this.employeeID) {
            console.log(displayedEmployeeID);
            throw new Error(`Expected Employee ID to be "${this.employeeID}" but got "${displayedEmployeeID}"`);
        }
    }
}
