declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

type CtaSource = 'hero' | 'sticky' | 'whats-inside' | 'pricing';

const BASE_PAYMENT_URL = 'https://secure.wayforpay.com/payment/sed1c44a9652f';

/** Build payment URL with UTM params for CTA attribution */
export function getPaymentUrl(source: CtaSource): string {
  const params = new URLSearchParams({
    utm_source: 'landing',
    utm_medium: 'cta',
    utm_campaign: 'ai-toolkit',
    utm_content: source,
  });
  return `${BASE_PAYMENT_URL}?${params}`;
}

/** Fire GA4 + Meta Pixel ViewContent on /ai-course landing page */
export function trackViewContent(): void {
  window.gtag?.('event', 'view_item', {
    event_category: 'engagement',
    event_label: 'ai-toolkit',
    currency: 'UAH',
    value: 899,
  });
  window.fbq?.('track', 'ViewContent', {
    content_name: 'ai-toolkit',
    content_type: 'product',
    currency: 'UAH',
    value: 899,
  });
}

/** Fire events + navigate to payment (prevents race condition where navigation cancels pixel request) */
export function trackAndNavigate(source: CtaSource, e: React.MouseEvent): void {
  e.preventDefault();
  window.gtag?.('event', 'purchase_intent', {
    event_category: 'conversion',
    event_label: source,
    transport_type: 'beacon',
  });
  window.fbq?.('track', 'InitiateCheckout', {
    content_name: 'ai-toolkit',
    content_category: source,
    currency: 'UAH',
    value: 899,
  });
  // Give pixel requests 300ms to fire before navigating away
  setTimeout(() => {
    window.location.href = getPaymentUrl(source);
  }, 300);
}

/** Fire GA4 + Meta Pixel purchase event (deduped — only fires once per session) */
export function trackPurchase(): void {
  if (sessionStorage.getItem('purchase_tracked')) return;
  sessionStorage.setItem('purchase_tracked', '1');

  const eventId = 'purchase_' + Date.now();
  window.gtag?.('event', 'purchase', {
    event_category: 'conversion',
    event_label: 'ai_toolkit_payment_success',
    value: 899,
    currency: 'UAH',
  });
  window.fbq?.('track', 'Purchase', {
    content_name: 'ai-toolkit',
    currency: 'UAH',
    value: 899,
  }, { eventID: eventId });
}

/** Fire GA4 + Meta Pixel payment_failed event (deduped) */
export function trackPaymentFailed(): void {
  if (sessionStorage.getItem('payment_failed_tracked')) return;
  sessionStorage.setItem('payment_failed_tracked', '1');

  window.gtag?.('event', 'payment_failed', {
    event_category: 'conversion',
    event_label: 'ai_toolkit_payment_failed',
  });
  window.fbq?.('trackCustom', 'PaymentFailed', {
    content_name: 'ai-toolkit',
  });
}
