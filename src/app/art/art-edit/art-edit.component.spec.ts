import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtEditComponent } from './art-edit.component';

describe('ArtEditComponent', () => {
  let component: ArtEditComponent;
  let fixture: ComponentFixture<ArtEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
