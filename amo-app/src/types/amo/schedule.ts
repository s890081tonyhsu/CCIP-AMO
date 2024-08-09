import { Dayjs } from 'dayjs';

import { AmoTranslation } from './translations';

export type AmoSession = {
  id: string;
  room: string;
  start: Dayjs;
  end: Dayjs;
  title: AmoTranslation;
  description: AmoTranslation;
  speakers: AmoTranslation[];
  tags: string[];
};
