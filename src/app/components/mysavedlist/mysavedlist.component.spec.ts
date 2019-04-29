import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MysavedlistComponent } from './mysavedlist.component';

describe('MysavedlistComponent', () => {
  let component: MysavedlistComponent;
  let fixture: ComponentFixture<MysavedlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MysavedlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MysavedlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
