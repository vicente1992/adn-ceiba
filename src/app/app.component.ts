import { Component } from '@angular/core';
import { MenuItem } from '@core/modelo/menu-item';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    `
  .wrapper-main {
    display: flex;
  flex-direction: column;
  padding: 50px  80px 10px 320px;
  flex-grow: 1;
  overflow: auto;
  min-width: auto;   
}

@media screen and (max-width: 955px) {
     .wrapper-main {
        padding: 50px  50px 10px 100px ;
     } 
   }
  
   @media screen and (max-width: 480px) {
     .wrapper-main {
        padding: 50px  10px 10px 70px ;
     } 
   }
    `
  ]
})
export class AppComponent {
  title = 'Prestamos Ceiba';
  public companies: MenuItem[] = [
    { url: '/customers', name: 'Clientes', icon: 'uil uil-users-alt' },
    { url: '/loans', name: 'Prestamos', icon: 'uil uil-users-alt' },
    { url: '/loans/simulate', name: 'Simular prestamo', icon: 'uil uil-users-alt' },
  ];
}
