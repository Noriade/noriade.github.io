(function () {
  'use strict';

  var consentKey = 'noriade-analytics-consent';
  var measurementId = 'G-FXDTY1HHNQ';
  var isEnglish = window.location.pathname.indexOf('/en/') === 0 || window.location.pathname === '/en';
  var copy = isEnglish ? {
    message: 'We use Google Analytics to understand how this website is used. You can accept or refuse audience measurement.',
    accept: 'Accept',
    refuse: 'Refuse',
    privacy: 'Learn more'
  } : {
    message: 'Nous utilisons Google Analytics pour comprendre la fréquentation du site. Vous pouvez accepter ou refuser la mesure d’audience.',
    accept: 'Accepter',
    refuse: 'Refuser',
    privacy: 'En savoir plus'
  };

  function loadAnalytics() {
    if (window.__noriadeAnalyticsLoaded) return;
    window.__noriadeAnalyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', measurementId);

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
    document.head.appendChild(script);
  }

  function trackEvent(name, parameters) {
    if (window.__noriadeAnalyticsLoaded && typeof window.gtag === 'function') {
      window.gtag('event', name, parameters || {});
    }
  }

  function saveConsent(value) {
    try { window.localStorage.setItem(consentKey, value); } catch (error) { /* private browsing */ }
  }

  function showManageControl() {
    if (document.querySelector('.analytics-consent__manage')) return;
    var control = document.createElement('button');
    control.type = 'button';
    control.className = 'analytics-consent__manage';
    control.textContent = isEnglish ? 'Cookie settings' : 'Gérer mes cookies';
    control.addEventListener('click', function () {
      saveConsent('');
      control.remove();
      showBanner();
    });
    document.body.appendChild(control);
  }

  function showBanner() {
    var banner = document.createElement('aside');
    banner.className = 'analytics-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', isEnglish ? 'Analytics consent' : 'Consentement à la mesure d’audience');
    banner.innerHTML = '<p>' + copy.message + ' <a href="' + (isEnglish ? '/en/legal-disclaimer/' : '/mentions-legales/') + '">' + copy.privacy + '</a></p>' +
      '<div class="analytics-consent__actions"><button type="button" data-consent="refused" class="analytics-consent__refuse">' + copy.refuse + '</button>' +
      '<button type="button" data-consent="accepted" class="analytics-consent__accept">' + copy.accept + '</button></div>';
    document.body.appendChild(banner);
    banner.addEventListener('click', function (event) {
      var choice = event.target.getAttribute('data-consent');
      if (!choice) return;
      saveConsent(choice);
      if (choice === 'accepted') loadAnalytics();
      banner.remove();
      showManageControl();
    });
  }

  var consent;
  try { consent = window.localStorage.getItem(consentKey); } catch (error) { consent = null; }
  if (consent === 'accepted') {
    loadAnalytics();
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', showManageControl);
    else showManageControl();
  }
  else if (!consent) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', showBanner);
    else showBanner();
  }

  document.addEventListener('noriade:contact-success', function () {
    trackEvent('generate_lead', { method: 'contact_form' });
  });

  document.addEventListener('click', function (event) {
    var link = event.target.closest ? event.target.closest('a[href]') : null;
    if (!link) return;
    var href = link.getAttribute('href') || '';
    if (/^mailto:/i.test(href)) trackEvent('contact_email');
    else if (/^tel:/i.test(href)) trackEvent('contact_phone');
    else if (/\/(?:commander|order)\//.test(href)) {
      trackEvent('select_content', { content_type: 'order_link', item_id: href });
    }
  });
}());
