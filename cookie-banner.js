/**
 * DOKMOS ENGENHARIA - Cookie Consent Manager (Sutil)
 * LGPD & GDPR Compliant
 */

(function() {
  'use strict';

  const CONSENT_KEY = 'dokmos_cookie_consent_v1';

  let consentData = { essential: true, analytics: false, marketing: false, timestamp: null };

  function getStoredConsent() {
    try { const s = localStorage.getItem(CONSENT_KEY); if (s) return JSON.parse(s); } catch (e) {}
    return null;
  }
  function saveConsent(data) { try { localStorage.setItem(CONSENT_KEY, JSON.stringify(data)); } catch (e) {} }

  function loadGoogleAnalytics() {
    if (window.gtm_loaded) return;
    window.gtm_loaded = true;

    // Google Analytics 4 (gtag.js) - Standalone
    const s = document.createElement('script');
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

    // Initialize dataLayer with consent settings for GTM
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'consent_update',
      'analytics_consent': true
    });

    // Load GTM container
    (function(w, d, s, l, i) {
      w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
      j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', '15086467112');
  }

  function loadMetaPixel() {
    if (window.fbq) return;
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', '1362520712382496');  // Meta Pixel ID - DOKMOS ENGENHARIA
    window.fbq('track', 'PageView');
  }

  function loadScripts() {
    if (consentData.analytics) {
      loadGoogleAnalytics();
      loadGoogleTagManager();
    }
    if (consentData.marketing) loadMetaPixel();
  }

  function createBanner() {
    const banner = document.createElement('div');
    banner.id = 'dokmos-cookie-banner';
    banner.style.cssText = 'position:fixed;bottom:16px;left:50%;transform:translateX(-50%) translateY(150%);width:90%;max-width:480px;background:rgba(26,54,93,0.92);color:#fff;padding:12px 16px;z-index:99999;font-family:Montserrat,sans-serif;font-size:0.8rem;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,0.15);backdrop-filter:blur(10px);border:1px solid rgba(255,193,7,0.3);transition:transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);';

    banner.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;">
        <p style="margin:0;flex:1;min-width:200px;line-height:1.4;">
          🍪 Utilizamos cookies para melhorar sua experiência.
          <a href="politica-cookies.html" style="color:#ffc107;text-decoration:underline;font-size:0.75rem;">Saiba mais</a>
        </p>
        <div style="display:flex;gap:6px;flex-shrink:0;">
          <button id="cookie-reject" style="padding:6px 12px;background:transparent;color:#e2e8f0;border:1px solid rgba(255,255,255,0.25);border-radius:4px;cursor:pointer;font-family:Montserrat,sans-serif;font-size:0.75rem;transition:all 0.2s;">Rejeitar</button>
          <button id="cookie-accept" style="padding:6px 12px;background:#ffc107;color:#000;border:none;border-radius:4px;cursor:pointer;font-family:Montserrat,sans-serif;font-size:0.75rem;font-weight:600;transition:all 0.2s;">Aceitar</button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);
    requestAnimationFrame(() => { banner.style.transform = 'translateX(-50%) translateY(0)'; });
    return banner;
  }

  function hideBanner() {
    const b = document.getElementById('dokmos-cookie-banner');
    if (b) { b.style.transform = 'translateX(-50%) translateY(150%)'; setTimeout(() => b.remove(), 600); }
  }

  function handleAccept() {
    consentData.analytics = true; consentData.marketing = true;
    consentData.timestamp = new Date().toISOString();
    saveConsent(consentData); loadScripts(); hideBanner();
  }
  function handleReject() {
    consentData.analytics = false; consentData.marketing = false;
    consentData.timestamp = new Date().toISOString();
    saveConsent(consentData); hideBanner();
  }

  function init() {
    const stored = getStoredConsent();
    if (stored) { consentData = stored; loadScripts(); return; }

    // Delay para não ser intrusivo
    setTimeout(() => {
      const banner = createBanner();
      document.getElementById('cookie-accept').addEventListener('click', handleAccept);
      document.getElementById('cookie-reject').addEventListener('click', handleReject);
    }, 4500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
