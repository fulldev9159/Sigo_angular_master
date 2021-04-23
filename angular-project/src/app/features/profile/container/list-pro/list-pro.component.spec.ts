import { ComponentFixture, TestBed } from '@angular/core/testing';
import { routes } from '../../profile-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ListProComponent } from './list-pro.component';

describe('ProfileListProContainer', () => {
  let component: ListProComponent;
  let fixture: ComponentFixture<ListProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListProComponent],
      imports: [RouterTestingModule.withRoutes(routes)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
