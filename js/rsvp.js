/* ============================================================
   rsvp.js — Formspree submission + inline success state
   ============================================================ */

(function () {
  const form    = document.getElementById('rsvp-form');
  const success = document.getElementById('rsvp-success');

  if (!form) return;

  // Toggle guest count field visibility based on attending
  const attendingYes = document.getElementById('attending-yes');
  const attendingNo  = document.getElementById('attending-no');
  const guestFields  = document.getElementById('guest-fields');

  function updateGuestFields() {
    const show = attendingYes && attendingYes.checked;
    if (guestFields) {
      guestFields.style.display = show ? '' : 'none';
      // Disable required fields when hidden
      guestFields.querySelectorAll('[data-required]').forEach(el => {
        el.required = show;
      });
    }
  }

  if (attendingYes) attendingYes.addEventListener('change', updateGuestFields);
  if (attendingNo)  attendingNo.addEventListener('change', updateGuestFields);
  updateGuestFields();

  // Form submission via Formspree
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('.rsvp-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    const data = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        // Hide form, show success
        form.style.display = 'none';
        if (success) {
          success.style.display = 'block';
          success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        const json = await res.json().catch(() => ({}));
        const msg  = json.errors
          ? json.errors.map(e => e.message).join(', ')
          : 'Something went wrong. Please try again or email us directly.';
        showError(form, msg);
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    } catch (err) {
      showError(form, 'Network error — please check your connection and try again.');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });

  function showError(form, message) {
    let errEl = form.querySelector('.form-error');
    if (!errEl) {
      errEl = document.createElement('p');
      errEl.className = 'form-error';
      errEl.style.cssText = 'color:#c0392b; font-size:0.875rem; margin-top:0.5rem; text-align:center;';
      form.appendChild(errEl);
    }
    errEl.textContent = message;
  }
})();
