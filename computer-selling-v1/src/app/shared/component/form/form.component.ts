import { AfterViewInit, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TYPE } from 'src/app/core/const/constant';
import { FormItem } from 'src/app/core/const/form.type';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() fieldFormGroup: FormItem[] = [];
  @Input() item: any;
  myForm!: FormGroup;
  TYPE = TYPE;
  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({});

  }
  ngOnInit(): void {
    this.initForm();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['item']?.currentValue !== changes['item']?.previousValue) {
      console.log(this.item);
      this.initForm(this.item);
    }
  }

  private initForm(item: any = {}): void {
    const controls: { [key: string]: FormControl } = {};

    this.fieldFormGroup.forEach(field => {
      controls[field.fieldName] = this.fb.control(
        { value: item[field.fieldName] || '', disabled: field.disabled },
        field.required ? [Validators.required] : []
      );
    });

    this.myForm = this.fb.group(controls);
  }


  getErrorMessage(fieldName: string): string | null {
    const control = this.myForm.get(fieldName);
    if (!control || !control.errors) return null;

    if (control.hasError('required')) return 'Trường này là bắt buộc!';
    if (control.hasError('email')) return 'Email không hợp lệ!';
    if (control.hasError('minlength')) return `Nhập ít nhất ${control.getError('minlength').requiredLength} ký tự!`;
    if (control.hasError('maxlength')) return `Không nhập quá ${control.getError('maxlength').requiredLength} ký tự!`;

    return null;
  }
}
