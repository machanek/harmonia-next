import React from 'react';
import {
  Form,
  FormRow,
  FormGroup,
  FormLabel,
  FormInput,
  FormSelect,
  FormTextarea,
  CheckboxGroup,
  FormCheckbox,
  CheckboxLabel,
  FormActions,
  FormSubmitButton,
  HiddenField,
} from '@/components/ui/Form';

interface ContactFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  return (
    <Form
      id="contactForm"
      name="contact"
      method="POST"
      onSubmit={onSubmit}
    >
      <input type="hidden" name="form-name" value="contact" />
      <HiddenField>
        <label>Nie wypełniaj tego pola: <input name="bot-field" /></label>
      </HiddenField>

      <FormRow>
        <FormGroup>
          <FormLabel htmlFor="name">Imię i nazwisko *</FormLabel>
          <FormInput 
            id="name" 
            name="name" 
            type="text" 
            required 
            placeholder="Jan Kowalski" 
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="phone">Telefon *</FormLabel>
          <FormInput 
            id="phone" 
            name="phone" 
            type="tel" 
            required 
            placeholder="+48 600 000 000" 
          />
        </FormGroup>
      </FormRow>

      <FormRow>
        <FormGroup>
          <FormLabel htmlFor="email">E-mail *</FormLabel>
          <FormInput 
            id="email" 
            name="email" 
            type="email" 
            required 
            placeholder="jan@example.com" 
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="subject">Temat</FormLabel>
          <FormSelect id="subject" name="subject">
            <option value="">Wybierz temat</option>
            <option value="Pytanie o mieszkanie">Pytanie o mieszkanie</option>
            <option value="Umówienie prezentacji">Umówienie prezentacji</option>
            <option value="Finansowanie">Finansowanie</option>
            <option value="Dokumenty i procedury">Dokumenty i procedury</option>
            <option value="Inne">Inne</option>
          </FormSelect>
        </FormGroup>
      </FormRow>

      <FormRow>
        <FormGroup fullWidth>
          <FormLabel htmlFor="message">Wiadomość *</FormLabel>
          <FormTextarea 
            id="message" 
            name="message" 
            rows={5} 
            required 
            placeholder="Treść wiadomości..." 
          />
        </FormGroup>
      </FormRow>

      <FormRow>
        <FormGroup fullWidth>
          <CheckboxGroup>
            <FormCheckbox type="checkbox" id="privacy" name="privacy" required />
            <CheckboxLabel htmlFor="privacy">
              Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z Polityką prywatności w celu odpowiedzi na zapytanie. *
            </CheckboxLabel>
          </CheckboxGroup>
        </FormGroup>
      </FormRow>

      <FormRow>
        <FormGroup fullWidth>
          <CheckboxGroup>
            <FormCheckbox type="checkbox" id="marketing" name="marketing" />
            <CheckboxLabel htmlFor="marketing">
              Wyrażam zgodę na otrzymywanie informacji marketingowych o ofercie Harmonia Rząska.
            </CheckboxLabel>
          </CheckboxGroup>
        </FormGroup>
      </FormRow>

      <FormActions>
        <FormSubmitButton type="submit">
          WYŚLIJ WIADOMOŚĆ
        </FormSubmitButton>
      </FormActions>
    </Form>
  );
}
