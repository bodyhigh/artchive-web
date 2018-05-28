import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtCollectionComponent } from './art-collection.component';

describe('ArtCollectionComponent', () => {
  let component: ArtCollectionComponent;
  let fixture: ComponentFixture<ArtCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
