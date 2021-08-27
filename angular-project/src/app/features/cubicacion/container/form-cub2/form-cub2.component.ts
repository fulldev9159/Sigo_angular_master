import { Component, OnInit, OnDestroy } from '@angular/core';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { GeneralFormService } from '../../service/general-form.service';

@Component({
  selector: 'app-form-cub2',
  templateUrl: './form-cub2.component.html',
  styleUrls: ['./form-cub2.component.scss'],
})
export class FormCub2Component implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  contractType$ = new BehaviorSubject<string>('MOVIL');

  constructor(
    private cubageFacade: CubicacionFacade,
    private router: Router,
    private route: ActivatedRoute,
    private generalFormService: GeneralFormService
  ) {}

  ngOnInit(): void {
    this.cubageFacade.resetData();

    this.subscription.add(
      this.generalFormService.valueChanges.subscribe(item =>
        console.log('form general changes', item)
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goBack(): void {
    this.cubageFacade.resetData();
    this.router.navigate(['app/cubicacion/list-cub']);
  }
}
