import { parse } from 'yaml';

export interface ContactFormSettings {
  enabled: boolean;
  captchaEnabled: boolean;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export async function loadContactFormSettings(signal: AbortSignal): Promise<ContactFormSettings> {
  const response = await fetch(`${import.meta.env.BASE_URL}contact-form.yaml`, {
    cache: 'no-store',
    signal
  });

  if (!response.ok) {
    throw new Error(`Failed to load contact form settings: ${response.status}`);
  }

  const settings: unknown = parse(await response.text());
  if (
    !isRecord(settings) ||
    !isRecord(settings.email_form) ||
    typeof settings.email_form.enabled !== 'boolean' ||
    typeof settings.email_form.captcha_enabled !== 'boolean'
  ) {
    throw new Error('Invalid contact form settings');
  }

  return {
    enabled: settings.email_form.enabled,
    captchaEnabled: settings.email_form.captcha_enabled
  };
}
