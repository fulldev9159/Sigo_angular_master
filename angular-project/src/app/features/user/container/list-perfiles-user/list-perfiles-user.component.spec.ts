import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPerfilesUserComponent } from './list-perfiles-user.component';

describe('ListPerfilesUser.Component', () => {
  let component: ListPerfilesUserComponent;
  let fixture: ComponentFixture<ListPerfilesUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListPerfilesUserComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPerfilesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
