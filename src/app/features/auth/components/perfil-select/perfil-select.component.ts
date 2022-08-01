import { Component, OnInit } from '@angular/core';
import { PerfilesHttpService } from 'src/app/core/service/perfiles-http.service';

@Component({
  selector: 'zwc-perfil-select',
  templateUrl: './perfil-select.component.html',
  styleUrls: ['./perfil-select.component.scss'],
})
export class PerfilSelectComponent implements OnInit {
  constructor(private perfilesHttpService: PerfilesHttpService) {}

  ngOnInit(): void {
    this.perfilesHttpService.getPerfilesUsuario(2).subscribe();
  }
}
