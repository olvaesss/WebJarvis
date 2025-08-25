import { useEffect, useState } from 'react';

export default function App() {
  const [ping, setPing] = useState<string>('...');
  const [q, setQ] = useState('');
  const [a, setA] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:3001/api/ping')
      .then(r => r.json())
      .then(d => setPing(JSON.stringify(d)))
      .catch(e => setPing(String(e)));
  }, []);

  async function ask() {
    const r = await fetch('http://localhost:3001/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q })
    });
    const d = await r.json();
    setA(d.a);
  }

  return (
    <div style={{padding: 24, fontFamily: 'sans-serif'}}>
      <h1>WebJarvis</h1>
      <p>Ping: {ping}</p>
      <div style={{display:'flex', gap:8}}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Спросите что-нибудь" />
        <button onClick={ask}>Спросить</button>
      </div>
      {a && <p>Ответ: {a}</p>}
    </div>
  );
}
