# Contact form settings

Edit [`public/contact-form.yaml`](../public/contact-form.yaml) to control the form:

```yaml
email_form:
  enabled: true
  captcha_enabled: true
```

- Set `enabled: false` to hide the form. The contact information remains visible.
- Set `captcha_enabled: false` to hide the arithmetic challenge and skip its check.

Both values must be YAML booleans (`true` or `false`). The site reads this public file when the page loads. After editing the source file, rebuild and deploy the site, then reload the page. If the file is missing or invalid, the form stays unavailable.

Do not put passwords or API keys in this file. The current form only logs entries in the browser console; it does not send email. Email delivery would require a separate backend or form service.
