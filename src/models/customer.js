"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerModel = void 0;
class CustomerModel {
    constructor(customerId, accountNumber, name, isTechSavvy) {
        this._customerId = customerId;
        this._accountNumber = accountNumber;
        this._name = name;
        this._isTechSavvy = isTechSavvy;
    }
    get customerId() {
        return this._customerId;
    }
    set customerId(value) {
        this._customerId = value;
    }
    get accountNumber() {
        return this._accountNumber;
    }
    set accountNumber(value) {
        this._accountNumber = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get isTechSavvy() {
        return this._isTechSavvy;
    }
    set isTechSavvy(value) {
        this._isTechSavvy = value;
    }
}
exports.CustomerModel = CustomerModel;
