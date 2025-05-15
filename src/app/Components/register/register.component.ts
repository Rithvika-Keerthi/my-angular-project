// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthserviceService } from '../../Services/authservice.service';

// @Component({
//   selector: 'app-register',
//   imports: [],
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.css'
// })
// export class RegisterComponent {
//   registerForm!: FormGroup;
//     constructor(private fb: FormBuilder, private router: Router,private authS: AuthserviceService) {
 
   
//    this.registerForm = this.fb.group({
//      name: ['', Validators.required],
//      contactNumber: ['', Validators.required],
//      email: ['', [Validators.required, Validators.email]],
//      password: ['', Validators.required],
//      role:['', Validators.required]
//      });
     
//     }
   
 
//   onSubmit(): void {
//     if (this.registerForm.valid) {
//       const user = {
//         name: this.registerForm.get('name')?.value,
//         contactNumber: this.registerForm.get('contactNumber')?.value,
//         email: this.registerForm.get('email')?.value,
//         password: this.registerForm.get('password')?.value,
//         role: this.registerForm.get('role')?.value
//       };
 
//       console.log('Form Submitted!', user);
//       this.authS.registerAdminUser(user).subscribe({
//         next: (response: any) => {
//           alert('Registration Successful');
//           this.router.navigate(['app/admincomponent']);
//         },
//         error: (err: any) => {
//           console.error('Registration failed:', err);
//           alert('Registration failed. Please try again.');
//         }
//       });
//     } else {
//       alert('Please fill out the form correctly.');
//     }
//   }  
 

// }
