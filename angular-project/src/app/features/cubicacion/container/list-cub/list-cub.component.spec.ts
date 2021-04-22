import { ComponentFixture, TestBed } from '@angular/core/testing';
import { routes } from '../../cubicacion-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ListCubComponent } from './list-cub.component';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';

describe('ListCubComponent', () => {
  let component: ListCubComponent;
  let fixture: ComponentFixture<ListCubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListCubComponent],
      imports: [
        RouterTestingModule.withRoutes(routes),
        BrowserAnimationsModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
