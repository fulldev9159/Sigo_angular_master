import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MusicEffects } from './features/test/test.effects';
import * as formMusicReduce from './features/test/test.reducer';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([MusicEffects]),
    StoreModule.forFeature(formMusicReduce.musicFeatureKey, formMusicReduce.reducerMusic)
  ]
})
export class StoreAllModule { }
