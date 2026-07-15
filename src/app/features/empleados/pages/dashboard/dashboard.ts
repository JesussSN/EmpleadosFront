import { Component } from '@angular/core';
import { Carousel } from './components/carousel/carousel';

@Component({
  selector: 'app-dashboard',
  imports: [Carousel],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
