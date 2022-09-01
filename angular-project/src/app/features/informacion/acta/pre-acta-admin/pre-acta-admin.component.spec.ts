import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreActaAdminComponent } from './pre-acta-admin.component';

describe('PreActaAdminComponent', () => {
  let component: PreActaAdminComponent;
  let fixture: ComponentFixture<PreActaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreActaAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreActaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
