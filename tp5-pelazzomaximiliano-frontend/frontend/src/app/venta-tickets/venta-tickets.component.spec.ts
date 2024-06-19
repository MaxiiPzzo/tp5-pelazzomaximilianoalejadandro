import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaTicketsComponent } from './venta-tickets.component';

describe('VentaTicketsComponent', () => {
  let component: VentaTicketsComponent;
  let fixture: ComponentFixture<VentaTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentaTicketsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentaTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
