import { AfterViewInit, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
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
  @Input() selectOptions: { [key: string]: any[] } = {};
  myForm!: FormGroup;
  fileList: NzUploadFile[] = [];
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
      this.fileList = [{
        uid: '-1',
        name: this.item.imageUrl,
        status: 'done',
        url: `${(this.item?.imageUrl?.includes('https://hoanghapccdn.com') ? '' : 'http://localhost:8080/identity/api/images/')}${this.item.imageUrl}`  // URL của hình ảnh mà bạn muốn preview
      }]
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




  beforeUpload = (file: NzUploadFile): boolean => {
    const reader = new FileReader();
    reader.readAsDataURL(file as any);
    reader.onload = () => {
      file.thumbUrl = reader.result as string;
      this.fileList = [file]; // Chỉ giữ 1 file duy nhất
    };
    console.log(file);
    return false; // Ngăn upload tự động
  };

}
