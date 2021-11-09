import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeAdmincontratoComponent } from './informe-admincontrato.component';

describe('InformeAdmincontratoComponent', () => {
  let component: InformeAdmincontratoComponent;
  let fixture: ComponentFixture<InformeAdmincontratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeAdmincontratoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeAdmincontratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
