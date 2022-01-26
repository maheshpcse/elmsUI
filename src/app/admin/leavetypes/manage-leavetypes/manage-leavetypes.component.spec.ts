import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLeavetypesComponent } from './manage-leavetypes.component';

describe('ManageLeavetypesComponent', () => {
  let component: ManageLeavetypesComponent;
  let fixture: ComponentFixture<ManageLeavetypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageLeavetypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageLeavetypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
