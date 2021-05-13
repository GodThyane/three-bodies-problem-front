import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeBodyComponent } from './three-body.component';

describe('ThreeBodyComponent', () => {
  let component: ThreeBodyComponent;
  let fixture: ComponentFixture<ThreeBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
