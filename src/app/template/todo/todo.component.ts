import { Todo } from './../../interface/todo';
import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { EventPing } from './../../interface/eventping';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  text: string;
  lable: string;
}

@Component({
  selector: 'EditTodoDialog',
  templateUrl: 'dialog-edit-todo.html',
  styleUrls: ['./todo.component.css']
})
export class EditTodoDialog {
  
  constructor(
    public dialogRef: MatDialogRef<EditTodoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

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
      data: { lable: this.toDo$.lable, text: this.toDo$.text }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.toDo$ = result
      console.log(result.lable)
      this.toDo$.lable = result.lable                                    
      this.toDo$.text = result.text
      this.toDo$.done = false;
      this.toDo$.important = false;
      const eventObject: EventPing = {
        lable: 'edit',
        object: this.toDo$
      }
      this.ping.emit(eventObject);

        

    }); 
  }
  deleteAfterEdit() {
    const eventObject: EventPing = {
      lable: 'delete',
      object: this.toDo$
    }
    this.ping.emit(eventObject);
  }
  
  ngOnInit(): void {}
  
}
