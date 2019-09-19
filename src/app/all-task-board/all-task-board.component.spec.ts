import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTaskBoardComponent } from './all-task-board.component';

describe('AllTaskBoardComponent', () => {
  let component: AllTaskBoardComponent;
  let fixture: ComponentFixture<AllTaskBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTaskBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTaskBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
