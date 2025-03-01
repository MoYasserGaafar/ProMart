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
  readonly _TranslateService = inject(TranslateService)
  
  categories: any = []
  private readonly _CategoriesService = inject(CategoriesService)

  //npm >> <ngx-owl-carousel-o> Package >> <customOptions>
  customOptions: OwlOptions = {

    loop: true, 
    mouseDrag: true,
    touchDrag: true,
    dots: false, 
    rtl: true, 
    navSpeed: 700, 
    navText: ['', ''], 
    autoplay: true, 
    autoplayTimeout: 2000, 
    margin: 8, 
    //slideTransition: 'linear', 
    //smartSpeed: 1700, 
    autoplayHoverPause: true,
    responsive: {
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
    this._CategoriesService.getCategories().subscribe({
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
    this.getCategories()
  }
}