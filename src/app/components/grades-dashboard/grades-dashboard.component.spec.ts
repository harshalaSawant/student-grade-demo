import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesDashboardComponent } from './grades-dashboard.component';

describe('GradesDashboardComponent', () => {
  let component: GradesDashboardComponent;
  let fixture: ComponentFixture<GradesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradesDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
