import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { AuthService } from '../../../pages/auth/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, ButtonComponent, RouterLink, CommonModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  constructor(private router: Router, public authService: AuthService) {}

  handleLogin() {
    this.router.navigate(['/auth/login']);
  }

  handleLogout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
