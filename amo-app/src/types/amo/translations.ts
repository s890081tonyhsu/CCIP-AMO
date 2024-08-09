import { TranslationKey } from '../translationKey';

export type AmoTranslation = {
  [key in TranslationKey]: string;
};
