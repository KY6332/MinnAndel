import { useCallback, useEffect, useState } from 'react';
import { observeDocuments, observeList } from '../services/store';
import { useApp } from '../context/AppContext';

export default function useEntries(name) {
  const { role, demo } = useApp();
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [tick, setTick] = useState(0);
  const refresh = useCallback(() => setTick(n => n + 1), []);
  useEffect(() => {
    setError(null);
    const subscribe = name === 'documents' ? observeDocuments : (r, d, onData, onError) => observeList(name, d, onData, onError);
    return subscribe(role, demo, setItems, setError);
  }, [name, role, demo, tick]);
  return { items, error, refresh };
}
