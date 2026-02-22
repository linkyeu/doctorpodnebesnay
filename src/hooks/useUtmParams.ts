import { useSearchParams } from 'react-router-dom';

export interface UtmParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
}

export function useUtmParams(): UtmParams {
  const [searchParams] = useSearchParams();

  return {
    utm_source: searchParams.get('utm_source') || '',
    utm_medium: searchParams.get('utm_medium') || '',
    utm_campaign: searchParams.get('utm_campaign') || '',
  };
}
