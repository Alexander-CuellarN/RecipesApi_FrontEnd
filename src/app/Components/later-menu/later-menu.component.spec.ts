import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaterMenuComponent } from './later-menu.component';

describe('LaterMenuComponent', () => {
  let component: LaterMenuComponent;
  let fixture: ComponentFixture<LaterMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LaterMenuComponent]
    });
    fixture = TestBed.createComponent(LaterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
