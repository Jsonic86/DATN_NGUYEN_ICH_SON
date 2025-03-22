import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { TabPanelComponent } from '../tab-panel/tab-panel.component';
import { TabItem } from 'src/app/core/const/interface';



@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss']
})
export class TabGroupComponent implements OnInit, AfterViewInit {
  @Input() activeIndex = 0;
  @Output() activeIndexChange = new EventEmitter<number>();
  @Input() tabPanelList: TabItem[] = [];

  @ViewChild('tabContainer', { read: ViewContainerRef, static: false }) tabContainer!: ViewContainerRef;
  private currentComponent: ComponentRef<any> | null = null;

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    console.log('Tab Panel List:', this.tabPanelList);
    console.log('Active Index:', this.activeIndex);
  }
  ngAfterViewInit() {
    this.loadComponent();
  }
  setActiveIndex(index: number) {
    this.activeIndex = index;
    this.activeIndexChange.emit(index);
    this.loadComponent();
  }

  loadComponent() {
    if (!this.tabContainer) return;

    console.log('Loading component:', this.tabPanelList[this.activeIndex]); // 👈 Kiểm tra component

    this.tabContainer.clear();

    if (this.tabPanelList.length > 0 && this.tabPanelList[this.activeIndex]?.panelBody && this.tabPanelList[this.activeIndex]?.isAdded) {
      const componentFactory = this.resolver.resolveComponentFactory(this.tabPanelList[this.activeIndex].panelBody);
      this.currentComponent = this.tabContainer.createComponent(componentFactory);
    }
  }


  removeTab(index: number) {
    this.tabPanelList = this.tabPanelList.map((item, i) => {
      if (i === index) {
        item.isAdded = false
      }
      return item;
    });
    this.activeIndex = Math.max(0, this.activeIndex - 1);
    this.activeIndexChange.emit(this.activeIndex);
    this.loadComponent();
  }
}
