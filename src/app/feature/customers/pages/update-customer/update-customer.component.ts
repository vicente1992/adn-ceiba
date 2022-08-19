import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '@feature/customers/shared/services/customer.service';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.scss']
})
export class UpdateCustomerComponent implements OnInit {
  customerForm: FormGroup = new FormGroup({});
  id: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      documentNumber: new FormControl(null, [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required])
    });

    this.activatedRoute.params.subscribe(({ id }) => this.id = id);
    if (this.id) {
      this.getCustomer(this.id);
    }
  }

  isInvalid(nameControl: string) {
    return this.customerForm.controls[nameControl].invalid
      && this.customerForm.controls[nameControl].touched;
  }

  onSubmit() {
    this.customerService.updateCustomer(this.id, this.customerForm.value).subscribe(() => this.goTocustomer());

  }

  public goTocustomer() {
    this.router.navigate(['/', 'customers']);
  }


  getCustomer(id: number) {
    this.customerService.getCustomer(id).subscribe((customer) => this.customerForm.patchValue(customer));
  }

}
