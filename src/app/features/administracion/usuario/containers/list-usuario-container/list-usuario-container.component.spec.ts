import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsuarioContainerComponent } from './list-usuario-container.component';

describe('ListUsuarioContainerComponent', () => {
  let component: ListUsuarioContainerComponent;
  let fixture: ComponentFixture<ListUsuarioContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUsuarioContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUsuarioContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
