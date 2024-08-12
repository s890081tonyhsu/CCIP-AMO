import type { AmoSession } from '../../types/amo/schedule';

type SessionElementProps = {
  session: AmoSession;
};

function SessionElement({ session }: SessionElementProps) {
  return (
    <div className="row">
      <p className="time">{session.start.format('HH:mm')}</p>
      <p className="title">
        {session.title.zh.split('\\n').join('\n')}
      </p>
      <p className="speaker">
        {session.speakers.map(speaker => speaker.zh).join(',\n')}
      </p>
    </div>
  );
}

export default SessionElement;
