import { CATEGORIES_TITLES, CATEGORIES_VALUES } from '../../constants/categories';

export const data = [
  {
    title: 'The Matrix',
    rating: 7.5,
    data: 'action',
  },
  {
    title: 'Focus',
    rating: 6.9,
    data: 'comedy',
  },
  {
    title: 'The Lazarus Effect',
    rating: 6.4,
    data: 'thriller',
  },
  {
    title: 'Everly',
    rating: 5,
    data: 'action',
  },
  {
    title: 'Maps to the Stars',
    rating: 7.5,
    data: 'drama',
  },
];

export const categoriesOptions = [
  { title: CATEGORIES_TITLES.any, value: CATEGORIES_VALUES.any },
  { title: CATEGORIES_TITLES.action, value: CATEGORIES_VALUES.action },
  { title: CATEGORIES_TITLES.comedy, value: CATEGORIES_VALUES.comedy },
  { title: CATEGORIES_TITLES.drama, value: CATEGORIES_VALUES.drama },
  { title: CATEGORIES_TITLES.thriller, value: CATEGORIES_VALUES.thriller },
];

export const starsOptions = Array.from({ length: 11 }, (_, i) => i);
