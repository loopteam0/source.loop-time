import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherShowsComponent } from './other-shows.component';

describe('OtherShowsComponent', () => {
  let component: OtherShowsComponent;
  let fixture: ComponentFixture<OtherShowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherShowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
