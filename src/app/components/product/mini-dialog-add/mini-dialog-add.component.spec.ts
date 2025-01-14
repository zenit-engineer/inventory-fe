import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniDialogAddComponent } from './mini-dialog-add.component';

describe('MiniDialogAddComponent', () => {
  let component: MiniDialogAddComponent;
  let fixture: ComponentFixture<MiniDialogAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiniDialogAddComponent]
    });
    fixture = TestBed.createComponent(MiniDialogAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
