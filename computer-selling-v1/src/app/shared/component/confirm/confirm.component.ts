import { Component, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {
  @Input() action?: string;
  constructor(private modalRef: NzModalRef) {

  }
  onCancel() {
    this.modalRef.close();
  }
  onConfirm() {
    this.modalRef.close(true);
  }
}
