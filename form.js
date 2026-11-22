// Sends every form marked data-contact to FormTango without leaving the page.
// Until you replace the YOUR_..._FORM_ID placeholder in a form's action in
// index.html, that form runs in demo mode and says so instead of sending.
(function () {
  var forms = document.querySelectorAll('form[data-contact]');
  Array.prototype.forEach.call(forms, function (form) {
    var status = form.querySelector('[data-status]');
    var button = form.querySelector('button[type="submit"]');
    if (!status || !button) return;
    var label = button.textContent;

    function say(text, kind) {
      status.textContent = text;
      status.dataset.kind = kind;
      status.hidden = false;
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      // Any action that still contains "YOUR_" is a placeholder.
      if (form.action.indexOf('YOUR_') !== -1) {
        say('Demo mode: add your FormTango form id in index.html and this form will send for real.', 'info');
        return;
      }
      button.disabled = true;
      button.textContent = 'Sending…';
      fetch(form.action, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) })
        .then(function (response) { return response.json().then(function (body) { if (!response.ok || !body.ok) throw body; }); })
        .then(function () { form.reset(); say(form.dataset.success || 'Thanks! Your message has been sent.', 'ok'); })
        .catch(function (body) { say((body && body.error) || 'Something went wrong. Please try again.', 'error'); })
        .then(function () { button.disabled = false; button.textContent = label; });
    });
  });
})();

// Theme switcher. Remembers the choice on this device.
(function () {
  var buttons = document.querySelectorAll('[data-set-theme]');
  if (!buttons.length) return;
  var root = document.documentElement;

  function mark() {
    Array.prototype.forEach.call(buttons, function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.setTheme === root.dataset.theme));
    });
  }

  Array.prototype.forEach.call(buttons, function (button) {
    button.addEventListener('click', function () {
      root.dataset.theme = button.dataset.setTheme;
      try { localStorage.setItem('theme', button.dataset.setTheme); } catch (e) {}
      mark();
    });
  });
  mark();
})();

// "Work with me" dialog. Escape and focus handling come from the native <dialog>.
(function () {
  var openers = document.querySelectorAll('[data-open-dialog]');
  Array.prototype.forEach.call(openers, function (opener) {
    var dialog = document.getElementById(opener.dataset.openDialog);
    if (!dialog) return;
    opener.addEventListener('click', function () {
      if (dialog.showModal) dialog.showModal(); else dialog.setAttribute('open', '');
    });
  });

  Array.prototype.forEach.call(document.querySelectorAll('dialog'), function (dialog) {
    function close() {
      if (dialog.close) dialog.close(); else dialog.removeAttribute('open');
    }
    Array.prototype.forEach.call(dialog.querySelectorAll('[data-close-dialog]'), function (button) {
      button.addEventListener('click', close);
    });
    // A click on the dimmed area outside the box closes it.
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) close();
    });
  });
})();
