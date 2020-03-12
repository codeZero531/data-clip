import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LOGINComponent } from './login.component';

describe('LOGINComponent', () => {
  let component: LOGINComponent;
  let fixture: ComponentFixture<LOGINComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LOGINComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LOGINComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
