# Contact form settings

Edit [`public/contact-form.yaml`](../public/contact-form.yaml) to control the contact section and its form. The file includes all current browser-side form settings.

```yaml
email_form:
  enabled: true
  captcha_enabled: true
  title: "Свържете се с Нас"
  # See the file for the remaining settings.
```

| Setting | What it controls |
| --- | --- |
| `enabled` | Shows or hides the form; contact details remain visible. |
| `captcha_enabled` | Shows or skips the arithmetic challenge. |
| `title`, `description` | Contact section heading and introduction. |
| `submit_label`, `disabled_message` | Submit button and disabled-form message. |
| `captcha_question`, `captcha_error`, `captcha_refresh_label` | Challenge wording, wrong-answer message, and refresh button label. `captcha_question` must contain `{question}`. |
| `contact.email_label`, `contact.emails` | Email heading and displayed addresses. |
| `contact.phone_label`, `contact.phone`, `contact.hours` | Phone heading, number, and hours. |
| `contact.address_label`, `contact.address_lines` | Address heading and displayed lines. |
| `fields.name`, `fields.email`, `fields.message` | Each field's `label`, `placeholder`, `required`, and `max_length`. The message field also has `rows`. |

Toggle values and `required` flags must be YAML booleans (`true` or `false`). Lengths and rows must be positive integers. The site reads this public file when the page loads. After editing the source file, rebuild and deploy the site, then reload the page. If the file is missing or invalid, the contact section shows an unavailable message.

Do not put passwords or API keys in this file. The current form only logs entries in the browser console; it does not send email. Email delivery would require a separate backend or form service, with its credentials kept outside this public file.
