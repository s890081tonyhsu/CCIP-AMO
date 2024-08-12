import dayjs from 'dayjs';

import type { AmoSession } from '../types/amo/schedule';
import type { AmoTranslation } from '../types/amo/translations';
import type { OpassSchedule } from '../types/opass/schedule';
import type { TranslationKey } from '../types/translationKey';

const langs: TranslationKey[] = ['en', 'zh'];

/**
 * Converts an array of key-value pairs into an AmoTranslation object.
 *
 * This function is a type-safe wrapper around `Object.fromEntries` to ensure
 * that the resulting object conforms to the `AmoTranslation` type. The `Object.fromEntries`
 * method itself does not provide type safety, so we use a type assertion to enforce
 * the correct type.
 *
 * @param entries - An array of key-value pairs where the key is of type `TranslationKey`
 * and the value is a string.
 * @returns An object that conforms to the `AmoTranslation` type.
 */
function fromEntries(entries: [TranslationKey, string][]): AmoTranslation {
  return Object.fromEntries(entries) as AmoTranslation;
}

export default function OpassToAmoSchedule(schedule: OpassSchedule): AmoSession[] {
  const speakerMap = Object.fromEntries(
    schedule.speakers.map(speaker => [speaker.id, speaker])
  );
  return schedule.sessions.map((session) => ({
    id: session.id,
    room: session.room,
    start: dayjs(session.start),
    end: dayjs(session.end),
    title: fromEntries(langs.map(lang => [lang, session[lang].title])),
    description: fromEntries(langs.map(lang => [lang, session[lang].description])),
    speakers: session.speakers.map((speaker) => (
      fromEntries(langs.map(lang => [lang, speakerMap[speaker ?? ''][lang].name]))
    )),
    tags: session.tags,
  }));
}