import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaccionesTablaComponent } from './transacciones-tabla.component';

describe('TransaccionesTablaComponent', () => {
  let component: TransaccionesTablaComponent;
  let fixture: ComponentFixture<TransaccionesTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransaccionesTablaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransaccionesTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
