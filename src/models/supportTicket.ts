export class SupportTicketModel {
    private _ticketId: number;
    private _customerId: number;
    private _issueType: string;
    private _resolutionStatus: string;
  
    constructor(ticketId: number, customerId: number, issueType: string, resolutionStatus: string) {
      this._ticketId = ticketId;
      this._customerId = customerId;
      this._issueType = issueType;
      this._resolutionStatus = resolutionStatus;
    }
  
    get ticketId(): number {
      return this._ticketId;
    }
  
    set ticketId(value: number) {
      this._ticketId = value;
    }
  
    get customerId(): number {
      return this._customerId;
    }
  
    set customerId(value: number) {
      this._customerId = value;
    }
  
    get issueType(): string {
      return this._issueType;
    }
  
    set issueType(value: string) {
      this._issueType = value;
    }
  
    get resolutionStatus(): string {
      return this._resolutionStatus;
    }
  
    set resolutionStatus(value: string) {
      this._resolutionStatus = value;
    }
  }