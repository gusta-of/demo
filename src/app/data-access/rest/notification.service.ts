import { EventEmitter } from "@angular/core";

export class NotificationService {
  private static emitters: {
    [eventName: string]: EventEmitter<any>
  } = {}

  static event(eventName: string): EventEmitter<any> {
    if (!this.emitters[eventName]) {
      this.emitters[eventName] = new EventEmitter<any>();
    }

    return this.emitters[eventName];
  }
}
