import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotEntryComponent } from './plot-entry.component';

describe('PlotEntryComponent', () => {
  let component: PlotEntryComponent;
  let fixture: ComponentFixture<PlotEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlotEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
