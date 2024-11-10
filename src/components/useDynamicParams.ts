// src/hooks/useDynamicParams.ts
import { useParams } from 'react-router-dom';

/**
 * Ez a hook lehetővé teszi a paraméterek dinamikus lekérdezését
 * akkor is, ha dinamikusan importált komponensekben használjuk.
 */
const useDynamicParams = () => {
  const params = useParams(); // Lekérdezi a route paramétereket a React Router-ből
  return params; // Visszaadja a paramétereket, mint objektumot
};

export default useDynamicParams;
