export interface Niche {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  bio: string;
  brand_color: string;
  color_symbolism?: string;
  logo_filename?: string;
  instagram_handle?: string;
  is_active: boolean;
  sort_order: number;
  stats?: {
    artworks_count: number;
    projects_count: number;
    packages_count: number;
    menu_items_count: number;
  };
}

export interface VerbItem {
  verb: string;
  description: string;
}

export interface ValueItem {
  title: string;
  desc: string;
}

export interface EcosystemVision {
  brand_name: string;
  brand_statement: string;
  founder: {
    name: string;
    title: string;
    statement: string;
  };
  six_verbs: VerbItem[];
  values: ValueItem[];
}

export interface Artwork {
  id: number;
  niche_id: number;
  title: string;
  artist_name: string;
  category: string;
  medium?: string;
  dimensions?: string;
  year?: number;
  price?: number;
  currency: string;
  is_for_sale: boolean;
  is_featured: boolean;
  image_url: string;
  description?: string;
  exhibition_title?: string;
}

export interface StudioProject {
  id: number;
  niche_id: number;
  title: string;
  client?: string;
  category: string;
  media_type: 'video' | 'reel' | 'photo_series';
  media_url: string;
  thumbnail_url?: string;
  duration?: string;
  year?: number;
  is_featured: boolean;
  description?: string;
}

export interface ServicePackage {
  id: number;
  niche_id: number;
  name: string;
  category: string;
  tagline?: string;
  starting_price: number;
  currency: string;
  billing_type: string;
  turnaround_time?: string;
  deliverables: string[];
  is_popular: boolean;
  sort_order: number;
}

export interface MenuItem {
  id: number;
  niche_id: number;
  title: string;
  category: string;
  heritage_origin?: string;
  description: string;
  price: number;
  currency: string;
  image_url?: string;
  dietary_tags: string[];
  is_available: boolean;
  is_signature: boolean;
  sku?: string;
  sort_order: number;
}

export interface EventItem {
  id: number;
  title: string;
  niche_slug?: string;
  event_date: string;
  end_date?: string;
  location: string;
  category: string;
  short_description: string;
  description?: string;
  image_url?: string;
  rsvp_url?: string;
  ticket_price?: number;
  currency?: string;
  is_past: boolean;
  recap_notes?: string;
  recap_gallery: string[];
  attendees_count?: number;
}

export interface InstagramPost {
  id: string;
  caption: string;
  image_url: string;
  likes: number;
  comments: number;
  timestamp: string;
  permalink: string;
}

export type ActivePage = 
  | 'home' 
  | 'about' 
  | 'nexart-africa' 
  | 'nexstudios-africa' 
  | 'nexafricuisine' 
  | 'nexevents-africa' 
  | 'partner-invest' 
  | 'contact';
