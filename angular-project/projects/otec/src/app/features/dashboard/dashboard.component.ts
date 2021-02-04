import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'otec-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public Menu: string[] = [];
  public nombreUsuario = '';
  public rol = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.Menu =
      this.authService.getItemStorage('modulos') === null
        ? []
        : (this.authService.getItemStorage('modulos') as string).split(',');
    this.nombreUsuario = this.authService.getItemStorage(
      'nombreCompleto'
    ) as string;
    this.rol = this.authService.getItemStorage('rol') as string;
  }

  logout(): void {
    this.authService
      .logOut(
        this.authService.getItemStorage('username') as string,
        this.authService.getItemStorage('otec_token') as string
      )
      .subscribe((x) => {
        console.log('response logout');
        this.authService.deleteItemStorage();
        this.router.navigate(['/login']);
      });
  }
}
