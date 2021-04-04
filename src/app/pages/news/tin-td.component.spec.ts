import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinTdComponent } from './tin-td.component';

describe('TinTdComponent', () => {
  let component: TinTdComponent;
  let fixture: ComponentFixture<TinTdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TinTdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TinTdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
