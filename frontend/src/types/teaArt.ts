export interface TeaArt {
  id: number;
  title: string;
  description: string;
  season: string;
  temperature: string;
  user: {
    id: number;
    name: string;
  };
  is_owner: boolean;
}

export interface CreateTeaArtRequest {
  tea_art: {
    title: string;
    description: string;
    season: number;
    temperature: number;
  };
}

export interface TeaArtResponse {
  tea_art: TeaArt;
  message: string;
}

export interface TeaArtsListResponse {
  tea_arts: TeaArt[];
}