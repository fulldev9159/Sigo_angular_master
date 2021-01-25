import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'otec-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  ngOnInit(): void {}

  logout(): void {
    this.authService.deleteToken();
    this.router.navigate(['/login']);
  }
}
