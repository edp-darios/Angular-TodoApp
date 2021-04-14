import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../interface/todo';
import { EventPing } from './../../interface/eventping';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  
  @Input() toDo$: Todo;
  @Output() ping: EventEmitter<any> = new EventEmitter<any>();
  public showText = false

  constructor() {
    this.showText = false;
  }
  
  public changeCheck() {
    this.toDo$.done = !this.toDo$.done;
    console.log(this.toDo$.done)
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
    console.log(this.toDo$.important)
    const eventObject: EventPing = {
      lable: 'important',
      object: this.toDo$
    }
    this.ping.emit(eventObject);
  }

  ngOnInit(): void {}
  
}
