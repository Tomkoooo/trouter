/**
 * Ez a hook lehetővé teszi a paraméterek dinamikus lekérdezését
 * akkor is, ha dinamikusan importált komponensekben használjuk.
 */
declare const useDynamicParams: () => Readonly<import('react-router-dom').Params<string>>;
export default useDynamicParams;
