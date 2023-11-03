import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesComponentComponent } from './courses.component';

describe('CoursesComponentComponent', () => {
  let component: CoursesComponentComponent;
  let fixture: ComponentFixture<CoursesComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesComponentComponent]
    });
    fixture = TestBed.createComponent(CoursesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
