import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilecompleteComponent } from './profilecomplete.component';

describe('ProfilecompleteComponent', () => {
  let component: ProfilecompleteComponent;
  let fixture: ComponentFixture<ProfilecompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilecompleteComponent]
    });
    fixture = TestBed.createComponent(ProfilecompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
