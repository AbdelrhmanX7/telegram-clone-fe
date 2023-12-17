import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";

export const useSearch = (debounceDelay = 500) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, debounceDelay);
  const [isSearching, setIsSearching] = useState(false);
  useEffect(() => {
    setIsSearching(true);
  }, [debouncedSearchTerm]);

  return {
    searchTerm,
    debouncedSearchTerm,
    isSearching,
    setIsSearching,
    setSearchTerm,
  };
};
