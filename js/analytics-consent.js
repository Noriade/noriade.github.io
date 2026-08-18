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

  function saveConsent(value) {
    try { window.localStorage.setItem(consentKey, value); } catch (error) { /* private browsing */ }
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
    });
  }

  var consent;
  try { consent = window.localStorage.getItem(consentKey); } catch (error) { consent = null; }
  if (consent === 'accepted') loadAnalytics();
  else if (!consent) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', showBanner);
    else showBanner();
  }
}());
