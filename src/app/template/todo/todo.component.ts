import { Todo } from './../../interface/todo';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventPing } from './../../interface/eventping';
import { MatDialog } from '@angular/material/dialog';
import { TodoDialog } from 'src/app/dialog/dialog-todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit {
  
  @Input() toDo$: Todo;
  @Input() tempToDo: Todo;
  @Output() ping: EventEmitter<any> = new EventEmitter<any>();
  public showText = false;

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

// Hier kommt überprüfung was es vorher war um zu wissen wie handhaben mit important

    dialogRef.afterClosed().subscribe(result => {
      var eventlable = "";
      this.tempToDo = result;
      if((this.toDo$.important == null && this.tempToDo.important == true) ||(this.toDo$.important == false && this.tempToDo.important == true)) {
        eventlable = "editTodoChange";
      } else if (this.toDo$.important == true && this.tempToDo.important == false) {
        eventlable = "editImportantTodoChange";
      } else if (this.tempToDo.important == true) {
        eventlable = "editImportantTodo";
      } else if (this.tempToDo.important == null || this.tempToDo.important == false) {
        eventlable = "editTodo";
      }
      this.toDo$ = result;
      this.toDo$.done = false;
      const eventObject: EventPing = {
          lable: eventlable,
          object: this.toDo$
      }
      this.ping.emit(eventObject);
    }); 
  }
  
  ngOnInit(): void {}
  
}
