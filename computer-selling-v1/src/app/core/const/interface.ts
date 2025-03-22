import { Type } from "@angular/core";

export interface TabItem {
    title: string;
    panelBody: Type<any>;
    isAdded?: boolean;
}