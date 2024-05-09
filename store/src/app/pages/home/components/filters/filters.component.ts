import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
})
export class FiltersComponent implements OnInit, OnDestroy {

  categories: Array<string> | undefined;
  categoriesSubscription: Subscription | undefined;

  @Output() showCategory = new EventEmitter<string>();

  constructor(
    private _storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.categoriesSubscription = this._storeService.getAllCategories().subscribe((_categories) => {
      this.categories = _categories;
    });
  }

  onShowCategory(category: string) : void {
    this.showCategory.emit(category);
  }

  ngOnDestroy(): void {
    if(this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }

}
