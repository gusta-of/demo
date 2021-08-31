import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { NotificationService } from './data-access/rest/notification.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'Demo';

  isAuthenticated: boolean;
  user: any;
  @Input() verificaAutenticacao;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    private authService: AuthService,
    private router: Router,
    private observer: BreakpointObserver
  ) {


    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    NotificationService.event('logoff').subscribe(data => {
      this.isAuthenticated = data

      if (!data) {
        this.router.navigate(['login']);
        return
      }

      this.user = JSON.parse(localStorage.getItem('user'));

    });
  }

  ngAfterViewInit() {

    // debugger
    // this.observer
    //   .observe(['(max-width: 800px)'])
    //   .pipe(delay(1))
    //   .subscribe((res) => {
    //     if (res.matches) {
    //       this.sidenav.mode = 'over';
    //       this.sidenav.close();
    //     } else {
    //       this.sidenav.mode = 'side';
    //       this.sidenav.open();
    //     }
    //   });
  }

  logoff() {
    this.authService.logoff();
  }
}
