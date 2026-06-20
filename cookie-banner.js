/**
 * DOKMOS ENGENHARIA - Cookie Consent Manager + Meta Pixel
 * LGPD & GDPR Compliant
 */

(function() {
  'use strict';

  var CONSENT_KEY = 'dokmos_cookie_consent_v1';
  var consentData = { essential: true, analytics: false, timestamp: null };

  function getStoredConsent() {
    try { var s = localStorage.getItem(CONSENT_KEY); if (s) return JSON.parse(s); } catch (e) {}
    return null;
  }
  function saveConsent(data) { try { localStorage.setItem(CONSENT_KEY, JSON.stringify(data)); } catch (e) {} }

  function loadGoogleAnalytics() {
    if (window.gtm_loaded) return;
    window.gtm_loaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-YW88S9MJG1';
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-YW88S9MJG1', { 'cookie_flags': 'SameSite=None;Secure', 'anonymize_ip': true });
  }

  function loadGoogleTagManager() {
    if (window.gtm_container_loaded) return;
    window.gtm_container_loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'event': 'consent_update', 'analytics_consent': true });
    (function(w, d, s, l, i) {
      w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
      j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', '15086467112');
  }

  function loadMetaPixel() {
    if (window.fbq && window.fbq.loaded) return;
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1362520712382496');
    fbq('track', 'PageView');

    document.addEventListener('click', function(e) {
      var el = e.target.closest('a,button');
      if (!el) return;
      var href = (el.getAttribute('href') || '').toLowerCase();
      var text = (el.textContent || '').toLowerCase();
      if (href.indexOf('wa.me/') !== -1 || href.indexOf('whatsapp') !== -1 || href.indexOf('tel:') !== -1 || text.indexOf('whatsapp') !== -1 || text.indexOf('ligar') !== -1 || text.indexOf('telefone') !== -1) {
        fbq('track', 'Contact', { content_name: 'WhatsApp/Telefone' });
      }
    });

    document.addEventListener('submit', function(e) {
      var form = e.target;
      if (form.tagName !== 'FORM') return;
      var inputs = form.querySelectorAll('input[type="email"],input[type="tel"],input[name*="email"],input[name*="phone"],input[name*="telefone"],textarea');
      if (inputs.length > 0) {
        fbq('track', 'Lead', { content_name: form.getAttribute('action') || window.location.pathname });
      }
    });

    var lastPath = location.pathname;
    function trackViewContent() {
      if (location.pathname !== lastPath) {
        lastPath = location.pathname;
        fbq('track', 'ViewContent', { content_name: location.pathname, content_type: 'product' });
      }
    }
    window.addEventListener('popstate', trackViewContent);
    var _pushState = history.pushState;
    history.pushState = function() { _pushState.apply(this, arguments); trackViewContent(); };
    var _replaceState = history.replaceState;
    history.replaceState = function() { _replaceState.apply(this, arguments); trackViewContent(); };
  }

  function loadScripts() {
    if (consentData.analytics) {
      loadGoogleAnalytics();
      loadGoogleTagManager();
      loadMetaPixel();
    }
  }

  function createBanner() {
    var banner = document.createElement('div');
    banner.id = 'dokmos-cookie-banner';
    banner.style.cssText = 'position:fixed;bottom:16px;left:50%;transform:translateX(-50%) translateY(150%);width:90%;max-width:480px;background:rgba(26,54,93,0.92);color:#fff;padding:12px 16px;z-index:99999;font-family:Montserrat,sans-serif;font-size:0.8rem;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,0.15);backdrop-filter:blur(10px);border:1px solid rgba(255,193,7,0.3);transition:transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);';
    banner.innerHTML = '<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;"><p style="margin:0;flex:1;min-width:200px;line-height:1.4;">Utilizamos cookies para melhorar sua experiencia. <a href="politica-cookies.html" style="color:#ffc107;text-decoration:underline;font-size:0.75rem;">Saiba mais</a></p><div style="display:flex;gap:6px;flex-shrink:0;"><button id="cookie-reject" style="padding:6px 12px;background:transparent;color:#e2e8f0;border:1px solid rgba(255,255,255,0.25);border-radius:4px;cursor:pointer;font-family:Montserrat,sans-serif;font-size:0.75rem;transition:all 0.2s;">Rejeitar</button><button id="cookie-accept" style="padding:6px 12px;background:#ffc107;color:#000;border:none;border-radius:4px;cursor:pointer;font-family:Montserrat,sans-serif;font-size:0.75rem;font-weight:600;transition:all 0.2s;">Aceitar</button></div></div>';
    document.body.appendChild(banner);
    requestAnimationFrame(function() { banner.style.transform = 'translateX(-50%) translateY(0)'; });
    return banner;
  }

  function hideBanner() {
    var b = document.getElementById('dokmos-cookie-banner');
    if (b) { b.style.transform = 'translateX(-50%) translateY(150%)'; setTimeout(function() { b.remove(); }, 600); }
  }

  function handleAccept() {
    consentData.analytics = true;
    consentData.timestamp = new Date().toISOString();
    saveConsent(consentData); loadScripts(); hideBanner();
  }
  function handleReject() {
    consentData.analytics = false;
    consentData.timestamp = new Date().toISOString();
    saveConsent(consentData); hideBanner();
  }

  function init() {
    var stored = getStoredConsent();
    if (stored) { consentData = stored; loadScripts(); return; }
    setTimeout(function() {
      var banner = createBanner();
      document.getElementById('cookie-accept').addEventListener('click', handleAccept);
      document.getElementById('cookie-reject').addEventListener('click', handleReject);
    }, 4500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
