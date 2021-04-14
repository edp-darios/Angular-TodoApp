import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import { Todo } from '../../interface/todo';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'TodoDialog',
  templateUrl: 'dialog-create-todo.html',
})
export class TodoDialog {

  @Input() data: Todo;

  constructor(
    public dialogRef: MatDialogRef<TodoDialog>,
    @Inject(MAT_DIALOG_DATA) public todo: Todo) {   
      this.data = {
      lable: undefined,
      text: undefined,
      important: false,
      done: false,
    }}
    @Output() ping: EventEmitter<Todo> = new EventEmitter<Todo>();

  onNoClick(): void {
    this.dialogRef.close();
  }
  

}

@Component({
  selector: 'app-createTodo',
  templateUrl: './createTodo.component.html',
  styleUrls: ['./createTodo.component.css']
})
export class CreateTodoComponent implements OnInit {
  @Input() data: Todo;
  @Output() ping: EventEmitter<Todo> = new EventEmitter<Todo>();

  constructor(public dialog: MatDialog) {
    this.data = {
      lable: undefined,
      text: undefined,
      important: false,
      done: false,
    }
  }

  createTodo(event?: any): void {
    console.log(this.data)
    this.ping.emit(this.data)
      this.data = {
        lable: undefined,
        text: undefined,
        important: false,
        done: false,
      }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TodoDialog, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.data = result;
      if(this.data.lable != null) {
        this.createTodo()
      } else {
        alert("Titel has to contain text")
      }
    }); 
  }

  ngOnInit(): void {
  }

}
