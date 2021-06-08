import qs from "query-string";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const useQuery = (): Hash => {
  const location = useLocation();
  const parsed = qs.parse(location.search);
  const [query, setQuery] = useState<Hash>(parsed as any);

  useEffect(() => {
    const parsed = qs.parse(location.search);
    setQuery(parsed as any);
  }, [location]);

  return query;
};

export default useQuery;
