import {
  EcosystemVision,
  Niche,
  Artwork,
  StudioProject,
  ServicePackage,
  MenuItem,
  EventItem,
  InstagramPost,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5001/api';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed with status ${res.status}`);
  }
  const json = await res.json();
  return json.data;
}

export const api = {
  // Ecosystem & Vision
  async getEcosystem(): Promise<{ group_vision: EcosystemVision; niches: Niche[] }> {
    const res = await fetch(`${API_BASE_URL}/ecosystem`);
    return handleResponse(res);
  },

  async getNiches(): Promise<Niche[]> {
    const res = await fetch(`${API_BASE_URL}/niches`);
    return handleResponse(res);
  },

  async getNiche(slug: string): Promise<Niche> {
    const res = await fetch(`${API_BASE_URL}/niches/${slug}`);
    return handleResponse(res);
  },

  // NexArt Africa
  async getArtworks(category?: string): Promise<Artwork[]> {
    const url = new URL(`${API_BASE_URL}/art/artworks`);
    if (category && category !== 'All') {
      url.searchParams.append('category', category);
    }
    const res = await fetch(url.toString());
    return handleResponse(res);
  },

  async getArtCategories(): Promise<string[]> {
    const res = await fetch(`${API_BASE_URL}/art/categories`);
    return handleResponse(res);
  },

  async submitArtistWork(payload: {
    artist_name: string;
    email: string;
    portfolio_url: string;
    bio: string;
    phone?: string;
    primary_medium?: string;
  }) {
    const res = await fetch(`${API_BASE_URL}/art/submit-work`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  // NexStudios Africa
  async getStudioPortfolio(category?: string): Promise<StudioProject[]> {
    const url = new URL(`${API_BASE_URL}/studios/portfolio`);
    if (category && category !== 'All') {
      url.searchParams.append('category', category);
    }
    const res = await fetch(url.toString());
    return handleResponse(res);
  },

  async getRateCard(category?: string): Promise<ServicePackage[]> {
    const url = new URL(`${API_BASE_URL}/studios/rate-card`);
    if (category) {
      url.searchParams.append('category', category);
    }
    const res = await fetch(url.toString());
    return handleResponse(res);
  },

  async bookStudioSession(payload: {
    full_name: string;
    email: string;
    service_type: string;
    message: string;
    phone?: string;
    preferred_date?: string;
    package_id?: number;
  }) {
    const res = await fetch(`${API_BASE_URL}/studios/book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  // NexAfriCuisine
  async getCuisineMenu(category?: string): Promise<MenuItem[]> {
    const url = new URL(`${API_BASE_URL}/cuisine/menu`);
    if (category && category !== 'All') {
      url.searchParams.append('category', category);
    }
    const res = await fetch(url.toString());
    return handleResponse(res);
  },

  async getCuisineCategories(): Promise<string[]> {
    const res = await fetch(`${API_BASE_URL}/cuisine/categories`);
    return handleResponse(res);
  },

  async submitCateringInquiry(payload: {
    full_name: string;
    email: string;
    event_type: string;
    message: string;
    phone?: string;
    guest_count?: number;
    event_date?: string;
  }) {
    const res = await fetch(`${API_BASE_URL}/cuisine/catering-inquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  // Events
  async getEvents(upcoming?: boolean): Promise<EventItem[]> {
    const url = new URL(`${API_BASE_URL}/events`);
    if (upcoming !== undefined) {
      url.searchParams.append('upcoming', String(upcoming));
    }
    const res = await fetch(url.toString());
    return handleResponse(res);
  },

  async rsvpEvent(eventId: number, payload: {
    full_name: string;
    email: string;
    tickets_count?: number;
    phone?: string;
  }) {
    const res = await fetch(`${API_BASE_URL}/events/${eventId}/rsvp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  // Inquiries (General contact dropdown routing & Partner/Invest)
  async submitContact(payload: {
    full_name: string;
    email: string;
    message: string;
    target_niche?: string;
    subject?: string;
    phone?: string;
  }) {
    const res = await fetch(`${API_BASE_URL}/inquiries/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  async submitPartnerInvest(payload: {
    full_name: string;
    email: string;
    area_of_interest: string;
    message: string;
    organization?: string;
    phone?: string;
  }) {
    const res = await fetch(`${API_BASE_URL}/inquiries/partner-invest`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  // Newsletter
  async subscribeNewsletter(email: string, nicheInterest = 'all') {
    const res = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, niche_interest: nicheInterest }),
    });
    return handleResponse(res);
  },

  // Curated Instagram Feed
  async getInstagramFeed(nicheSlug: string): Promise<{ handle: string; posts: InstagramPost[] }> {
    const res = await fetch(`${API_BASE_URL}/instagram/${nicheSlug}`);
    return handleResponse(res);
  },
};
