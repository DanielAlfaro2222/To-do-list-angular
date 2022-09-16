import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { generateRandomId } from './app.helpers';
import { Tarea } from './app.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // Atributos
  #tareas: Tarea[] = this.getWorks();
  newWork: Tarea = new Tarea(generateRandomId());
  editWork: Tarea = {
    id: '',
    descripcion: '',
    terminada: false,
    fechaCreacion: ''
  }

  // Metodos
  private saveWorks(): void {
    localStorage.setItem('tareas', JSON.stringify(this.#tareas));
  }

  private getWorks(): Tarea[] {
    if (localStorage.getItem('tareas') === null) {
      return [];
    }

    return JSON.parse((localStorage.getItem('tareas')) ?? '[]');
  }

  agregarTarea(evento: Event) {
    evento.preventDefault();

    let fecha: string = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;

    this.newWork.fechaCreacion = fecha;

    this.#tareas.push(this.newWork);

    this.newWork = new Tarea(generateRandomId());

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Tarea agregada correctamente',
      showConfirmButton: true,
    });

    this.saveWorks();
  }

  findWorkById(id: string): number {
    return this.#tareas.findIndex(work => work.id === id);
  }

  findWorkByDescription(description: string): number {
    return this.#tareas.findIndex(work => work.descripcion.toLowerCase() === description.toLowerCase());
  }

  eliminarTarea(id: string) {
    Swal.fire({
      title: '¿Estas seguro de eliminar la tarea?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        const tarea: number = this.findWorkById(id);

        if (tarea !== -1) {
          this.#tareas.splice(tarea, 1);
        }

        this.saveWorks();

        Swal.fire(
          'Eliminada',
          'La tarea se elimino correctamente',
          'success'
        )
      }
    })
  }

  completarTarea(id: string): void {
    const tarea: Tarea = this.#tareas[this.findWorkById(id)];

    tarea.terminada = !tarea.terminada;

    this.saveWorks();
  }

  // Getters and setters
  get tareas(): Tarea[] {
    return this.#tareas;
  }
}
