import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeavetypesComponent } from './add-leavetypes.component';

describe('AddLeavetypesComponent', () => {
  let component: AddLeavetypesComponent;
  let fixture: ComponentFixture<AddLeavetypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLeavetypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLeavetypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
