import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  @Input() site: any;
  @Input() contactForm: any;
  @Input() contactSuccess = false;

  @Output() submitFormRequest = new EventEmitter<void>();
  @Output() formUpdate = new EventEmitter<{ field: string; value: string }>();

  submitForm(): void {
    this.submitFormRequest.emit();
  }

  updateField(field: string, value: string): void {
    this.formUpdate.emit({ field, value });
  }
}
