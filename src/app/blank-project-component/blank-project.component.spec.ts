import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankProjectComponent } from './blank-project.component';

describe('BlankProjectComponent', () => {
  let component: BlankProjectComponent;
  let fixture: ComponentFixture<BlankProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlankProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlankProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
