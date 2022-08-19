import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
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
export class HomeComponent {


}
