
export type GalleryImage = {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string;
  event_id: string | null;
  created_at: string;
  updated_at: string;
};

export type Event = {
  id: string;
  edition: number;
  year: number;
  title: string;
  start_date: string;
  end_date: string;
  location: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type Stylist = {
  id: string;
  name: string;
  country: string | null;
  bio: string | null;
  contact_info: string | null;
  social_media: Record<string, any> | null;
  profile_image: string | null;
  created_at: string;
  updated_at: string;
};

export type Program = {
  id: string;
  event_id: string;
  title: string;
  description: string | null;
  start_datetime: string;
  end_datetime: string;
  location: string | null;
  created_at: string;
  updated_at: string;
};

export type TicketType = {
  id: string;
  event_id: string;
  name: string;
  description: string | null;
  price: number;
  created_at: string;
  updated_at: string;
};
