import { ChangeEvent, useCallback, useState } from 'react';
import dayjs from 'dayjs';

import { Filter } from './components';
import OpassToAmoSchedule from './adapters/OpassToAmoSchedule';
import { SimpleList } from './templates';

import type { AmoSession } from './types/amo/schedule';
import type { FilterEntries } from './types/filter';
import type { OpassSchedule } from './types/opass/schedule';


import './assets/css/App.css';

function App() {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [schedule, setSchedule] = useState<OpassSchedule | null>(null);
  const [filteredSessions, setFilteredSessions] = useState<AmoSession[]>([]);

  const handleReadfile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const content = await file.text();
      const nextSchedule = JSON.parse(content) as OpassSchedule;
      setSchedule(nextSchedule);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      }
    }
  };

  const handleFilter = useCallback((obj: FilterEntries) => {
    if (!schedule) return;

    const { date, room } = obj;
    const targetDate = dayjs(date) ?? null;
    const convertedSessions = OpassToAmoSchedule(schedule);
    const nextFilterSessions = convertedSessions.filter(session => {
      if (targetDate && !session.start.isSame(targetDate, 'day')) return false;
      if (room !== '' && session.room !== room) return false;
      return true;
    });
    setFilteredSessions(nextFilterSessions);
  }, [schedule]);

  return (
    <div>
      <h1>Agenda</h1>
      <input type="file" onChange={handleReadfile} />
      {errorMsg && (
        <p style={{ color: 'red' }}>{errorMsg}</p>
      )}
      <Filter sessions={schedule?.sessions ?? []} onFilter={handleFilter} />
      <SimpleList sessions={filteredSessions} />
    </div>
  );
}

export default App;
