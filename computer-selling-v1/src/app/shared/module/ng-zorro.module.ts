import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(
  (key) => antDesignIcons[key]
);

@NgModule({
  imports: [NzIconModule.forChild(icons)],
  exports: [
    NzIconModule,
    NzDropDownModule,
    NzSelectModule,
    NzFormModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzCheckboxModule,
    NzRadioModule,
    NzTabsModule,
    NzCarouselModule,
    NzRateModule,
    NzAvatarModule,
    NzModalModule,
    NzPaginationModule,
    NzPopoverModule,
    NzTimelineModule,
    NzStepsModule,
    NzSwitchModule,
    NzImageModule,
    NzToolTipModule,
    NzLayoutModule,
    NzButtonModule,
    NzPageHeaderModule,
    NzCardModule,
    NzTypographyModule,
    NzTagModule,
    NzSpaceModule,
    NzInputModule,
    NzListModule,
    DragDropModule,
    NzSpinModule,
    NzTableModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons },
  ],
})
export class NgZorroModule { }
