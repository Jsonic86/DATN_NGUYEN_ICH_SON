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
  @Output() onAction = new EventEmitter<any>();
  TYPE = TYPE;
  constructor() { }
  actionClick(actionName: string, data: any) {
    this.onAction.emit({ actionName, data });
  }
}
