import { Component, OnInit } from '@angular/core';
import { Brand } from '../../core/interfaces/brand';
import { BrandsService } from '../../core/services/brands.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})

export class BrandsComponent implements OnInit {
  allBrands: Brand[] = [];
  constructor(private _BrandsService:BrandsService) {}

  getBrands = () => {
    this._BrandsService.getBrands().subscribe({
      next: (res) => {
        this.allBrands = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    this.getBrands();
  }
}