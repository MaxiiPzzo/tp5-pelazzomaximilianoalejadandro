import { TestBed } from '@angular/core/testing';

import { TicketsEspectadoresService } from './tickets-espectadores.service';

describe('TicketsEspectadoresService', () => {
  let service: TicketsEspectadoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketsEspectadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
