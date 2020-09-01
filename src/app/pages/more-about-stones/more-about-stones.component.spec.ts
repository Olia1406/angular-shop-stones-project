import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreAboutStonesComponent } from './more-about-stones.component';

describe('MoreAboutStonesComponent', () => {
  let component: MoreAboutStonesComponent;
  let fixture: ComponentFixture<MoreAboutStonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreAboutStonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreAboutStonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
