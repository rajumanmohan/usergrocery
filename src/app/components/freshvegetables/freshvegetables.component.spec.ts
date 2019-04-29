import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreshvegetablesComponent } from './freshvegetables.component';

describe('FreshvegetablesComponent', () => {
  let component: FreshvegetablesComponent;
  let fixture: ComponentFixture<FreshvegetablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreshvegetablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreshvegetablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
