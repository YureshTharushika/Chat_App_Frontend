import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewGroupDialogComponent } from '../new-group-dialog/new-group-dialog.component';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-group-chats',
  standalone: true,
  imports: [MatIconModule, MatListModule, MatToolbarModule, CommonModule],
  templateUrl: './group-chats.component.html',
  styleUrl: './group-chats.component.scss'
})
export class GroupChatsComponent implements OnInit {
  
  groups = ['Global Chat', 'Group1', 'Group2'];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    
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
