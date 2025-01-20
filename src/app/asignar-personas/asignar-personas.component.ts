import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-asignar-personas',
  templateUrl: './asignar-personas.component.html',
  styleUrls: ['./asignar-personas.component.css']
})
export class AsignarPersonasComponent {
  // Variable para seleccionar entre supervisores o fiscales
  selectedType: string = 'supervisores';

  // Listas de datos
  supervisores = [
    { id: 1, nombre: 'Supervisor 1' },
    { id: 2, nombre: 'Supervisor 2' },
    { id: 3, nombre: 'Supervisor 3' }
  ];

  fiscales = [
    { id: 4, nombre: 'Fiscal 1' },
    { id: 5, nombre: 'Fiscal 2' },
    { id: 6, nombre: 'Fiscal 3' }
  ];

  // Inicialización de las listas visibles en los cards
  noAsignados = [...this.supervisores]; // Por defecto, supervisores no asignados
  aprobados: any[] = []; // Lista de aprobados inicialmente vacía

  // Cambiar entre supervisores y fiscales
  filterList2() {
    // Cambia la lista visible según el tipo seleccionado
    this.noAsignados = this.selectedType === 'supervisores' ? 
      this.supervisores.filter(sup => !this.aprobados.some(ap => ap.id === sup.id)) : 
      this.fiscales.filter(fis => !this.aprobados.some(ap => ap.id === fis.id));
  }

  filterList() {
    // Limpiar el card 2 (lista aprobados) al cambiar de tipo
    this.aprobados = [];

    // Cambia la lista visible según el tipo seleccionado
    this.noAsignados = this.selectedType === 'supervisores' ? 
      this.supervisores : 
      this.fiscales;
  }

  // Manejo de drag-and-drop
  onDrop(event: CdkDragDrop<any[]>) {
    console.log('Dropping item:', event);
    if (event.previousContainer === event.container) {
      // Reordenar en el mismo card
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Mover entre cards
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      //this.filterList();
    }
  }
}
