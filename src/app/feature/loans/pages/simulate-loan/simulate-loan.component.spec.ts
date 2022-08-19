import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { LoanInformationComponent } from '@feature/loans/components/loan-information/loan-information.component';
import { LoanService } from '@feature/loans/shared/services/loan.service';

import { SimulateLoanComponent } from './simulate-loan.component';

describe('SimulateLoanComponent', () => {
  let component: SimulateLoanComponent;
  let fixture: ComponentFixture<SimulateLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimulateLoanComponent, LoanInformationComponent],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [LoanService, HttpService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulateLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('I should create a simulate loan', () => {

    expect(component.simulateForm.valid).toBeFalsy();
    component.simulateForm.controls.amount.setValue(100000);
    component.simulateForm.controls.interests.setValue(10);
    component.simulateForm.controls.quotaNumber.setValue(10);
    component.simulateForm.controls.startDate.setValue('2022-08-02');
    expect(component.simulateForm.valid).toBeTruthy();
    component.onSubmit();

  });
});
