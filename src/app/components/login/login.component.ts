import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/shared/auth.service";

import { NotificationService } from "../../data-access/rest/notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService) {
    this.authService.logoff();
  }

  ngOnInit(): void {}
  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

}
