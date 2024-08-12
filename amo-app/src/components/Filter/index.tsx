import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';

import { FilterEntries, FilterScope } from '../../types/filter';
import type { OpassSession } from '../../types/opass/schedule';
import type { TranslationKey } from '../../types/translationKey';

type FilterProps = {
  sessions: OpassSession[],
  onFilter: (obj: FilterEntries) => void;
}

function Filter({ sessions, onFilter }: FilterProps) {
  const [date, setDate] = useState<string>('');
  const [room, setRoom] = useState<string>('');

  const { minDate, maxDate, rooms }: FilterScope = useMemo(() => {
    if (sessions.length === 0) return { minDate: '', maxDate: '', rooms: [] };

    const dates = sessions.map(({ start }) => dayjs(start));
    const rooms = Array.from(new Set(sessions.map(({ room }) => room)));
    dates.sort((a, b) => a.isAfter(b) ? 1 : -1);

    setDate(dates[0].format('YYYY-MM-DD'));
    return {
      minDate: dates[0].format('YYYY-MM-DD'),
      maxDate: dates[dates.length - 1].format('YYYY-MM-DD'),
      rooms,
    };
  }, [sessions]);

  useEffect(() => {
    onFilter({ date, room });
  }, [date, onFilter, room]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <label>
        Date
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={minDate}
          max={maxDate}
        />
      </label>
      <label>
        Room
        <select
          value={room}
          onChange={(e) => setRoom(e.target.value as TranslationKey)}
        >
          <option value="" disabled>-- Select a Room --</option>
          {rooms.map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default Filter;
