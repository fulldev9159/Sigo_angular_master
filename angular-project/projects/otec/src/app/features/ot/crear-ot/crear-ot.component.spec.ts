import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CubicacionService } from '../../../core/services/cubicacion.service';
import { CrearOtComponent } from './crear-ot.component';

describe('CrearOtComponent', () => {
  let component: CrearOtComponent;
  let fixture: ComponentFixture<CrearOtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CrearOtComponent],
      providers: [{ provide: 'environment', useValue: {} }, CubicacionService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearOtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set item step', () => {
    const items = [
      {
        label: 'Cubicacion',
        routerLink: 'cubicacion-proyecto',
      },
      {
        label: 'Plan de proyecto',
        routerLink: 'proyecto',
      },
      {
        label: 'Pep2',
        routerLink: 'pep2',
      },
      {
        label: 'Organigrama',
        routerLink: 'organigrama',
      },
      {
        label: 'Confirmación',
        routerLink: 'confirmacion',
      },
    ];
    component.ngOnInit();
    expect(component.items).toEqual(items);
  });
});
