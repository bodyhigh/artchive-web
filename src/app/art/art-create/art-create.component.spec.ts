import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtCreateComponent } from './art-create.component';

describe('ArtCreateComponent', () => {
  let component: ArtCreateComponent;
  let fixture: ComponentFixture<ArtCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
