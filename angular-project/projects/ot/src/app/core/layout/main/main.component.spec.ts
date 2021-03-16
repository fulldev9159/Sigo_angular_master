import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@coreOT/services/auth.service';
import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent],
      providers: [{ provide: 'environment', useValue: {} }],
    }).compileComponents();
    authService = TestBed.inject(AuthService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login true', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    expect(component.isLoggedIn()).toBe(true);
  });
});
