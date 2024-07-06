import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {

  user: string = ''; // Placeholder for user name
  message: string = '';
  selectedUser: string = ''; // For private chat
  userInfo: any; // To store user profile info
  messages: any[] = []; // Array to store messages

  private subscriptions: Subscription[] = [];

  constructor(public chatService: ChatService, private authService: AuthService) {}
  ngOnInit(): void {
    this.fetchUserInfo();
    this.subscribeToMessages();
  }

  fetchUserInfo(): void {
    this.authService.getUserInfo().subscribe(
      userInfo => {
        this.userInfo = userInfo;
        this.user = userInfo.email; // Temporary use of email as user name
      },
      error => {
        console.error('Failed to fetch user info:', error);
      }
    );
  }

  subscribeToMessages(): void {
    const subscription = this.chatService.messages.subscribe(
      messages => {
        this.messages = messages;
      },
      error => {
        console.error('Failed to fetch messages:', error);
      }
    );
    this.subscriptions.push(subscription);
  }

  sendMessage(): void {
    if (this.selectedUser) {
      this.chatService.sendPrivateMessage(this.user, this.selectedUser, this.message);
    } else {
      this.chatService.sendMessage(this.user, this.message);
    }
    this.message = '';
  }

  startPrivateChat(user: string): void {
    this.selectedUser = user;
    
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
