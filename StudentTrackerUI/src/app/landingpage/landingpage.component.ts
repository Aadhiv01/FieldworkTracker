import { Component, Renderer2, ElementRef, ViewChild  } from '@angular/core';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent {

  @ViewChild('registrationForm') registrationForm!: ElementRef;

  password: string = '';
  strengthLevel: string = 'empty';
  strengthValue: string = "Strength Level Indicator";
  fieldTextType: boolean = false;

  constructor(private renderer: Renderer2) {}

  scrollToForm(form: HTMLFormElement) {
    if (this.registrationForm) {
      this.renderer.selectRootElement(this.registrationForm.nativeElement).scrollIntoView({ behavior: 'smooth' });
    }
  }

  checkPasswordStrength() {
    const password = this.password;
    const isAlphanumeric = /^(?=.*[0-9])(?=.*[a-zA-Z])/.test(password);
    const isOnlyAlphabetsOrNumbers = /^[a-zA-Z0-9]*$/.test(password);

    if(password.length == 0) {
      this.strengthLevel = "empty";
      this.strengthValue = "Strength Level Indicator";
    } else if (password.length < 5 || isOnlyAlphabetsOrNumbers) {
      this.strengthLevel = 'very-weak';
      this.strengthValue = "Very Weak";
    } else if (password.length < 7 || !isAlphanumeric) {
      this.strengthLevel = 'weak';
      this.strengthValue = "Weak";
    } else if (password.length < 9 && password.replace(/[^a-zA-Z]/g, '').length < 6) {
      this.strengthLevel = 'medium';
      this.strengthValue = "Medium";
    } else {
      this.strengthLevel = 'strong';
      this.strengthValue = "Strong"
    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
