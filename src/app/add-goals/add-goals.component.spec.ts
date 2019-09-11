import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGoalsComponent } from './add-goals.component';

describe('AddGoalsComponent', () => {
  let component: AddGoalsComponent;
  let fixture: ComponentFixture<AddGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
