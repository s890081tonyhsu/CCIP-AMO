import { useRef } from 'react';

import type { AmoSession } from '../../types/amo/schedule';
import { downloadSVG } from '../../adapters/SvgExport';
import SessionElement from './SessionElement';

import './styles.css';

type SimpleListProps = {
  sessions: AmoSession[];
}

function SimpleList({ sessions }: SimpleListProps) {
  const domRef = useRef(null);

  const handleDownload = () => {
    if (!domRef.current) return;
    downloadSVG(domRef.current);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleDownload}
        disabled={sessions.length === 0}
      >
        Download SVG
      </button>
      <div ref={domRef} className="simplelist">
        {sessions.map((session) => (
          <SessionElement key={session.id} session={session} />
        ))}
      </div>
    </>
  );
}

export default SimpleList;
