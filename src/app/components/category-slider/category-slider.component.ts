import { Component, inject } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../core/services/categories.service';
import { TranslationService } from '../../core/services/translation.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-category-slider',
  standalone: true,
  imports: [CarouselModule, TranslateModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss'
})

export class CategorySliderComponent {
  private readonly _TranslationService = inject(TranslationService)
  //Injects the <TranslationService> service into the current class and stores it in a private and readonly property named <_TranslationService>.
  readonly _TranslateService = inject(TranslateService)
  //Injects the <TranslateService> and stores it in a read-only property.
  
  categories: any = []
  //Declares a public property named <categories> initialized as an empty array. 
  //The array will store the data for the categories to be displayed in the carousel.
  private readonly _CategoriesService = inject(CategoriesService)
  //Injects the <CategoriesService> service which will be used to fetch category data from an API or backend.

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
    navText: ['', ''], //Sets the text for the navigation buttons
    autoplay: true, //Enables automatic slide transitions
    autoplayTimeout: 2000, //Sets the interval between slides
    margin: 8, //Sets margin between slides
    //slideTransition: 'linear', //Sets the transition effect for sliding between slides
    //smartSpeed: 1700, //Sets the animation speed for transitions between slides
    autoplayHoverPause: true,
    responsive: {
      //Defines a responsive configuration for the carousel. 
      //It allows the carousel to adjust its appearance and behavior based on the screen size.
      0: {
        items: 2
      },
      400: {
        items: 4
      },
      740: {
        items: 6
      },
      940: {
        items: 8
      }
    },
    nav: false
  }

  getCategories = () => {
  //Calls the <getCategories> method of the injected <_CategoriesService>.
    this._CategoriesService.getCategories().subscribe({
    //Subscribes to the observable returned by the service call
      next: (res) => {
        console.log(res);
        this.categories = res.data
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
  //Defines the <ngOnInit> lifecycle hook method of the component which is automatically called when the component is initialized.
    this.getCategories()
  }
}