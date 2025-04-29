import { Component, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { StatusResponse } from 'src/app/core/const/constant';
import { ProductService } from 'src/app/services/product.service';
import { PromotionService } from 'src/app/services/promotion.service';

@Component({
  selector: 'app-set-promotion',
  templateUrl: './set-promotion.component.html',
  styleUrls: ['./set-promotion.component.scss']
})
export class SetPromotionComponent {
  @Input() data!: any;
  listPromotions: any[] = [];
  promotion: any;
  constructor(private promotionService: PromotionService, private notification: NzNotificationService, private modalRef: NzModalRef, private productService: ProductService) {

  }

  ngOnInit(): void {
    this.promotionService.getAllPromotions().subscribe(res => {
      if (res.code === StatusResponse.OK) {
        if (res.result.content.length > 0) {
          this.listPromotions = res.result.content.map((item: any) => ({
            label: item.name,
            value: item.promotionId
          }))
        }
      }
    })
  }

  onSetPromotion() {
    this.productService.setPromotion(this.data.productId, this.promotion).subscribe(res => {
      if (res.code === StatusResponse.OK) {
        this.notification.success('Thông báo', 'Cập nhật khuyến mãi thành công');
        this.modalRef.close(true);
      }
    })
  }
}
