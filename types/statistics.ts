interface HighRatedBooks {
  id: number;
  image_url: string;
  score: number;
}

interface TopCategory {
  category: string;
  count: number;
}

export type { HighRatedBooks, TopCategory };
