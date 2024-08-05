import {
  GeneralTranslation,
  SessionTranslation,
  SpeakerTranslation,
  TranslationKey,
} from './translations';

export type Session = {
  [key in TranslationKey]: SessionTranslation;
} & {
  id: string;
  type: string;
  room: string;
  start: string;
  broadcast?: string[] | null,
  qa?: string | null;
  slide?: string | null;
  co_write?: null;
  live?: null;
  record?: null;
  language?: null;
  uri?: string | null;
  speakers?: (string | null)[] | null;
  tags?: (string | null)[] | null;
};

export type Speaker = {
  [key in TranslationKey]: SpeakerTranslation;
} & {
  id: string;
  avatar: string;
};

type session_type = GeneralTranslation;
type room = GeneralTranslation;
type tag = GeneralTranslation;

export type Schedule = {
  sessions: Session[];
  speakers: Speaker[];
  session_types: session_type[];
  rooms: room[];
  tags: tag[];
};