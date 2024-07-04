import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private hubConnection: signalR.HubConnection;
  public messages: string[] = [];

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7265/chathub')
      .build();

    this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
      this.messages.push(`${user}: ${message}`);
    });

    this.hubConnection.start().catch(err => console.error(err));
  }

  public sendMessage(user: string, message: string): void {
    this.hubConnection.invoke('SendMessage', user, message)
      .catch(err => console.error(err));
  }
}
