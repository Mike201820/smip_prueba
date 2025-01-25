import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalSolicitudComponent } from '../modal-solicitud/modal-solicitud.component';
import { AsignarPersonasComponent } from '../asignar-personas/asignar-personas.component';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css'],
})
export class AsignacionComponent {
  // Columnas a mostrar en la tabla
  displayedColumns: string[] = [
    'codigo',
    'nombreCarpeta',
    'presupuesto',
    'unidadEjecutora',
    'fechaValidacion',
    'duracion',
    'accion',
  ];

  // Datos de la tabla
  dataSource = [
    {
      codigo: 'OBN-712-2024',
      nombreCarpeta:
        'CONSTRUCCIÓN ENLOSETADO AV. CIRCUNVALACIÓN ENTRE CALLE 2 Y ALTURA FORESTAL AF-1 ALTO FLORIDA',
      presupuesto: '143.848,80 Bs',
      unidadEjecutora: 'ADMINISTRACIÓN SUBALCALDÍA V SUR',
      fechaValidacion: '12/07/2024',
      duracion: '187 días',
    },
    {
      codigo: 'EMA-84-2024',
      nombreCarpeta:
        'CONSTRUCCIÓN Y ASFALTADO OBRAS COMPLEMENTARIAS C. GRAL OSORIO ENTRE C1 Y C3 ZONA LOMAS DE CHASQUIPAMPA Y VILLA ESPERANZA',
      presupuesto: '97.739,70 Bs',
      unidadEjecutora: 'ADMINISTRACIÓN SUBALCALDÍA V SUR',
      fechaValidacion: '12/07/2024',
      duracion: '187 días',
    },
    {
      codigo: 'OBN-715-2024',
      nombreCarpeta:
        'CONSTRUCCIÓN OBRAS DE ESTABILIZACIÓN DE TALUD ENTRE C/ RODRÍGUEZ Y AV. CIRCUNVALACIÓN ALTURA AV4-Y AV-2 ZONA CHASQUIPAMPA',
      presupuesto: '97.739,70 Bs',
      unidadEjecutora: 'ADMINISTRACIÓN SUBALCALDÍA V SUR',
      fechaValidacion: '12/07/2024',
      duracion: '187 días',
    },
  ];

  constructor(public dialog: MatDialog) {}

  // Método para abrir el modal
  openModal(row: any): void {
    const dialogRef = this.dialog.open(ModalSolicitudComponent, {
      //width: '800px', // Ancho del modal
    //height: 'auto',
      data: { codigo: row.codigo, nombreCarpeta: row.nombreCarpeta }, // Puedes pasar datos al modal si lo necesitas
    });

    // Maneja el cierre del modal
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Solicitud enviada:', result);
        // Aquí puedes manejar la respuesta enviada desde el modal
      }
    });
  }

  openModalA(row: any) {
    const dialogRef = this.dialog.open(AsignarPersonasComponent, {
      width: '100vw', // Ocupa el 90% del ancho de la ventana
      height: '70vw', // Ocupa el 90% del alto de la ventana
      maxWidth: '90vw',
      maxHeight: '70vh', // Define un tamaño máximo
      //panelClass: 'full-screen-modal',
      panelClass: 'custom-modal', // Clase CSS personalizada
      data: { 
        proyectoId: row.codigo,// Pasa el código como identificador único del proyecto
        codigo: row.codigo, // Código del proyecto
        nombreCarpeta: row.nombreCarpeta, // Nombre de la carpeta
        presupuesto: row.presupuesto, // Presupuesto del proyecto
        unidadEjecutora: row.unidadEjecutora, // Unidad ejecutora
        fechaValidacion: row.fechaValidacion, // Fecha de validación
        duracion: row.duracion
      }, 
    
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal cerrado', result);
    });
  }
  

  
}
