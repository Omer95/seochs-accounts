import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitEntryComponent } from './debit-entry.component';

describe('DebitEntryComponent', () => {
  let component: DebitEntryComponent;
  let fixture: ComponentFixture<DebitEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebitEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
