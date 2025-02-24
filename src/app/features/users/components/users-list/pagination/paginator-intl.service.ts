import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({providedIn:'root'})
export class PaginatorIntlService extends MatPaginatorIntl {
  private totalItems: number = 0;

  // Method to update totalItems
  setTotalItems(totalItems: number): void {
    console.log('rame',this.totalItems)
    this.totalItems = totalItems;
  }

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    return `Page ${page + 1} of ${Math.ceil((this.totalItems || length) / pageSize)}`;
  };
}