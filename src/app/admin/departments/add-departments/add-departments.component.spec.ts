import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepartmentsComponent } from './add-departments.component';

describe('AddDepartmentsComponent', () => {
  let component: AddDepartmentsComponent;
  let fixture: ComponentFixture<AddDepartmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDepartmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
