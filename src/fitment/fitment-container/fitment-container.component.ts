import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FitmentState } from '../store';
import {
  LoadYears,
  LoadMakes,
  LoadModels,
  LoadTrims
} from '../store/actions/vehicle.action';
@Component({
  selector: 'app-fitment-container',
  templateUrl: './fitment-container.component.html',
  styleUrls: ['./fitment-container.component.scss']
})
export class FitmentContainerComponent implements OnInit {
  fitment$: Observable<FitmentState>;
  years$: string[];
  makes$: string[];
  models$: string[];
  trims$: string[];
  selectedYear: string;
  selectedMake: string;
  selectedModel: string;
  selectedTrim: string;
  @Input() name: string;
  // import the store into the constructor
  constructor(private store: Store<FitmentState>) {}

  currentTab = 0;

  ngOnInit() {}

  log(val: any) {
    console.log(val);
  }

  onSelectedMake(e) {
    console.log('On Change Make');
    if (e) {
      console.log(`Make : ${e}`);
      const action = new LoadModels({ make: e });
      this.store.dispatch(action);

      this.selectedMake = e;
    }
    this.models$ = [];
    this.trims$ = [];
    this.currentTab += 1;
  }

  onSelectedModel(e) {
    console.log('On Change Model');
    if (e) {
      console.log(`Model : ${e}`);
      const action = new LoadTrims({ model: e });
      this.store.dispatch(action);

      this.selectedModel = e;
    }
    this.trims$ = [];
    this.currentTab += 1;
  }

  onSelectedTrim(e) {
    console.log('On Change Trim');
    if (e) {
      console.log(`Trim : ${e}`);

      this.selectedTrim = e;
    }
  }

  onSelectedYear(e) {
    console.log('On Change Year');
    if (e) {
      console.log(`Year : ${e}`);
      const action = new LoadMakes({ year: e });
      this.store.dispatch(action);

      this.selectedYear = e;
    }
    this.makes$ = [];
    this.models$ = [];
    this.trims$ = [];
    this.currentTab += 1;
  }

  getYears() {
    console.log('getYears');
this.refreshData()
    const action = new LoadYears();
    // dispatch an action to get array of years
    this.store.dispatch(action);
    this.makes$ = [];
    this.models$ = [];
    this.trims$ = [];

    this.store
      .select(state => state)
      .subscribe(data => {
        this.years$ = data.vehicle.years;
        this.makes$ = data.vehicle.makes;
        this.models$ = data.vehicle.models;
        this.trims$ = data.vehicle.trims;
      });
  }
  refreshData(){
    this.years$ = [];
    this.makes$ = [];
    this.models$ = [];
    this.trims$ = [];
    this.selectedYear = "";
    this.selectedMake = "";
    this.selectedModel = "";
    this.selectedTrim = "";
    this.currentTab = 0;

  }
}
