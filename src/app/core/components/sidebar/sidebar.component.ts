import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '@core/modelo/menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  public items: Menu[] = [
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

  constructor(
    private router: Router
  ) {

  }

  logout(): void {
    this.router.navigate(['/', 'auth', 'login']);
    localStorage.clear();
  }

}
