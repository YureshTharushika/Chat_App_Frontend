import { Component, OnInit } from '@angular/core';
import { NewChatDialogComponent } from '../new-chat-dialog/new-chat-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-private-chats',
  standalone: true,
  imports: [],
  templateUrl: './private-chats.component.html',
  styleUrl: './private-chats.component.scss'
})
export class PrivateChatsComponent implements OnInit {

  chats = ['User1', 'User2', 'User3'];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
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
