import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoTable } from './empleado-table';

describe('EmpleadoTable', () => {
  let component: EmpleadoTable;
  let fixture: ComponentFixture<EmpleadoTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadoTable],
    }).compileComponents();

    fixture = TestBed.createComponent(EmpleadoTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
