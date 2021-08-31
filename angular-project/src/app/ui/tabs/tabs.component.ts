import {
  Component,
  OnInit,
  AfterViewInit,
  AfterContentInit,
  OnDestroy,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { TabComponent } from './tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent
  implements OnInit, AfterViewInit, AfterContentInit, OnDestroy
{
  subscription: Subscription = new Subscription();
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  @Output() tabSelected = new EventEmitter<{ index: number; label: string }>();

  activeItem: MenuItem;
  options: MenuItem[] = [];

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  ngAfterContentInit(): void {
    this.tabs.toArray().forEach(tabC => (tabC.active = false));

    this.options = this.tabs.toArray().map(tabC => ({
      label: tabC.label || '',
      icon: tabC.icon || '',
      disabled: tabC.disabled || false,
      command: event => this.selectTab(tabC),
    }));

    this.tabs.toArray().forEach((tabC, index) => {
      this.subscription.add(
        tabC.disabledChanged.subscribe(
          ({ target, disabled }) => (this.options[index].disabled = disabled)
        )
      );
    });

    if (this.options.length > 0) {
      this.selectTab(this.tabs.first);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private selectTab(tab: TabComponent): void {
    this.tabs.toArray().forEach(tabC => (tabC.active = false));
    tab.active = true;
    const index = this.tabs.toArray().findIndex(tabC => tabC.active);
    this.activeItem = this.options[index];
    this.tabSelected.emit({
      index,
      label: tab.label,
    });
  }

  selectFirst(): void {
    if (this.tabs.length > 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectByIndex(index): void {
    if (index < this.tabs.length && index >= 0) {
      this.selectTab(this.tabs.toArray()[index]);
    }
  }
}
