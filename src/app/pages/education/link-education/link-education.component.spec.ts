import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkEducationComponent } from './link-education.component';

describe('LinkEducationComponent', () => {
  let component: LinkEducationComponent;
  let fixture: ComponentFixture<LinkEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkEducationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
