import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherMoviesComponent } from './other-movies.component';

describe('OtherMoviesComponent', () => {
  let component: OtherMoviesComponent;
  let fixture: ComponentFixture<OtherMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherMoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
