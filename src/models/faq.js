"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqModel = void 0;
class FaqModel {
    constructor(faqId, question, answer, category) {
        this._faqId = faqId;
        this._question = question;
        this._answer = answer;
        this._category = category;
    }
    get faqId() {
        return this._faqId;
    }
    set faqId(value) {
        this._faqId = value;
    }
    get question() {
        return this._question;
    }
    set question(value) {
        this._question = value;
    }
    get answer() {
        return this._answer;
    }
    set answer(value) {
        this._answer = value;
    }
    get category() {
        return this._category;
    }
    set category(value) {
        this._category = value;
    }
}
exports.FaqModel = FaqModel;
