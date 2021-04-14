import { Component, OnInit } from '@angular/core';
import { EventPing } from './../interface/eventping';
import { Todo } from './../interface/todo';
import { PageListComponent } from './../page-list/page-list.component'

@Component({
  selector: 'app-archiv',
  templateUrl: './archiv.component.html',
  styleUrls: ['./archiv.component.css']
})
export class ArchivComponent implements OnInit {

  public toDoShow: boolean;
  public toDoDoneShow: boolean;
  public $todos: Todo[];
  public $todosdone: Todo[];  
  public $recenttodo: Todo[];
  
  constructor() { 
    this.toDoDoneShow = true;
    this.$todos = [];
    this.$todosdone = []; 
    this.$recenttodo = []; 
    this.gettodos();
  }
  
  public gettodos() {
    if (localStorage.getItem('$todos')===null) {
      this.$todos = [];
    } else {
      this.$todos = JSON.parse(localStorage.getItem('$todos'))
    }
    if (localStorage.getItem('$todosdone')===null) {
      this.$todosdone = [];
    } else {
      this.$todosdone = JSON.parse(localStorage.getItem('$todosdone'))
    }
    if (localStorage.getItem('$recenttodo')===null) {
      this.$recenttodo = [];
    } else {
      this.$recenttodo = JSON.parse(localStorage.getItem('$recenttodo'))
    }
  }
  
  ngOnInit() {
  }

  public update(eventping: EventPing): void {
    
    if ('check' === eventping.lable) {
      console.log('check wurde getriggert')
      if (!eventping.object.done && !eventping.object.important) {
        this.$todosdone.splice(this.$todosdone.indexOf(eventping.object), 1);
        this.$todos.push(eventping.object);
        this.setlocalStorage("alltodos");
        var lastTodo = this.$todosdone.slice(-1);
        this.$recenttodo = lastTodo;                 
        localStorage.setItem('$recenttodo', JSON.stringify(this.$recenttodo));
      } 
      else if (eventping.object.done && !eventping.object.important) {
        this.$todos.splice(this.$todos.indexOf(eventping.object), 1);
        this.$todosdone.push(eventping.object);
        this.setlocalStorage("alltodos");
      } 
    }
    
    if ('delete' === eventping.lable) {
      console.log('delete wurde getriggert');
      this.$todosdone.splice(this.$todosdone.indexOf(eventping.object), 1);
      this.setlocalStorage("todosdone");
      var lastTodo = this.$todosdone.slice(-1);
      this.$recenttodo = lastTodo;                 
      localStorage.setItem('$recenttodo', JSON.stringify(this.$recenttodo));
    }

  } 

  public delDoneTodos() {
    this.$todosdone = [];
    this.$recenttodo = [];
    this.setlocalStorage("todosdone");
    localStorage.setItem('$recenttodo', JSON.stringify(this.$recenttodo));
  }
  public setlocalStorage(value) {
    if(value == "todos") {
      localStorage.setItem('$todos', JSON.stringify(this.$todos));
    } else if (value == "todosdone") {
      localStorage.setItem('$todosdone', JSON.stringify(this.$todosdone));  
    } else if (value == "alltodos") {
      localStorage.setItem('$todos', JSON.stringify(this.$todos));
      localStorage.setItem('$todosdone', JSON.stringify(this.$todosdone));  
    }
  }

}

