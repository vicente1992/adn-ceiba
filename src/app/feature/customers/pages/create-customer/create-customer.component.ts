import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '@feature/customers/shared/services/customer.service';

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 3;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 20;
@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {
  customerForm: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  isInvalid(nameControl: string) {
    return this.customerForm.controls[nameControl].invalid
      && this.customerForm.controls[nameControl].touched;
  }


  onSubmit() {
    this.customerService.createCustomer(this.customerForm.value).subscribe(() => this.goTocustomer());
  }

  public goTocustomer() {
    this.router.navigate(['/', 'customers']);
  }

  private initForm() {
    this.customerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO), Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)]),
      documentNumber: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])
    });
  }

}
