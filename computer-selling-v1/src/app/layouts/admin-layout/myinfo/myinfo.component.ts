import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-myinfo',
  templateUrl: './myinfo.component.html',
  styleUrls: ['./myinfo.component.scss']
})
export class MyinfoComponent implements OnInit {
  infor!: any;
  keys: any = {
    firstName: "First Name",
    lastName: "Last Name",
    dob: "Date of birth"
  };
  keysEmployee: any = {
    email: "Email",
    phoneNumber: "Phone Number",
  };
  keysName: any;
  keysNameEmployee: any;
  constructor(private userService: UserService) {
    this.keysName = Object.keys(this.keys);
    this.keysNameEmployee = Object.keys(this.keysEmployee);
  }
  ngOnInit(): void {
    this.getInfor();
  }
  getInfor() {
    this.userService.getInfo().subscribe((res: any) => {
      this.infor = res?.result;

    })
  }
}
