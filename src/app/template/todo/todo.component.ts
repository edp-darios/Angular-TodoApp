import { Todo } from './../../interface/todo';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventPing } from './../../interface/eventping';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TodoDialog } from 'src/app/dialog/dialog-todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit {
  
  @Input() toDo$: Todo;
  @Output() ping: EventEmitter<any> = new EventEmitter<any>();
  public showText = false

  constructor(public dialog: MatDialog) {
    this.showText = false;
  }
  
  public changeCheck() {
    this.toDo$.done = !this.toDo$.done;
    const eventObject: EventPing = {
      lable: 'check',
      object: this.toDo$
    }
    this.ping.emit(eventObject);
  }
  
  public deleteToDo() {
    const eventObject: EventPing = {
      lable: 'delete',
      object: this.toDo$
    }
    this.ping.emit(eventObject);
  }

  public changeImportant() {
    const eventObject: EventPing = {
      lable: 'important',
      object: this.toDo$
    }
    this.ping.emit(eventObject);
  }

  editTodo(): void {

    const dialogRef = this.dialog.open(TodoDialog, {
      width: '230px',
      data: { lable: this.toDo$.lable, text: this.toDo$.text, id: this.toDo$.id, important: this.toDo$.important },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.toDo$ = result;
      this.toDo$.done = false;
      const eventObject: EventPing = {
          lable: 'edit',
          object: this.toDo$
      }
      this.ping.emit(eventObject);
    }); 
  }
  
  ngOnInit(): void {}
  
}
