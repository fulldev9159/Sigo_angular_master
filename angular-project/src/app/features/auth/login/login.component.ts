import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';;
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {

  // declarations
  public formLogin: FormGroup;
  private destroyInstance: Subject<boolean> = new Subject();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authFacade: AuthFacade,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.authFacade.getLogin$()
      .pipe(takeUntil(this.destroyInstance))
      .subscribe(loginAuth => {
        if (loginAuth) {
          switch (true) {
            case loginAuth.token && (loginAuth.usuario_id !== 0):
              this.router.navigate(['/app/ot']);
              break;
            case !(loginAuth.token && (loginAuth.usuario_id !== 0)):
              this.clickMessage();
              break;
          }
        }
      });

    this.initForm();
  }

  ngOnDestroy(): void {
    this.destroyInstance.next(true);
    this.destroyInstance.complete();
  }

  initForm() {
    this.formLogin = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  login(): void {
    this.authFacade.postLogin(this.formLogin.value);;
  }

  clickMessage() {
    this.messageService.add({ severity: 'error', summary: 'Acceso denegado!', detail: 'No tienes acceso a plataforma, ingresa tus credenciales de manera correcta!' });
  }

}
