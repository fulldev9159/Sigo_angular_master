import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
// import * as $ from 'jquery';

declare var $: any;
@Component({
  selector: 'otec-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  // encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit {
  public Menu: string[] = [];
  public nombreUsuario: string = '';
  public rol: string = '';

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

    (<any>$('.dropdown')).dropdown({
      // you can use any ui transition
      // transition: 'drop',
    });
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

  showGestor(rol: string): boolean {
    return rol === this.rol ? true : false;
  }

  navegate() {
    this.router.navigate(['dashboard/cubicacion/crear-cubicacion']);
  }
}
