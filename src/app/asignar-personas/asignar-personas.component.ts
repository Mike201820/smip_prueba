import { Component, Inject, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-asignar-personas',
  templateUrl: './asignar-personas.component.html',
  styleUrls: ['./asignar-personas.component.css']
})
export class AsignarPersonasComponent implements OnInit {

 

  // Filtros dinámicos
  searchQueryNoAsignados: string = ''; // Para el input del card izquierdo
  searchQueryAprobados: string = ''; // Para el input del card derecho

  selectedType: string = 'supervisores';

  supervisores = [
    { id: 1, nombre: 'Supervisor Ing. Juan Perez' },
    { id: 2, nombre: 'Supervisor Arq. Jorge Torrez' },
    { id: 3, nombre: 'Supervisor Ing. Pedro Gonzales' }
  ];

  fiscales = [
    { id: 4, nombre: 'Fiscal Arq. Andres Paredes' },
    { id: 5, nombre: 'Fiscal Arq. Freddy Contreras' },
    { id: 6, nombre: 'Fiscal Ing. Guillermo Paz' }
  ];


  


  noAsignados = [...this.supervisores]; // Por defecto, supervisores no asignados
  aprobados: any[] = []; // Lista de aprobados inicialmente vacía

  draggingItem: any | null = null; // Elemento que está siendo arrastrado

  tipoDesignados: string | null = 'Supervisores'; // Subtítulo dinámico para el card 2

  constructor(
    private dialogRef: MatDialogRef<AsignarPersonasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  // Método del ciclo de vida para inicializar el componente
  ngOnInit() {
    //this.setSelectedType(this.selectedType); // Inicializa la lista según el tipo por defecto

     // Cargar datos desde Session Storage
     const storageKey = `aprobados-${this.data.proyectoId}-${this.selectedType}`;
     const savedData = sessionStorage.getItem(storageKey);
   
     this.aprobados = savedData ? JSON.parse(savedData) : [];
     this.filterList(); // Inicializa la lista de no asignados

     this.setSelectedType(this.selectedType); // Inicializa los datos según el tipo seleccionado
    
  }
//ultimo que funcionaba bien 
  setSelectedType2(type: string) {
    if (this.selectedType !== type) {
      this.selectedType = type;
      this.aprobados = []; // Vaciar la lista aprobados al cambiar de tipo
    }
  
    // Filtrar la lista de no asignados según el tipo seleccionado
    this.noAsignados = this.selectedType === 'supervisores'
      ? this.supervisores.filter(sup => !this.aprobados.some(ap => ap.id === sup.id))
      : this.fiscales.filter(fis => !this.aprobados.some(ap => ap.id === fis.id));
  
    // Ajustar el subtítulo del card derecho
    this.tipoDesignados = this.selectedType === 'supervisores' ? 'Supervisores' : 'Fiscales';
  }

  setSelectedType3(type: string) {
    this.selectedType = type;
  
    // Cargar datos guardados en Session Storage según el tipo seleccionado
    const storageKey = `aprobados-${this.data.proyectoId}-${this.selectedType}`;
    const savedData = sessionStorage.getItem(storageKey);
  
    this.aprobados = savedData ? JSON.parse(savedData) : [];
  
    // Filtrar la lista de no asignados
    this.filterList();
  }
  
  

  filterList2() {
    this.noAsignados = this.selectedType === 'supervisores' 
      ? this.supervisores.filter(sup => !this.aprobados.some(ap => ap.id === sup.id)) 
      : this.fiscales.filter(fis => !this.aprobados.some(ap => ap.id === fis.id));
  }
//ultimo que funcionaba bien 
  filterList3() {
    this.aprobados = [];
    this.noAsignados = this.selectedType === 'supervisores' ? this.supervisores : this.fiscales;
    this.tipoDesignados = this.selectedType === 'supervisores' ? 'Supervisores' : 'Fiscales';
  }

  filterList4() {
    this.noAsignados = this.selectedType === 'supervisores'
      ? this.supervisores.filter(sup => !this.aprobados.some(ap => ap.id === sup.id))
      : this.fiscales.filter(fis => !this.aprobados.some(ap => ap.id === fis.id));
  
    // Ajustar el subtítulo del card derecho
    this.tipoDesignados = this.selectedType === 'supervisores' ? 'Supervisores' : 'Fiscales';
  }
  

  onDragStart(item: any) {
    this.draggingItem = item;
  }

  onDragEnd() {
    this.draggingItem = null;
  }

  onDrop(event: CdkDragDrop<any[]>): void {
    // Asegurarnos de que el tipo actual es coherente con las listas
    const isSupervisores = this.selectedType === 'supervisores';
    const noAsignadosSource = isSupervisores ? this.supervisores : this.fiscales;
  
    // Validar que el evento sea entre las listas correctas
    if (event.previousContainer === event.container) {
      // Ordenar dentro de la misma lista
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Transferir entre contenedores
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
  
      // Validar el tipo y actualizar la propiedad `hasPDF` si aplica
      const movedItem = event.container.data[event.currentIndex];
      if (event.container.id === 'aprobadosList') {
        movedItem.hasPDF = true;
      } else if (event.container.id === 'noAsignadosList') {
        delete movedItem.hasPDF;
      }
    }
  
    // Guardar cambios y actualizar posiciones
    this.saveToSessionStorage();
    this.updatePositions();
  }
  

  saveToSessionStorage() {
    const storageKey = `aprobados-${this.data.proyectoId}-${this.selectedType}`;
    sessionStorage.setItem(storageKey, JSON.stringify(this.aprobados));
  }

  updatePositions() {
    this.aprobados.forEach((item, index) => {
      item.position = index + 1;
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    this.saveToSessionStorage();
    this.dialogRef.close(this.aprobados);
  }


  

  // Getters para las listas filtradas dinámicamente
  get filteredNoAsignados(): any[] {
    return this.noAsignados.filter((item) =>
      item.nombre.toLowerCase().includes(this.searchQueryNoAsignados.toLowerCase())
    );
  }

  get filteredAprobados(): any[] {
    return this.aprobados.filter((item) =>
      item.nombre.toLowerCase().includes(this.searchQueryAprobados.toLowerCase())
    );
  }

  // Métodos para manejar los cambios de búsqueda
  updateSearchNoAsignados(event: Event): void {
    this.searchQueryNoAsignados = (event.target as HTMLInputElement).value;
  }

  updateSearchAprobados(event: Event): void {
    this.searchQueryAprobados = (event.target as HTMLInputElement).value;
  }

  setSelectedType(type: string): void {
    this.selectedType = type;

    // Cargar datos de sesión
    const storageKey = `aprobados-${this.data.proyectoId}-${this.selectedType}`;
    const savedData = sessionStorage.getItem(storageKey);
    this.aprobados = savedData ? JSON.parse(savedData) : [];

    this.filterList();
  }

  filterList(): void {
    this.noAsignados =
    this.selectedType === 'supervisores'
      ? this.supervisores.filter(
          (sup) => !this.aprobados.some((ap) => ap.id === sup.id)
        )
      : this.fiscales.filter(
          (fis) => !this.aprobados.some((ap) => ap.id === fis.id)
        );
  }
}
