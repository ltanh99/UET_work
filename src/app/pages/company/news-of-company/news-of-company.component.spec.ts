import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsOfCompanyComponent } from './news-of-company.component';

describe('NewsOfCompanyComponent', () => {
  let component: NewsOfCompanyComponent;
  let fixture: ComponentFixture<NewsOfCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsOfCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsOfCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
