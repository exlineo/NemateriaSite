import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProjetsComponent } from './projets/projets.component';
import { PresentationComponent } from './presentation/presentation.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    ProjetsComponent,
    PresentationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
