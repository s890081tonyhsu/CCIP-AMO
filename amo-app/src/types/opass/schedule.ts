import {
  GeneralTranslation,
  SessionTranslation,
  SpeakerTranslation,
} from './translations';
import { TranslationKey } from '../translationKey';

export type OpassSession = {
  [key in TranslationKey]: SessionTranslation;
} & {
  id: string;
  type: string;
  room: string;
  start: string;
  end: string;
  broadcast?: string[] | null,
  qa?: string | null;
  slide?: string | null;
  co_write?: null;
  live?: null;
  record?: null;
  language?: null;
  uri?: string | null;
  speakers: string[];
  tags: string [];
};

export type OpassSpeaker = {
  [key in TranslationKey]: SpeakerTranslation;
} & {
  id: string;
  avatar: string;
};

type session_type = GeneralTranslation;
type room = GeneralTranslation;
type tag = GeneralTranslation;

export type OpassSchedule = {
  sessions: OpassSession[];
  speakers: OpassSpeaker[];
  session_types: session_type[];
  rooms: room[];
  tags: tag[];
};