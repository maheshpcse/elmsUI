import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavetypesViewComponent } from './leavetypes-view.component';

describe('LeavetypesViewComponent', () => {
  let component: LeavetypesViewComponent;
  let fixture: ComponentFixture<LeavetypesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeavetypesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavetypesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
