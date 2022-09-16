export class Tarea {
  id: string;
  descripcion: string;
  terminada: boolean;
  fechaCreacion: string;

  constructor(id: string, descripcion: string = '', terminada: boolean = false, fechaCreacion: string = '') {
    this.id = id;
    this.descripcion = descripcion;
    this.terminada = terminada;
    this.fechaCreacion = fechaCreacion;
  }
}
