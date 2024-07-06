import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private hubConnection: signalR.HubConnection;
  private baseUrl = 'https://localhost:7265'; // Your SignalR hub URL

  messages: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private authService: AuthService) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.baseUrl}/chathub`, {
        accessTokenFactory: () => this.authService.getToken()
      })
      .build();
  
    this.hubConnection.start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
    
      this.hubConnection.on('ReceiveMessage', (message) => {
        const currentMessages = this.messages.value;
        currentMessages.push(message);
        this.messages.next(currentMessages);
      });

      this.hubConnection.on('ReceiveSystemMessage', (message) => {
        const currentMessages = this.messages.value;
        currentMessages.push({ user: 'System', message });
        this.messages.next(currentMessages);
      });
  }

  public sendMessage(user: string, message: string): void {
    this.hubConnection.invoke('SendMessage', user, message)
      .catch(err => console.error(err));
  }

  public sendPrivateMessage(user: string, receiver: string, message: string): void {
    this.hubConnection.invoke('SendPrivateMessage', user, receiver, message)
      .catch(err => console.error(err));
  }
}
