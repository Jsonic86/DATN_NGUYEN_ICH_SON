import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { StatusResponse } from 'src/app/core/const/constant';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-product-by-cartegory',
  templateUrl: './list-product-by-cartegory.component.html',
  styleUrls: ['./list-product-by-cartegory.component.scss']
})
export class ListProductByCartegoryComponent implements OnInit {
  // Make Math available for use in the template
  Math = Math;

  listItems: any[] = [];
  id!: number;
  loading: boolean = true;
  page: number = 1;
  pageSize: number = 9;
  totalElements: number = 0;
  results: number[] = [];

  constructor(
    private productService: ProductService,
    private notification: NzNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProductsByCategory();

    // Listen for route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.resetPagination();
        this.loadProductsByCategory();
      }
    });
  }

  private resetPagination(): void {
    this.page = 1;
    this.results = [];
    this.loading = true;
  }

  private loadProductsByCategory(): void {
    const urlSegments = window.location.href.split('/');
    this.id = +urlSegments[urlSegments.length - 1];

    if (this.id) {
      this.loading = true;

      this.productService.getAllProductsByCategory({
        categoryId: this.id,
        page: this.page - 1, // Convert to 0-based indexing for API
        size: this.pageSize
      }).subscribe(res => {
        this.loading = false;

        if (res.code === StatusResponse.OK) {
          this.listItems = res.result.content || [];
          this.totalElements = res.result?.totalElements || 0;

          // Update pagination
          this.updatePaginationData(res.result);
        } else {
          this.notification.error('Lỗi', 'Không thể tải sản phẩm');
          this.listItems = [];
        }
      }, error => {
        this.loading = false;
        this.notification.error('Lỗi', 'Đã xảy ra lỗi khi tải sản phẩm');
        this.listItems = [];
      });
    }
  }

  private updatePaginationData(result: any): void {
    this.results = [];
    if (result?.totalPages) {
      for (let i = 0; i < result.totalPages; i++) {
        this.results.push(i + 1);
      }
    }
    this.page = (result?.number || 0) + 1; // Convert from 0-based to 1-based
  }

  getVisiblePages(): number[] {
    const pages: number[] = [];
    const totalPages = this.results.length;

    for (let i = 2; i < totalPages; i++) {
      if (Math.abs(this.page - i) <= 1 && i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    return pages;
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.results.length || page === this.page) {
      return; // Invalid page or same page
    }

    this.page = page;

    this.productService.getAllProductsByCategory({
      categoryId: this.id,
      page: this.page - 1, // Convert to 0-based indexing for API
      size: this.pageSize
    }).subscribe(res => {
      if (res.code === StatusResponse.OK) {
        this.listItems = res.result.content || [];
        this.updatePaginationData(res.result);
      } else {
        this.notification.error('Lỗi', 'Không thể tải sản phẩm');
      }
    }, error => {
      this.notification.error('Lỗi', 'Đã xảy ra lỗi khi tải sản phẩm');
    });
  }

  onPageSizeChange(pageSize: number): void {
    if (pageSize === this.pageSize) return;

    this.pageSize = pageSize;
    this.page = 1; // Reset to first page when changing page size
    this.loadProductsByCategory();
  }
}

