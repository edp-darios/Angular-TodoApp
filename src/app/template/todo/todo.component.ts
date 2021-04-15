import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Todo } from '../../interface/todo';
import { EventPing } from './../../interface/eventping';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'EditTodoDialog',
  templateUrl: 'dialog-edit-todo.html',
  styleUrls: ['./todo.component.css']
})
export class EditTodoDialog {
  
  @Input() data: Todo;
  
  constructor(
    public dialogRef: MatDialogRef<EditTodoDialog>,
    @Inject(MAT_DIALOG_DATA) public todo: Todo) { }
 
      onNoClick(): void {
        this.dialogRef.close();
      }
      
    }

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
    this.toDo$.important = !this.toDo$.important;
    const eventObject: EventPing = {
      lable: 'important',
      object: this.toDo$
    }
    this.ping.emit(eventObject);
  }

  editTodo(): void {
    console.log("works!")
    const dialogRef = this.dialog.open(EditTodoDialog, {
      width: '230px',
    });
    dialogRef.afterClosed().subscribe(result => {
  
    }); 
  }
  

  ngOnInit(): void {}
  
}
