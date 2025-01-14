import { Component, OnInit } from '@angular/core';
import { CategoryGatewayService } from '../../../../../core/services/category-gateway.service';
import { Category } from '../../../../../core/interfaces/category.interface';


@Component({
  selector: 'app-table-categories',
  templateUrl: './table-categories.component.html',
  styleUrls: ['./table-categories.component.scss']
})
export class TableCategoriesComponent implements OnInit {
  categories: Category[] = [];
  loading: boolean = true;

  constructor(private categoryGatewayService: CategoryGatewayService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading = true;
    this.categoryGatewayService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading categories:', err);
        this.loading = false;
      }
    });
  }

  deleteCategory(id: string): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryGatewayService.deleteCategory(id).subscribe({
        next: () => {
          this.categories = this.categories.filter(c => c._id !== id);
        },
        error: (err) => {
          console.error('Error deleting category:', err);
        }
      });
    }
  }
}
