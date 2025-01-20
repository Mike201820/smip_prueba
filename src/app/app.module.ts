import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AsignacionComponent } from './asignacion/asignacion.component';


// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { ModalSolicitudComponent } from './modal-solicitud/modal-solicitud.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { AsignarPersonasComponent } from './asignar-personas/asignar-personas.component';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    AppComponent,
    AsignacionComponent,
    ModalSolicitudComponent,
    AsignarPersonasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
