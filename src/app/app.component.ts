import {ChangeDetectorRef, Component, EventEmitter, Output} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {MediaMatcher} from '@angular/cdk/layout';
import {User} from './_models';
import {AuthenticationService} from './_services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'untitled1';
  currentUser: User;
  mobileQuery: MediaQueryList;
  nav = [
    {
      title: 'Home',
      path: '/home'
    },
    {
      title: 'My Account',
      path: '/auth'
    }
  ];
  private mobileQueryListener: () => void;
  @Output() toggleSideNav = new EventEmitter();

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router,
              private authenticationService: AuthenticationService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  toggleMobileNav(nav: MatSidenav) {
    if (this.mobileQuery.matches) {
      nav.toggle();
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
