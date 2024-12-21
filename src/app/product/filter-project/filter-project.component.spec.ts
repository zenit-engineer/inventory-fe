import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterProjectComponent } from './filter-project.component';

describe('FilterProjectComponent', () => {
  let component: FilterProjectComponent;
  let fixture: ComponentFixture<FilterProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterProjectComponent]
    });
    fixture = TestBed.createComponent(FilterProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
