import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-conocer-mas',
  standalone: true,
  templateUrl: './conocer-mas.html',
  styleUrl: './conocer-mas.css',
})
export class ConocerMas {
  @Input() visible = false;
  @Input() tipo: 'empresa' | 'servicios' | 'valores' = 'empresa';
  @Output() cerrado = new EventEmitter<void>();

  get contenido() {
    switch (this.tipo) {
      case 'servicios':
        return {
          titulo: 'Nuestros servicios',
          descripcion: 'Diseñamos soluciones digitales, automatización y soporte para hacer crecer tu negocio.',
          tarjetas: [
            { titulo: 'Desarrollo', texto: 'Aplicaciones y plataformas a medida para tus procesos.' },
            { titulo: 'Consultoría', texto: 'Estrategias tecnológicas con enfoque práctico y resultados.' },
            { titulo: 'Soporte', texto: 'Acompañamiento continuo para mantener todo funcionando.' }
          ]
        };
      case 'valores':
        return {
          titulo: 'Nuestra forma de trabajar',
          descripcion: 'Creemos en la honestidad, la mejora continua y el trabajo en equipo como base del éxito.',
          tarjetas: [
            { titulo: 'Compromiso', texto: 'Estamos presentes en cada etapa del proyecto.' },
            { titulo: 'Innovación', texto: 'Buscamos nuevas maneras de crear valor.' },
            { titulo: 'Respeto', texto: 'Valoramos a las personas y sus ideas.' }
          ]
        };
      default:
        return {
          titulo: 'Sobre nuestra empresa',
          descripcion: 'Somos una organización comprometida con la innovación, el crecimiento de las personas y la excelencia en cada proyecto.',
          tarjetas: [
            { titulo: 'Nuestra misión', texto: 'Transformar ideas en soluciones reales que generen impacto y valor.' },
            { titulo: 'Nuestra visión', texto: 'Ser referentes en tecnología y servicio, impulsando el futuro con confianza.' },
            { titulo: 'Nuestro enfoque', texto: 'Trabajamos con compromiso, colaboración y una mentalidad de mejora continua.' }
          ]
        };
    }
  }

  cerrar(): void {
    this.cerrado.emit();
  }
}
