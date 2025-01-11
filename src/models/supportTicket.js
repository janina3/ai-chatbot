"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportTicketModel = void 0;
class SupportTicketModel {
    constructor(ticketId, customerId, issueType, resolutionStatus) {
        this._ticketId = ticketId;
        this._customerId = customerId;
        this._issueType = issueType;
        this._resolutionStatus = resolutionStatus;
    }
    get ticketId() {
        return this._ticketId;
    }
    set ticketId(value) {
        this._ticketId = value;
    }
    get customerId() {
        return this._customerId;
    }
    set customerId(value) {
        this._customerId = value;
    }
    get issueType() {
        return this._issueType;
    }
    set issueType(value) {
        this._issueType = value;
    }
    get resolutionStatus() {
        return this._resolutionStatus;
    }
    set resolutionStatus(value) {
        this._resolutionStatus = value;
    }
}
exports.SupportTicketModel = SupportTicketModel;
