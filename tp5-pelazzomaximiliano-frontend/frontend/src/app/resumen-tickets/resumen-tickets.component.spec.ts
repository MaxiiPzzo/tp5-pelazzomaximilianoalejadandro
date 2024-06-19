import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenTicketsComponent } from './resumen-tickets.component';

describe('ResumenTicketsComponent', () => {
  let component: ResumenTicketsComponent;
  let fixture: ComponentFixture<ResumenTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenTicketsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumenTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
