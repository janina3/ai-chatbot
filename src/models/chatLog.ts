export class ChatLogModel {
    private _logId: number;
    private _customerId: number;
    private _chatText: string;
    private _resolutionStatus: string;
  
    constructor(logId: number, customerId: number, chatText: string, resolutionStatus: string) {
      this._logId = logId;
      this._customerId = customerId;
      this._chatText = chatText;
      this._resolutionStatus = resolutionStatus;
    }
  
    get logId(): number {
      return this._logId;
    }
  
    set logId(value: number) {
      this._logId = value;
    }
  
    get customerId(): number {
      return this._customerId;
    }
  
    set customerId(value: number) {
      this._customerId = value;
    }
  
    get chatText(): string {
      return this._chatText;
    }
  
    set chatText(value: string) {
      this._chatText = value;
    }
  
    get resolutionStatus(): string {
      return this._resolutionStatus;
    }
  
    set resolutionStatus(value: string) {
      this._resolutionStatus = value;
    }
  }