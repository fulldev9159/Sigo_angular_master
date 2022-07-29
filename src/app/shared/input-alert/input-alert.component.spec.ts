import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { InputAlertComponent } from './input-alert.component';

describe('InputAlertComponent', () => {
  let fixtureValRequiredComponent: ComponentFixture<ValidatorRequiredComponent>;
  let ComponentValidatorRequiered: ValidatorRequiredComponent;

  let fixtureValNotSupComponent: ComponentFixture<ValidatorNotSupportedComponent>;
  let ComponentValNotSup: ValidatorNotSupportedComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        InputAlertComponent,
        ValidatorRequiredComponent,
        ValidatorNotSupportedComponent,
      ],
    }).compileComponents();

    fixtureValRequiredComponent = TestBed.createComponent(
      ValidatorRequiredComponent
    );
    ComponentValidatorRequiered = fixtureValRequiredComponent.componentInstance;
    fixtureValRequiredComponent.detectChanges();

    fixtureValNotSupComponent = TestBed.createComponent(
      ValidatorNotSupportedComponent
    );
    ComponentValNotSup = fixtureValNotSupComponent.componentInstance;
    fixtureValNotSupComponent.detectChanges();
  });

  it('should  display small element whith test "Error sin mensaje definido" if control no have message defined', () => {
    ComponentValNotSup.formLogin.get('username').markAllAsTouched();
    fixtureValNotSupComponent.detectChanges();
    const compiled = fixtureValNotSupComponent.nativeElement as HTMLElement;
    expect(compiled.querySelector('small')).not.toBeNull();
    expect(compiled.querySelector('small')?.textContent).toContain(
      'Error sin mensaje definido'
    );
  });

  it('should doesnt display small element if control is doesnt touched or dirty', () => {
    const compiled = fixtureValRequiredComponent.nativeElement as HTMLElement;
    expect(compiled.querySelector('small')).toBeNull();
  });

  it('should doesnt display small if control validar requiered have data and is valid', () => {
    ComponentValidatorRequiered.formLogin.get('username').setValue('asdas');
    fixtureValRequiredComponent.detectChanges();
    const compiled = fixtureValRequiredComponent.nativeElement as HTMLElement;
    expect(compiled.querySelector('small')).toBeNull();
  });

  it('should display small element with text "Este campo es requerido" for control - validators required - because username is empty and touched or dirty', () => {
    ComponentValidatorRequiered.formLogin.get('username').markAllAsTouched();
    fixtureValRequiredComponent.detectChanges();
    const compiled = fixtureValRequiredComponent.nativeElement as HTMLElement;
    expect(compiled.querySelector('small')).not.toBeNull();
    expect(compiled.querySelector('small')?.textContent).toContain(
      'Este campo es requerido'
    );
  });

  it('should display small element with text "El texto debe tener un tamaño mínimo de 5 caracteres" for control - validators min lenght - because username is less than 5 characters and touched or dirty', () => {
    ComponentValidatorRequiered.formLogin.get('username').setValue('asda');
    ComponentValidatorRequiered.formLogin.get('username').markAllAsTouched();
    fixtureValRequiredComponent.detectChanges();
    const compiled = fixtureValRequiredComponent.nativeElement as HTMLElement;
    expect(compiled.querySelector('small')).not.toBeNull();
    expect(compiled.querySelector('small')?.textContent).toContain(
      'El texto debe tener un tamaño mínimo de 5 caracteres'
    );
  });

  @Component({
    selector: `zwc-host-component`,
    template: `<zwc-input-alert
      [control]="formLoginControls.username"
    ></zwc-input-alert>`,
  })
  class ValidatorRequiredComponent {
    formLoginControls = {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    };
    formLogin: FormGroup = new FormGroup(this.formLoginControls);
  }

  @Component({
    selector: `zwc-host-component2`,
    template: `<zwc-input-alert
      [control]="formLoginControls.username"
    ></zwc-input-alert>`,
  })
  class ValidatorNotSupportedComponent {
    formLoginControls = {
      username: new FormControl('', [this.TestValidatorNotSupported]),
    };
    formLogin: FormGroup = new FormGroup(this.formLoginControls);

    TestValidatorNotSupported(): any {
      return { valNotsupp: true };
    }
  }
});
