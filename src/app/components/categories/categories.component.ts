import { Component, OnInit } from '@angular/core';
import { Category } from '../../core/interfaces/category';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})

export class CategoriesComponent implements OnInit {
  allCategories: Category[] = [];
  constructor(private _CategoriesService:CategoriesService) {}

  getCategories = () => {
    this._CategoriesService.getCategories().subscribe({
      next: (res) => {
        this.allCategories = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    this.getCategories();
  }
}