export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  ratings_average?: number;
  first_publish_year?: number;
  number_of_pages_median?: number;
}

export interface BookDetails extends Book {
  description?: string;
  subjects?: string[];
  publisher?: string;
  language?: string;
  isbn?: string;
  authors?: { name: string; key: string }[];
}
