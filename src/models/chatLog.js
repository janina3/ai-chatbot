"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatLogModel = void 0;
class ChatLogModel {
    constructor(logId, customerId, chatText, resolutionStatus) {
        this._logId = logId;
        this._customerId = customerId;
        this._chatText = chatText;
        this._resolutionStatus = resolutionStatus;
    }
    get logId() {
        return this._logId;
    }
    set logId(value) {
        this._logId = value;
    }
    get customerId() {
        return this._customerId;
    }
    set customerId(value) {
        this._customerId = value;
    }
    get chatText() {
        return this._chatText;
    }
    set chatText(value) {
        this._chatText = value;
    }
    get resolutionStatus() {
        return this._resolutionStatus;
    }
    set resolutionStatus(value) {
        this._resolutionStatus = value;
    }
}
exports.ChatLogModel = ChatLogModel;
