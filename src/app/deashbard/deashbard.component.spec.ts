import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeashbardComponent } from './deashbard.component';

describe('DeashbardComponent', () => {
  let component: DeashbardComponent;
  let fixture: ComponentFixture<DeashbardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeashbardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeashbardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
