import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewGroupDialogComponent } from '../new-group-dialog/new-group-dialog.component';

@Component({
  selector: 'app-group-chats',
  standalone: true,
  imports: [],
  templateUrl: './group-chats.component.html',
  styleUrl: './group-chats.component.scss'
})
export class GroupChatsComponent implements OnInit {
  
  groups = ['Global Chat', 'Group1', 'Group2'];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  openNewGroupDialog(): void {
    const dialogRef = this.dialog.open(NewGroupDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
