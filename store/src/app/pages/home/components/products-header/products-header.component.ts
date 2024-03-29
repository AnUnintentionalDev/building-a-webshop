import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styles: [
  ]
})
export class ProductsHeaderComponent implements OnInit {

  sort = 'sort';
  itemsShowCount = 12;

  @Output() columnsCountChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onSortUpdated(newSort: string): void {
    this.sort = newSort;    
  }

  onItemUpdated(count: number) : void{
    this.itemsShowCount = count;
  }

  onColumnsUpdated(colsNum: number) : void {
    this.columnsCountChange.emit(colsNum);
  }

}
