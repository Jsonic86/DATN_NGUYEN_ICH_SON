import { NzSelectOptionInterface } from "ng-zorro-antd/select";

export class FormItem {
    id: number;
    type: string;
    fieldName: string;
    label: string;
    placeholder?: string;
    toolTip?: string;
    disabled: boolean;
    required?: boolean;
    span: number;
    listOfOptions?: NzSelectOptionInterface[];
    constructor(init?: Partial<FormItem>) {
        this.id = init?.id ?? 0;
        this.type = init?.type ?? 'text';
        this.fieldName = init?.fieldName ?? '';
        this.label = init?.label ?? '';
        this.placeholder = init?.placeholder ?? '';
        this.toolTip = init?.toolTip ?? '';
        this.disabled = init?.disabled ?? false;
        this.required = init?.required ?? false;
        this.span = init?.span ?? 24;
        this.listOfOptions = this.listOfOptions = init?.listOfOptions ?? [];
    }
}
