import { EventPing } from './../interface/eventping';
import { Todo } from './../interface/todo';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {
  
  public createTodo = true;
  public donetodosbool = true;
  public $todos: Todo[];
  public $todosdone: Todo[];
  public $recenttodo: Todo[];
  public $todoimportant: Todo[];    

  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' }
  
  constructor() { 
    this.$todos = [];
    this.$recenttodo = [];
    this.$todosdone = [];
    this.$todoimportant = [];  
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
    if (localStorage.getItem('$todoimportant')===null) {
      this.$todoimportant = [];
    } else {
      this.$todoimportant = JSON.parse(localStorage.getItem('$todoimportant'))
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
      console.log('check wurde getriggert');
      this.$recenttodo = [];
      this.setlocalStorage();  
      if (!eventping.object.done && !eventping.object.important) {
        this.$todosdone.splice(this.$todosdone.indexOf(eventping.object), 1);
        this.$todos.push(eventping.object);
      } else if (eventping.object.done && !eventping.object.important) {
        this.$todos.splice(this.$todos.indexOf(eventping.object), 1);
        this.$todosdone.unshift(eventping.object);
        this.$recenttodo.unshift(eventping.object);
      } else {
        this.$todoimportant.splice(this.$todoimportant.indexOf(eventping.object), 1)
        eventping.object.important = false;
        this.$todosdone.unshift(eventping.object);
        this.$recenttodo.unshift(eventping.object);
      }
      this.setlocalStorage();
    }
    
    if ('delete' === eventping.lable) {
      console.log('delete wurde getriggert')
      if (eventping.object.done) {
        this.$todosdone.splice(this.$todosdone.indexOf(eventping.object), 1)
        this.$recenttodo = [];
        this.setlocalStorage();  
        var lastTodo = this.$todosdone.slice(-1);
        this.$recenttodo = lastTodo;                  
      }
      else if (!eventping.object.done && !eventping.object.important){
        this.$todos.splice(this.$todos.indexOf(eventping.object), 1)
      } else {
        this.$todoimportant.splice(this.$todoimportant.indexOf(eventping.object), 1)
      }
      this.setlocalStorage();  
    }

    if ('important' === eventping.lable) {
      console.log('important wurde getriggert')
      if (!eventping.object.important && !eventping.object.done) {
        this.$todoimportant.splice(this.$todoimportant.indexOf(eventping.object), 1);
        this.$todos.unshift(eventping.object)
      } else if (eventping.object.important && !eventping.object.done) {
        this.$todos.splice(this.$todos.indexOf(eventping.object), 1);
        this.$todoimportant.unshift(eventping.object);  
      }
      this.setlocalStorage();  
    }

    if ('edit' === eventping.lable) {
      if (!eventping.object.important) {
        this.$todos.forEach((ToDo: Todo)=> {
          if(eventping.object.id === ToDo.id) {
            ToDo.lable = eventping.object.lable
            ToDo.text = eventping.object.text
          }
        })
      } else {
        this.$todoimportant.forEach((ToDo: Todo)=> {
          if(ToDo.id === eventping.object.id) {
            ToDo.lable = eventping.object.lable
            ToDo.text = eventping.object.text
          }
        })
      }
      this.setlocalStorage();  
    }
  }

  public create(todo: Todo): void {
   if(todo.important != true) {
      todo.id = this.$todos.length;
      this.$todos.push(todo);
      console.log("create wurde getriggert"); 
      this.setlocalStorage()
    } else {
      todo.id = this.$todos.length + 1;
      this.$todoimportant.push(todo);
      console.log("create important wurde getriggert"); 
    }
  }
 
  public delTodos() {
    this.$todos = [];
    this.$todoimportant = [];
    this.setlocalStorage();  
  }

  public setlocalStorage() {
    localStorage.setItem('$todoimportant', JSON.stringify(this.$todoimportant));
    localStorage.setItem('$todos', JSON.stringify(this.$todos));  
    localStorage.setItem('$todosdone', JSON.stringify(this.$todosdone)); 
    localStorage.setItem('$recenttodo', JSON.stringify(this.$recenttodo)); 
  }
}
