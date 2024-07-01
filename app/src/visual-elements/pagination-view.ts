import { bindable } from 'aurelia-framework';
import { autoinject, customElement } from 'aurelia-framework';

/**
 * Pagination component
 */
@autoinject
@customElement("pagination-view")
export class PaginationView {
  @bindable currentPage: number;
  @bindable totalPages: number;
  @bindable pageChangedCallback: (page: number) => {};

  constructor() {}

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChangedCallback(this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChangedCallback(this.currentPage);
    }
  }
}
