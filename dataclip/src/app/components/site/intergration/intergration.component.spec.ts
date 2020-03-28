import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntergrationComponent } from './intergration.component';

describe('IntergrationComponent', () => {
  let component: IntergrationComponent;
  let fixture: ComponentFixture<IntergrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntergrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntergrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
