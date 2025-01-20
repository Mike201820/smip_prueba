import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-solicitud',
  templateUrl: './modal-solicitud.component.html',
  styleUrls: ['./modal-solicitud.component.css']
})
export class ModalSolicitudComponent {
  tipoPersonal: string | null = null; // Inicialmente no hay selección
  departamento: string = ''; // Se actualizará según la selección

  constructor(private dialogRef: MatDialogRef<ModalSolicitudComponent>) {}

  // Método para manejar la selección
  onSelect(tipo: string) {
    this.tipoPersonal = tipo;
    // Actualiza el departamento según la opción seleccionada
    this.departamento =
      tipo === 'Supervisor' ? 'SMIP-DESIE' : 'SMIP DFO';
  }

  // Manejo del botón Cancelar
  onCancel() {
    this.dialogRef.close(); // Cierra el modal sin enviar datos
  }

  // Manejo del botón Enviar
  onEnviar() {
    if (!this.tipoPersonal) {
      alert('Por favor seleccione un tipo de personal antes de enviar.');
      return;
    }
    console.log('Opción seleccionada:', this.tipoPersonal);
    console.log('Departamento:', this.departamento);
    this.dialogRef.close(this.tipoPersonal); // Envía los datos seleccionados y cierra el modal
  }
}
