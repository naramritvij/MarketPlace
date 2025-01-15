import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: string[] = []; // Holds the categories

  // Get the list of categories
  getCategories(): string[] {
    return this.categories;
  }

  // Set the list of categories
  setCategories(newCategories: string[]): void {
    this.categories = Array.from(new Set(newCategories)); // Ensure unique categories
  }

  // Add a new category (if it doesn't exist)
  addCategory(newCategory: string): void {
    if (!this.categories.includes(newCategory)) {
      this.categories.push(newCategory);
    }
  }
}
