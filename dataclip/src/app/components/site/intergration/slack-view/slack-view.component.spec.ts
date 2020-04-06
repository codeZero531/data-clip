import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlackViewComponent } from './slack-view.component';

describe('SlackViewComponent', () => {
  let component: SlackViewComponent;
  let fixture: ComponentFixture<SlackViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlackViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlackViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
