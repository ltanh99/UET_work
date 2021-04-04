import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsSaveComponent } from './news-save.component';

describe('NewsSaveComponent', () => {
  let component: NewsSaveComponent;
  let fixture: ComponentFixture<NewsSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
