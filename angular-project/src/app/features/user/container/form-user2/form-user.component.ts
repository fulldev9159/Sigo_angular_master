import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UserFacade } from '@storeOT/features/user/user.facade';

@Component({
  selector: 'app-form-user2',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormUser2Component implements OnInit, OnDestroy {
  constructor(private userFacade: UserFacade, private router: Router) {}
  ngOnInit(): void {}
  ngOnDestroy(): void {}

  goBack(): void {
    this.userFacade.resetData();
    this.router.navigate(['/app/user/list-user']);
  }
}
