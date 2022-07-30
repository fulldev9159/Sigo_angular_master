import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'zwc-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  isLoggin: boolean;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggin = this.authService.isLoggin();
  }
}
