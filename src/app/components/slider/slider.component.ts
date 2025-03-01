import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})

export class SliderComponent {
  //npm >> <ngx-owl-carousel-o> Package >> <customOptions>
  customOptions: OwlOptions = {
    loop: true, 
    mouseDrag: true,
    touchDrag: true,
    dots: false, 
    rtl: true, 
    navSpeed: 700, 
    navText: ['<i class="fa-solid fa-arrow-right"></i>', '<i class="fa-solid fa-arrow-left"></i>'], 
    autoplay: true, 
    autoplayTimeout: 2000, 
    //slideTransition: 'linear', 
    //smartSpeed: 1700, 
    autoplayHoverPause: true, 
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
}