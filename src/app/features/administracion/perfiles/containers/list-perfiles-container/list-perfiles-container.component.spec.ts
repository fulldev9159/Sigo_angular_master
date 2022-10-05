import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPerfilesContainerComponent } from './list-perfiles-container.component';

describe('ListPerfilesContainerComponent', () => {
  let component: ListPerfilesContainerComponent;
  let fixture: ComponentFixture<ListPerfilesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPerfilesContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPerfilesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
