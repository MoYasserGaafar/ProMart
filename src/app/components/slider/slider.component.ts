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
  //Defines the <customOptions> property of type <OwlOptions>.
  //The object will hold configuration settings for the owl carousel component.
  //<OwlOptions> is an interface or type defined by the <ngx-owl-carousel> library, specifying the properties that can be used to customize the carousel.
  //The options control the carousel's behavior, such as looping, navigation, responsiveness, and the number of items displayed on different screen sizes.

    loop: true, //Enables the carousel to loop infinitely
    mouseDrag: true,
    touchDrag: true,
    dots: false, //Sets the navigation dots below the carousel
    rtl: true, //Sets the text direction to right-to-left
    navSpeed: 700, //Sets the navigation speed
    navText: ['<i class="fa-solid fa-arrow-right"></i>', '<i class="fa-solid fa-arrow-left"></i>'], //Sets the text for the navigation buttons
    autoplay: true, //Enables automatic slide transitions
    autoplayTimeout: 2000, //Sets the interval between slides
    //slideTransition: 'linear', //Sets the transition effect for sliding between slides
    //smartSpeed: 1700, //Sets the animation speed for transitions between slides
    autoplayHoverPause: true, //Sets the playback behavior when hovering over the slides
    responsive: {
    //Defines a responsive configuration for the carousel. 
    //It allows the carousel to adjust its appearance and behavior based on the screen size.
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