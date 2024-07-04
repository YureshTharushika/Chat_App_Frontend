import { Component } from '@angular/core';
import { ChatService } from '../chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {

  user: string = '';
  message: string = '';

  constructor(public chatService: ChatService) {}

  sendMessage(): void {
    this.chatService.sendMessage(this.user, this.message);
    this.message = '';
  }
}
