import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoginMode = true;
  isLoading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
  }

  onSubmit() {
    if (this.isLoginMode) {
      this.login();
    } else {
      this.register();
    }
  }

  login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      // Simulate API call
      setTimeout(() => {
        // Mock login - you should replace this with actual authentication
        const { email, password } = this.loginForm.value;
        
        if (email === 'user@example.com' && password === 'password') {
          // Successful login
          localStorage.setItem('user', JSON.stringify({ email, isLoggedIn: true }));
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Invalid email or password';
        }
        
        this.isLoading = false;
      }, 1000);
    }
  }

  register() {
    if (this.registerForm.valid) {
      const { password, confirmPassword } = this.registerForm.value;
      
      if (password !== confirmPassword) {
        this.errorMessage = 'Passwords do not match';
        return;
      }

      this.isLoading = true;
      this.errorMessage = '';
      
      // Simulate API call
      setTimeout(() => {
        // Mock registration - you should replace this with actual registration
        const userData = this.registerForm.value;
        localStorage.setItem('user', JSON.stringify({ 
          email: userData.email, 
          name: `${userData.firstName} ${userData.lastName}`,
          isLoggedIn: true 
        }));
        
        this.router.navigate(['/']);
        this.isLoading = false;
      }, 1000);
    }
  }

  // Helper methods for template
  getFieldError(formName: 'login' | 'register', fieldName: string): string {
    const form = formName === 'login' ? this.loginForm : this.registerForm;
    const field = form.get(fieldName);
    
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email';
      if (field.errors['minlength']) return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
    }
    
    return '';
  }
}