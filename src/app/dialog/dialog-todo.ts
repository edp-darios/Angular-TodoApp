import { Todo } from './../interface/todo';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'TodoDialog',
    templateUrl: 'dialog-todo.html',
    styleUrls: ['./dialog-todo.css']
  })
  export class TodoDialog {
    
    constructor(
      public dialogRef: MatDialogRef<TodoDialog>,
      @Inject(MAT_DIALOG_DATA) public data: Todo) { }
  
      }
  