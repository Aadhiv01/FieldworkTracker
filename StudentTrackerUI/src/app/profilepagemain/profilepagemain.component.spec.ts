import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilepagemainComponent } from './profilepagemain.component';

describe('ProfilepagemainComponent', () => {
  let component: ProfilepagemainComponent;
  let fixture: ComponentFixture<ProfilepagemainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilepagemainComponent]
    });
    fixture = TestBed.createComponent(ProfilepagemainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
