import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YapsComponent } from './yaps.component';

describe('YapsComponent', () => {
  let component: YapsComponent;
  let fixture: ComponentFixture<YapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
