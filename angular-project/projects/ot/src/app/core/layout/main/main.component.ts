import { Component, OnInit } from '@angular/core';
import { AuthService } from '@coreOT/services/auth.service';
@Component({
  selector: 'ot-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
