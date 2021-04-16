import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import { Todo } from '../../interface/todo';
import { MatDialog } from '@angular/material/dialog';
import { TodoDialog } from 'src/app/dialog/dialog-todo';
    
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
        this.ping.emit(this.data)
      }
      
      openDialog(): void {
        const dialogRef = this.dialog.open(TodoDialog, {
          width: '230px',
          data: { lable: null, text: null, id: null, important: null }
        });
        dialogRef.afterClosed().subscribe(result => {
          this.data = result;
          try {
            if(this.data.lable != null) {
              this.createTodo()
            } else {
              alert("Titel has to contain text")
            }
          } catch {}
        }); 
      }
      
      ngOnInit(): void {
      }
      
    }
    