import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { StatusResponse } from 'src/app/core/const/constant';
import { CartItem } from 'src/app/core/interface/cart-item.interface';
import { getCookie } from 'src/app/core/utils';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-product-by-cartegory',
  templateUrl: './list-product-by-cartegory.component.html',
  styleUrls: ['./list-product-by-cartegory.component.scss']
})
export class ListProductByCartegoryComponent implements OnInit {
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
    private router: Router,
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.loadProductsByCategory();

    // Lắng nghe sự kiện thay đổi route
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadProductsByCategory();
      }
    });
  }

  private loadProductsByCategory(): void {
    const urlSegments = window.location.href.split('/');
    this.id = +urlSegments[urlSegments.length - 1];
    if (this.id) {

      this.productService.getAllProductsByCategory({ categoryId: this.id, size: 9 }).subscribe(res => {
        if (res.code === StatusResponse.OK) {
          if (res.result.content.length > 0) {
            this.listItems = res.result.content;
            for (let i = 0; i < res.result?.totalPages; i++) {
              this.results.push(i + 1);
            }
            this.page = res.result?.number + 1;
            this.totalElements = res.result?.totalElements;
            this.pageSize = res.result?.size;
            this.loading = false;
          }
        }
      });
    }
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
  onPageChange(page: number) {
    this.results = [];
    this.page = page - 1;
    this.productService.getAllProductsByCategory({ categoryId: this.id, page: this.page, size: 9 }).subscribe(res => {
      if (res.code === StatusResponse.OK) {
        if (res.result.content.length > 0) {
          this.listItems = res.result.content;
          for (let i = 0; i < res.result?.totalPages; i++) {
            this.results.push(i + 1);
          }
          this.page = res.result?.number + 1;
          this.totalElements = res.result?.totalElements;
          this.pageSize = res.result?.size;
          this.loading = false;
        }
      }
    });
  }
  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.page = 0;
    this.productService.getAllProductsByCategory({ categoryId: this.id, size: 9 }).subscribe(res => {
      if (res.code === StatusResponse.OK) {
        if (res.result.content.length > 0) {
          this.listItems = res.result.content;
          for (let i = 0; i < res.result?.totalPages; i++) {
            this.results.push(i + 1);
          }
          this.page = res.result?.number + 1;
          this.totalElements = res.result?.totalElements;
          this.pageSize = res.result?.size;
          this.loading = false;
        }
      }
    });
  }
}

