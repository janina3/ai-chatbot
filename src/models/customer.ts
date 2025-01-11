export class CustomerModel {
    private _customerId: number;
    private _accountNumber: string;
    private _name: string;
    private _isTechSavvy: boolean;
  
    constructor(customerId: number, accountNumber: string, name: string, isTechSavvy: boolean) {
      this._customerId = customerId;
      this._accountNumber = accountNumber;
      this._name = name;
      this._isTechSavvy = isTechSavvy;
    }
  
    get customerId(): number {
      return this._customerId;
    }
  
    set customerId(value: number) {
      this._customerId = value;
    }
  
    get accountNumber(): string {
      return this._accountNumber;
    }
  
    set accountNumber(value: string) {
      this._accountNumber = value;
    }
  
    get name(): string {
      return this._name;
    }
  
    set name(value: string) {
      this._name = value;
    }
  
    get isTechSavvy(): boolean {
      return this._isTechSavvy;
    }
  
    set isTechSavvy(value: boolean) {
      this._isTechSavvy = value;
    }
  }