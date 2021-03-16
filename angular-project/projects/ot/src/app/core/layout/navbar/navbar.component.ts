import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '@coreOT/services/auth.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'ot-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit {
  // public Menu: string[] = [];
  public nombreUsuario = '';
  public rol = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // this.Menu =
    //   this.authService.getItemStorage('modulos') === null
    //     ? []
    //     : (this.authService.getItemStorage('modulos') as string).split(',');

    this.nombreUsuario = this.authService.getItemStorage(
      'nombreCompleto'
    ) as string;

    this.rol = this.authService.getItemStorage('rol') as string;

    ($('.dropdown') as any).dropdown();
  }

  showOnlyForRol(rol: string): boolean {
    return rol === this.rol ? true : false;
  }

  navegateTo(ruta: string): void {
    this.router.navigate([ruta]);
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
