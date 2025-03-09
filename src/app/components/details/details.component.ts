import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})

export class DetailsComponent {
  product!: Product
  private readonly _ProductsService = inject(ProductsService)
  private readonly _ActivatedRoute = inject(ActivatedRoute)

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayTimeout: 3000,
    margin: 15,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 3
      },
      400: {
        items: 3
      },
      740: {
        items: 3
      }
    },
    nav: false
  }

  ngOnInit(): void {
    let id: string | null = ""

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        //console.log(param.get('id'));
        id = param.get('id')
      }
    })

    this._ProductsService.getProduct(id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.product = res.data
      }
    })
  }

  //console.log(this._ActivatedRoute.snapshot.params['id']);
}