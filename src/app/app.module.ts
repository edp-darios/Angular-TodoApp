import { TodoDialog } from './dialog/dialog-todo';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageListComponent } from 'src/app/page-list/page-list.component';
import { HeaderComponent } from 'src/app/template/header/header.component';
import { TodoComponent } from 'src/app/template/todo/todo.component';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { ArchivComponent } from 'src/app/archiv/archiv.component';
import { FooterComponent } from 'src/app/template/footer/footer.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

@NgModule({
   declarations: [
      AppComponent,
      PageListComponent,
      HeaderComponent,
      TodoComponent,
      ArchivComponent,
      TodoDialog,
      FooterComponent,
   ],
   entryComponents: [
      TodoDialog
   ],
   imports: [
      CommonModule,
      HttpClientModule,
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatMenuModule,
      MatToolbarModule,
      MatCardModule,
      BrowserModule,
      MatInputModule,
      MatAutocompleteModule,
      MatDatepickerModule,
      MatFormFieldModule,
      MatRadioModule,
      MatSelectModule,
      MatSliderModule,
      MatSlideToggleModule,
      MatMenuModule,
      MatSidenavModule,
      MatToolbarModule,
      MatListModule,
      MatGridListModule,
      MatCardModule,
      MatStepperModule,
      MatTabsModule,
      MatExpansionModule,
      MatButtonToggleModule,
      MatChipsModule,
      MatIconModule,
      MatProgressSpinnerModule,
      MatProgressBarModule,
      MatDialogModule,
      MatTooltipModule,
      MatSnackBarModule,
      MatTableModule,
      MatSortModule,
      MatPaginatorModule,
      MatButtonModule,
      MatCheckboxModule,
      FormsModule,
      TranslateModule.forRoot({
         loader: {
           provide: TranslateLoader,
           useFactory: httpTranslateLoader,
           deps: [HttpClient]
         }
       })
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule { }

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
   return new TranslateHttpLoader(http);
 }