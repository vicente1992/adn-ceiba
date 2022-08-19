/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Menu } from '@core/modelo/menu';

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  const items: Menu[] = [
    {
      path: ['/', 'customers'],
      name: 'Clientes',
      icon: 'uil uil-users-alt',
      id: 'linkCustomer',
    },
    {
      path: ['/', 'loans'],
      name: 'Prestamos',
      icon: 'uil uil-money-bill',
      id: 'linkLoan',
    },
    {
      path: ['/', 'loans', 'simulate'],
      name: 'Simular prestamo',
      icon: 'uil uil-money-withdrawal',
      id: 'linkSimulate',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.items).toEqual(items);
  });

  it('Navigate to /loans login.', inject([Router], (mockRouter: Router) => {
    const store = {};
    const spy = spyOn(mockRouter, 'navigate').and.stub();
    component.logout();
    expect(spy.calls.first().args[0]).toEqual(['/', 'auth', 'login']);
    spyOn(window.localStorage, 'clear').and.callFake(() => (store));

  }));
});
