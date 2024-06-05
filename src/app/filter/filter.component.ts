import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'fet-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Input() all: number = 0;
  @Input() food: number = 0;
  @Input() beauty: number = 0;
  @Input() furniture: number = 0;

  selectedCategory: string = 'all';
  searchText: string = '';

  categories = [
    { name: 'All', value: 'all' },
    { name: 'Food', value: 'groceries' },
    { name: 'Beauty', value: 'beauty' },
    { name: 'Furniture', value: 'furniture' }
  ];

  @Output()
  onSelect: EventEmitter<{ category: string, name: string }> = new EventEmitter<{ category: string, name: string }>();

  filterCategories() {
    this.searchText = '';
    this.onSelect.emit({ category: this.selectedCategory, name: this.searchText });
  }

  updateSearchText() {
    this.onSelect.emit({ category: 'all', name: this.searchText });
  }
}
