import { parse } from 'yaml';

interface TextFieldSettings {
  label: string;
  placeholder: string;
  required: boolean;
  maxLength: number;
}

export interface ContactFormSettings {
  enabled: boolean;
  captchaEnabled: boolean;
  title: string;
  description: string;
  submitLabel: string;
  disabledMessage: string;
  captchaQuestion: string;
  captchaError: string;
  captchaRefreshLabel: string;
  contact: {
    emailLabel: string;
    emails: string[];
    phoneLabel: string;
    phone: string;
    hours: string;
    addressLabel: string;
    addressLines: string[];
  };
  fields: {
    name: TextFieldSettings;
    email: TextFieldSettings;
    message: TextFieldSettings & { rows: number };
  };
}

const record = (value: unknown, key: string): Record<string, unknown> => {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error(`Invalid contact form setting: ${key}`);
  }
  return value as Record<string, unknown>;
};

const text = (value: unknown, key: string): string => {
  if (typeof value !== 'string') throw new Error(`Invalid contact form setting: ${key}`);
  return value;
};

const flag = (value: unknown, key: string): boolean => {
  if (typeof value !== 'boolean') throw new Error(`Invalid contact form setting: ${key}`);
  return value;
};

const positiveInteger = (value: unknown, key: string): number => {
  if (!Number.isInteger(value) || (value as number) < 1) {
    throw new Error(`Invalid contact form setting: ${key}`);
  }
  return value as number;
};

const textList = (value: unknown, key: string): string[] => {
  if (!Array.isArray(value) || !value.every((item) => typeof item === 'string')) {
    throw new Error(`Invalid contact form setting: ${key}`);
  }
  return value;
};

const field = (value: unknown, key: string): TextFieldSettings => {
  const settings = record(value, key);
  return {
    label: text(settings.label, `${key}.label`),
    placeholder: text(settings.placeholder, `${key}.placeholder`),
    required: flag(settings.required, `${key}.required`),
    maxLength: positiveInteger(settings.max_length, `${key}.max_length`)
  };
};

export async function loadContactFormSettings(signal: AbortSignal): Promise<ContactFormSettings> {
  const response = await fetch(`${import.meta.env.BASE_URL}contact-form.yaml`, {
    cache: 'no-store',
    signal
  });

  if (!response.ok) {
    throw new Error(`Failed to load contact form settings: ${response.status}`);
  }

  return parseContactFormSettings(await response.text());
}

export function parseContactFormSettings(source: string): ContactFormSettings {
  const root = record(parse(source) as unknown, 'root');
  const form = record(root.email_form, 'email_form');
  const contact = record(form.contact, 'email_form.contact');
  const fields = record(form.fields, 'email_form.fields');
  const message = record(fields.message, 'email_form.fields.message');
  const captchaQuestion = text(form.captcha_question, 'email_form.captcha_question');

  if (!captchaQuestion.includes('{question}')) {
    throw new Error('email_form.captcha_question must contain {question}');
  }

  return {
    enabled: flag(form.enabled, 'email_form.enabled'),
    captchaEnabled: flag(form.captcha_enabled, 'email_form.captcha_enabled'),
    title: text(form.title, 'email_form.title'),
    description: text(form.description, 'email_form.description'),
    submitLabel: text(form.submit_label, 'email_form.submit_label'),
    disabledMessage: text(form.disabled_message, 'email_form.disabled_message'),
    captchaQuestion,
    captchaError: text(form.captcha_error, 'email_form.captcha_error'),
    captchaRefreshLabel: text(form.captcha_refresh_label, 'email_form.captcha_refresh_label'),
    contact: {
      emailLabel: text(contact.email_label, 'email_form.contact.email_label'),
      emails: textList(contact.emails, 'email_form.contact.emails'),
      phoneLabel: text(contact.phone_label, 'email_form.contact.phone_label'),
      phone: text(contact.phone, 'email_form.contact.phone'),
      hours: text(contact.hours, 'email_form.contact.hours'),
      addressLabel: text(contact.address_label, 'email_form.contact.address_label'),
      addressLines: textList(contact.address_lines, 'email_form.contact.address_lines')
    },
    fields: {
      name: field(fields.name, 'email_form.fields.name'),
      email: field(fields.email, 'email_form.fields.email'),
      message: {
        ...field(message, 'email_form.fields.message'),
        rows: positiveInteger(message.rows, 'email_form.fields.message.rows')
      }
    }
  };
}
