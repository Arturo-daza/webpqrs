import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PQRSComponent } from './pqrs.component';

describe('PQRSComponent', () => {
  let component: PQRSComponent;
  let fixture: ComponentFixture<PQRSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PQRSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PQRSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
