import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeOwnerFormComponent } from './change-owner-form.component';

describe('ChangeOwnerFormComponent', () => {
  let component: ChangeOwnerFormComponent;
  let fixture: ComponentFixture<ChangeOwnerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeOwnerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeOwnerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
