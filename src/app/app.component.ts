import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showNavbar: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Redirect to login if not logged in
    if (typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') !== 'true') {
      this.router.navigate(['/login']);
    }

    // Listen to route changes to control navbar
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const loggedIn = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true';
        const onLoginPage = this.router.url === '/login';
        this.showNavbar = loggedIn && !onLoginPage;
      });
  }
}
