import { Component, Input } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { NotificationService } from './data-access/rest/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo';

  isAuthenticated: boolean;
  @Input() verificaAutenticacao;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    NotificationService.event('logoff').subscribe(data => {
      this.isAuthenticated = data

      if (!data) this.router.navigate(['login']);
    });
  }

  logoff() {
    this.authService.logoff();
  }
}
