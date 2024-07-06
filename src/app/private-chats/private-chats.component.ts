import { Component, OnInit } from '@angular/core';
import { NewChatDialogComponent } from '../new-chat-dialog/new-chat-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-private-chats',
  standalone: true,
  imports: [MatToolbarModule, MatListModule, MatIconModule, CommonModule],
  templateUrl: './private-chats.component.html',
  styleUrl: './private-chats.component.scss'
})
export class PrivateChatsComponent implements OnInit {

  chats = ['User1', 'User2', 'User3'];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    
  }

  openNewChatDialog(): void {
    const dialogRef = this.dialog.open(NewChatDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
