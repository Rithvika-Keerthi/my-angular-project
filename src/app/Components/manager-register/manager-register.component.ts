import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthserviceService } from '../../Services/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-register',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './manager-register.component.html',
  styleUrl: './manager-register.component.css'
})
export class ManagerRegisterComponent {
  registerForm!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router,private authS: AuthserviceService) {

 
 this.registerForm = this.fb.group({
   name: ['', Validators.required],
   contactNumber: ['', Validators.required],
   email: ['', [Validators.required, Validators.email]],
   password: ['', Validators.required],
   role:['', Validators.required]
   });
   
  }
 

onSubmit(): void {
  if (this.registerForm.valid) {
    const user = {
      name: this.registerForm.get('name')?.value,
      contactNumber: this.registerForm.get('contactNumber')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      role: this.registerForm.get('role')?.value
    };

    console.log('Form Submitted!', user);
    this.authS.registerManager(user).subscribe({
      next: (response: any) => {
        alert('Registration Successful');
        this.router.navigate(['app-admin-dashboard']);
      },
      error: (err: any) => {
        console.error('Registration failed:', err);
        alert('Registration failed. Please try again.');
      }
    });
  } else {
    alert('Please fill out the form correctly.');
  }
}  
}


