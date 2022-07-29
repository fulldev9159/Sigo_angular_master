import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { AuthService } from '../../service/auth.service';

import { MainLayoutComponent } from './main-layout.component';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), RouterTestingModule],
      declarations: [MainLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('main layout text doesnt show if isLoggin return false', () => {
    spyOn(authService, 'isLoggin').and.returnValue(of(false));
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')).toBeNull();
  });

  it('main layout text did show if isLoggin return true', () => {
    spyOn(authService, 'isLoggin').and.returnValue(of(true));
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')).toBeDefined();
  });
});
