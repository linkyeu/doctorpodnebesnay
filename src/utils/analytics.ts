declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type CtaSource = 'sticky' | 'whats-inside' | 'pricing';

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

/** Fire GA4 purchase_intent event before navigating to payment */
export function trackPurchaseIntent(source: CtaSource): void {
  window.gtag?.('event', 'purchase_intent', {
    event_category: 'conversion',
    event_label: source,
    transport_type: 'beacon',
  });
}
