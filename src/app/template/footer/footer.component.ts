import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Todo } from '../../interface/todo';
import { MatDialog } from '@angular/material/dialog';
import { TodoDialog } from 'src/app/dialog/dialog-todo';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent {
  @Input() data: Todo;
  @Output() ping: EventEmitter<Todo> = new EventEmitter<Todo>();
  
  constructor(public dialog: MatDialog, public translate: TranslateService) {
    this.data = {
      lable: undefined,
      text: undefined,
      important: false,
      done: false,
    }
    translate.addLangs(['en', 'de', 'fr']);
    var currentLanguage = JSON.parse(localStorage.getItem('language'));
    translate.setDefaultLang(currentLanguage);
    translate.currentLang = currentLanguage;
  }
  
  switchLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('language', JSON.stringify(lang)); 
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
  
}
