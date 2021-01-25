import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'otec-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public Menu:string[]=[]
  public nombre_usuario:string=''
  public rol:string=''

  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  ngOnInit(): void {
    console.log(this.authService.getRol())
    this.Menu=this.authService.getMenu(this.authService.getRol())
    this.nombre_usuario=this.authService.getNombre();
    this.rol=this.authService.getRol()
  }

  logout(): void {
    this.authService.deleteToken();
    this.router.navigate(['/login']);
  }
}
