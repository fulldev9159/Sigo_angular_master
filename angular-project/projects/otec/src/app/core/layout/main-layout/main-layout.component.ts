import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'otec-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent implements OnInit {
  isLogin: boolean;

  constructor(private authServices: AuthService) {
    this.isLogin = false;
  }

  ngOnInit(): void {
    this.isLogin = this.authServices.isLoggedIn();
  }
}
