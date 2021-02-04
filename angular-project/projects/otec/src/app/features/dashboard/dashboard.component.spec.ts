import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import * as LoginModel from '../../features/login/login.model';
import { DashboardComponent } from './dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../core/services/auth.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DashboardComponent],
      providers: [{ provide: 'environment', useValue: {} }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should logout an redirect to login after press button cerrar sesion', async (done) => {
    const mockLogoutService: LoginModel.LogoutResponse = {
      user: 'jcastill',
      token: '01EXM8Q1RSB1WGW1WBQ07WB6YA',
      createdat: '',
      modifiedat: '',
    };
    fixture.detectChanges();
    spyOn(authService, 'logOut').and.returnValue(of(mockLogoutService));
    const buttonElement = fixture.debugElement.query(By.css('#logout-button'));
    buttonElement.triggerEventHandler('click', null);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      router = TestBed.inject(Router);
      spyOn(router, 'navigate');
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
      done();
    });
  });
});
