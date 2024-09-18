"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

function NavSearch() {
  const searchParams = useSearchParams();

  const { replace } = useRouter();
  const [search, setSearch] = useState(
    searchParams.get("search")?.toString() || ""
  );
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      // if there is a value, then we actually want to set the value of the "search" query to be equal to that value
      params.set("search", value);
    } else {
      // this means that the value is an empty string, so we don't not want the query "search" to sitting in our url, so we remove it.
      params.delete("search");
    }

    // console.log(params);
    // Now we navigate to or replace the url using the replace method by useRouter()
    replace(`/products?${params.toString()}`);
  }, 500);

  useEffect(() => {
    // We use this so that everytime we navigate to a certain page, we always reset the state back to an empty string since we don't have the searchParams, specifically the "search" query
    if (!searchParams.get("search")) {
      setSearch("");
    }
  }, [searchParams.get("search")]);

  return (
    <Input
      type="search"
      className="max-w-xs dark:bg-muted"
      placeholder="search product..."
      value={search}
      onChange={(e) => {
        const value = e.target.value;
        setSearch(value);
        handleSearch(value);
      }}
    />
  );
}
export default NavSearch;
