import { EventDetails } from './interfaces/event';

export const EVENT_FIELDS: Array<keyof EventDetails> = [
  'locale',
  'dateOfEvent',
  'theme',
  'speaker',
  'amountPeople',
  'category_id',
  'isDeleted',
  'createdAt',
  'updatedAt',
  'category'
];
