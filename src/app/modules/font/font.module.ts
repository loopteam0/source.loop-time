import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faGamepad, faFilm, faBook, faMusic } from '@fortawesome/free-solid-svg-icons';

library.add(faCoffee, faGamepad, faFilm, faBook, faMusic );
@NgModule({
  imports: [FontAwesomeModule ,
    CommonModule
  ], exports: [FontAwesomeModule ],
  declarations: []
})
export class FontModule { }
