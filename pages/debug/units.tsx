import { useEffect, useState } from "react";

export default function UnitsDebug() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/health")
      .then(r => r.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (error) return <pre>ERROR</pre>;
  if (loading) return <pre>Loading…</pre>;
  return (
    <main style={{padding:20}}>
      <h1>Health — Units</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
