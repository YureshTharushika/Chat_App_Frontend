import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ChatComponent } from "../chat/chat.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CommonModule, MatSidenavModule, MatToolbarModule, MatListModule, MatTabsModule, MatButtonModule, MatIconModule, MatDialogModule, RouterModule, ChatComponent]
})
export class HomeComponent {

  privateChats = ['User1', 'User2', 'User3'];
  groups = ['Global Chat', 'Group1', 'Group2'];
  selectedChat: string | null = null;

  constructor() { }

  ngOnInit(): void {
    this.selectedChat = this.privateChats[0];
   }

  selectChat(chat: string): void {
    this.selectedChat = chat;
  }

}
