import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  leader: Leader;

  constructor(leaderService: LeaderService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openLoginForm() {
    this.dialog.open(LoginComponent, {height: '400px', width: '600px'});
  /* let dialogRef = this.dialog.open(LoginComponent, {
    height: '400px',
    width: '600px',
  });*/
  }
}