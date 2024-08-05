import { ChangeEvent, useState } from 'react';

import './assets/css/App.css';
import type { Schedule } from './types/schedule';

function App() {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [schedule, setSchedule] = useState<Schedule | null>(null);

  const handleReadfile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const content = await file.text();
      const nextSchedule = JSON.parse(content) as Schedule;
      setSchedule(nextSchedule);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      }
    }
  };

  return (
    <div>
      <h1>Agenda</h1>
      <input type="file" onChange={handleReadfile} />
      {errorMsg && (
        <p style={{ color: 'red' }}>{errorMsg}</p>
      )}
      <pre>{JSON.stringify(schedule, null, 2)}</pre>
    </div>
  );
}

export default App;
