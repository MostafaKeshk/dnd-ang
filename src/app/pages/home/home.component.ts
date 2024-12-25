import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import { HomeSvgComponent } from './components/home-svg/home-svg.component';
import { AboutSvgComponent } from './components/about-svg/about-svg.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent, HomeSvgComponent, AboutSvgComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) {}
  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
