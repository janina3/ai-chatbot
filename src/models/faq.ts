export class FaqModel {
    private _faqId: number;
    private _question: string;
    private _answer: string;
    private _category: string;
  
    constructor(faqId: number, question: string, answer: string, category: string) {
      this._faqId = faqId;
      this._question = question;
      this._answer = answer;
      this._category = category;
    }
  
    get faqId(): number {
      return this._faqId;
    }
  
    set faqId(value: number) {
      this._faqId = value;
    }
  
    get question(): string {
      return this._question;
    }
  
    set question(value: string) {
      this._question = value;
    }
  
    get answer(): string {
      return this._answer;
    }
  
    set answer(value: string) {
      this._answer = value;
    }
  
    get category(): string {
      return this._category;
    }
  
    set category(value: string) {
      this._category = value;
    }
  }