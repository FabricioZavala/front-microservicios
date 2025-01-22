import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DAFAULT_PAGINATION_OPTIONS } from '../../../../core/constants/constants';

@Component({
  selector: 'shared-custom-pagination',
  templateUrl: './custom-pagination.component.html',
  styleUrl: './custom-pagination.component.scss',
})
export class CustomPaginationComponent {
  @Input()
  public paginationOptions: number[] = DAFAULT_PAGINATION_OPTIONS;

  @Input()
  public collectionSize: number = 0;

  @Output()
  public pageChange = new EventEmitter<number>();

  @Output()
  public pageSizeChange = new EventEmitter<number>();

  public page: number = 1;
  public pageSize: number = this.paginationOptions[0] || 1;

  private thereFirstHigherLimit: boolean = false;
  public previusPage: number = 1;

  public selectPage(page: string) {
    this.previusPage = this.page;
    const currentPage = parseInt(page, 10) || 1;
    if (
      this.previusPage !== currentPage &&
      Math.ceil(this.collectionSize / this.pageSize) >= currentPage
    ) {
      this.pageChange.emit(currentPage);
    }
    this.page = currentPage;
  }

  public formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

  public onPageChange($event: number) {
    this.pageChange.emit($event);
    this.page = $event;
  }

  public onPageSizeChange($event: number) {
    if ($event === 0 || !$event) return;
    if (this.shouldEmitLimit(this.collectionSize, $event)) {
      this.pageSizeChange.emit($event);
    }
  }

  private shouldEmitLimit(count: number, limit: number): boolean {
    if (limit < count) {
      this.thereFirstHigherLimit = false;
      return true;
    } else if (count < limit && !this.thereFirstHigherLimit) {
      this.thereFirstHigherLimit = true;
      return true;
    } else {
      return false;
    }
  }
}

const FILTER_PAG_REGEX = /[^0-9]/g;
