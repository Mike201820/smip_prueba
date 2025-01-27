import { Component, Inject, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { query } from '@angular/animations';
import { FormControl } from '@angular/forms'; // Importar FormControl


@Component({
  selector: 'app-asignar-personas',
  templateUrl: './asignar-personas.component.html',
  styleUrls: ['./asignar-personas.component.css']
})
export class AsignarPersonasComponent implements OnInit {
  

  // Listas para los elementos en el card derecho
aprobadosSupervisoresDerecha: any[] = [];
aprobadosFiscalesDerecha: any[] = [];


  // Lista para el card derecho (aprobados en la derecha)
aprobadosDerecha: any[] = []; // Aprobados inicialmente vacía
filteredAprobadosDerecha: any[] = []; // Lista filtrada para el card derecho

// Para la búsqueda en el card derecho
searchQueryAprobadosDerecha: string = ''; // Para el input de búsqueda en el card derecho

  // Filtros dinámicos
  isFocused: boolean = false;
  searchQueryNoAsignados2: FormControl = new FormControl(''); 
  searchQueryNoAsignados: string = ''; // Para el input del card izquierdo
  searchQueryAprobados: string = ''; // Para el input del card derecho

  selectedType: string = 'supervisores'; // Pestaña activa por defecto
  activeTab: 'supervisores' | 'fiscales' = 'supervisores';
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

  noAsignados: any[] = [...this.supervisores]; // Inicialmente, supervisores no asignados
  filteredNoAsignados2: any[] = [...this.supervisores]; // Lista filtrada
  aprobados: any[] = []; // Lista de aprobados inicialmente vacía

  constructor(
    private dialogRef: MatDialogRef<AsignarPersonasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    // Cargar datos desde SessionStorage al inicializar
    const storageKey = `aprobados-${this.data.proyectoId}-${this.selectedType}`;
    const savedData = sessionStorage.getItem(storageKey);
    this.aprobados = savedData ? JSON.parse(savedData) : [];
    this.filterList(); // Actualiza las listas al iniciar
    this.noAsignados = [...this.supervisores]; // Carga inicial
    this.filteredNoAsignados2 = [...this.noAsignados]; // Inicializamos la lista filtrada
    console.log(this.noAsignados, this.filteredNoAsignados2);
    
    this.searchQueryNoAsignados2.valueChanges.subscribe((searchTerm) => {
      console.log('Valor de búsqueda:', searchTerm);
      this.filterListBySearch(searchTerm); // Filtrar solo cuando el término de búsqueda cambie
    });
    this.setTabContent();
  }

  // Cambiar pestaña y actualizar listas
  setSelectedType(type: 'supervisores' | 'fiscales'): void {
    if (this.selectedType !== type) {
      this.selectedType = type;
      this.activeTab = type; 
      this.searchQueryNoAsignados = '';
      this.setTabContent();
      // Cargar datos de SessionStorage según el tipo seleccionado
      const storageKey = `aprobados-${this.data.proyectoId}-${this.selectedType}`;
      const savedData = sessionStorage.getItem(storageKey);
      this.aprobados = savedData ? JSON.parse(savedData) : [];

      // Actualizar las listas dinámicamente
      this.filterList();
    }
  }

    // Manejo del enfoque (cuando el input recibe foco)
    onFocus(): void {
      console.log('Input enfocado');
    // Cambiar el color de borde al enfoque, dependiendo de la pestaña
    this.isFocused = true; // Se activa cuando el input recibe el foco
    }
  
    // Manejo del desenfoque (cuando el input pierde foco)
    onBlur(): void {
      console.log('Input desenfocado');
      // Puedes cambiar el borde al perder el foco si lo deseas
      this.isFocused = false; 
    }
  setTabContent() {
    if (this.selectedType === 'supervisores') {
      this.noAsignados = [...this.supervisores];
    } else {
      this.noAsignados = [...this.fiscales];
    }
  
    this.filteredNoAsignados2 = [...this.noAsignados];
  }

  // Filtrar las listas según el tipo seleccionado
  filterList(): void {
    this.noAsignados =
      this.selectedType === 'supervisores'
        ? this.supervisores.filter((sup) => !this.aprobados.some((ap) => ap.id === sup.id))
        : this.fiscales.filter((fis) => !this.aprobados.some((ap) => ap.id === fis.id));
  }

  // Filtrar la lista solo con el término de búsqueda
  filterListBySearch(searchTerm: string): void {
    this.filteredNoAsignados2 = this.noAsignados.filter((item) =>
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log('Resultados filtrados:', this.filteredNoAsignados2);
  }
  
  


  // Métodos de búsqueda
  updateSearchNoAsignados(event: Event): void {
    this.searchQueryNoAsignados = (event.target as HTMLInputElement).value.toLowerCase();
    
  }
  

  updateSearchAprobados(event: Event): void {
    this.searchQueryAprobados = (event.target as HTMLInputElement).value.toLowerCase();
  }

  // Drag and Drop
  onDrop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      // Si el drop es en el mismo contenedor, solo mover el item dentro de la lista
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Si el drop es en un contenedor diferente (de izquierda a derecha)
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
  
      const movedItem = event.container.data[event.currentIndex];
  
      // Verifica si el item fue arrastrado al lado derecho
      if (event.container.id === 'aprobadosListDerecha') {
        if (this.activeTab === 'supervisores') {
          this.aprobadosSupervisoresDerecha.push(movedItem);
        } else if (this.activeTab === 'fiscales') {
          this.aprobadosFiscalesDerecha.push(movedItem);
        }
      }
  
      // Verifica si el item fue arrastrado a la lista de fiscales en el card derecho
      if (event.container.id === 'aprobadosFiscalesListDerecha') {
        if (this.activeTab === 'supervisores') {
          this.aprobadosSupervisoresDerecha.push(movedItem);
        } else if (this.activeTab === 'fiscales') {
          this.aprobadosFiscalesDerecha.push(movedItem);
        }
      }
  
      // Guardar cambios si es necesario
      this.saveToSessionStorage();
    }
  }
  
  
  
  onSearchAprobadosDerecha(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value; // Capturar el valor del input
    console.log('Valor de búsqueda (derecha):', inputValue);
    
    this.filteredAprobadosDerecha = this.aprobadosDerecha.filter((item) =>
      item.nombre.toLowerCase().includes(inputValue.toLowerCase()) // Filtrar por el valor ingresado
    );
    
    console.log('Resultados filtrados (derecha):', this.filteredAprobadosDerecha);
  }
  
  

  saveToSessionStorage() {
    const storageKey = `aprobados-${this.data.proyectoId}-${this.selectedType}`;
    sessionStorage.setItem(storageKey, JSON.stringify(this.aprobados));
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    this.saveToSessionStorage();
    this.dialogRef.close(this.aprobados);
  }

  // Getters para listas filtradas dinámicamente
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

  get borderClass(): string {
    return this.selectedType === 'supervisores' ? 'supervisores-border' : 'fiscales-border';
  }

  onSearchNoAsignados(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value; // Capturar el valor del input
    console.log('Valor de búsqueda:', inputValue);
  
    this.filteredNoAsignados2 = this.noAsignados.filter((item) =>
      item.nombre.toLowerCase().includes(inputValue.toLowerCase()) // Filtrar por el valor ingresado
    );
  
    console.log('Resultados filtrados:', this.filteredNoAsignados);
  }
  
  
  
  
}
