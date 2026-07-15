import { Component, OnInit, OnDestroy } from '@angular/core';


interface Slide{

  titulo:string;
  descripcion:string;
  imagen:string;
  boton:string;

}


@Component({
  selector: 'app-carousel',
  standalone:true,
  imports: [],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel implements OnInit, OnDestroy {


  indice = 0;


  intervalo:any;


  slides:Slide[]=[

    {
      titulo:'Nuestro talento hace la diferencia',
      descripcion:'Impulsamos la innovación mediante equipos altamente capacitados.',
      imagen:'images/banner1.jpeg',
      boton:'Conocer más'
    },


    {
      titulo:'La tecnología transforma empresas',
      descripcion:'Desarrollamos soluciones modernas para crecer juntos.',
      imagen:'images/banner2.jpeg',
      boton:'Ver servicios'
    },


    {
      titulo:'El éxito comienza con las personas',
      descripcion:'Nuestros colaboradores son el motor de la organización.',
      imagen:'images/banner3.jpeg',
      boton:'Leer más'
    }

  ];



  ngOnInit(){

    this.intervalo = setInterval(()=>{

      this.siguiente();

    },4000);

  }



  siguiente(){

    this.indice++;

    if(this.indice >= this.slides.length){

      this.indice = 0;

    }

  }



  cambiarSlide(index:number){

    this.indice = index;

  }



  ngOnDestroy(){

    clearInterval(this.intervalo);

  }


}