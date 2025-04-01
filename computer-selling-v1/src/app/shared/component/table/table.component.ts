import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Column } from 'src/app/core/const/column.type';
import { TYPE } from 'src/app/core/const/constant';
import { SettingValue } from 'src/app/core/const/settingValue.type';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() data: any;
  @Input() settingValue?: SettingValue;
  @Input() columns: Column[] = [];
  @Input() scrollY?: string;
  @Input() scrollX?: string;
  @Input() pageSize: number = 10;
  @Input() page: number = 0;
  @Input() totalElements: number = 10;
  @Input() loading: boolean = false;
  @Output() onAction = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  TYPE = TYPE;
  constructor() { }
  actionClick(actionName: string, data: any) {
    this.onAction.emit({ actionName, data });
  }
  onPageChange(page: number) {
    this.pageChange.emit(page);
  }
  onPageSizeChange(pageSize: number) {
    this.pageSizeChange.emit(pageSize);
  }
}
