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
const pimPage_1 = require("@pages/pimPage");
let pimPage;
(0, cucumber_1.When)('el usuario navega a la sección PIM y hace click en Add Employee', function () {
    return __awaiter(this, void 0, void 0, function* () {
        pimPage = new pimPage_1.PIMPage(this.page);
        yield pimPage.navigateToPIMAndAddEmployee();
    });
});
(0, cucumber_1.When)('el usuario crea un nuevo empleado con los datos:', function (dataTable) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = dataTable.rowsHash();
        yield pimPage.createEmployee(data['First Name'], data['Middle Name'], data['Last Name']);
    });
});
(0, cucumber_1.Then)('el usuario debería ver el mensaje de confirmación {string}', function (expectedMessage) {
    return __awaiter(this, void 0, void 0, function* () {
        yield pimPage.verifySuccessMessage(expectedMessage);
    });
});
(0, cucumber_1.Then)('el usuario debería ver el nombre del empleado {string} y {string}', function (firstName, lastName) {
    return __awaiter(this, void 0, void 0, function* () {
        yield pimPage.verifyEmployeeName(`${firstName} ${lastName}`);
    });
});
(0, cucumber_1.Then)('el usuario aparece en la lista de empleados', function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield pimPage.verifyEmployeeNameInList();
    });
});
