import { useEffect, useState } from "react";

export const useFetch = (baseUrl, params) => {
  const [data, setData] = useState(null);
  const [pages, setPages] = useState(null);
  const [error, setError] = useState(null);

  // if params is object returns baseUrl+query, if params is id-number adds id to baseUrl
  const makeUrl = (baseUrl, params) => {
    const keys = Object.keys(params);
    let query = "";
    for (let i = 0; i < keys.length; i++) {
      let value = params[keys[i]];
      if (value) {
        query = query + "&" + keys[i] + "=" + value;
      }
    }
    return baseUrl + query;
  };

  useEffect(() => {
    let ignore = false;
    const url = makeUrl(baseUrl, params);
    async function fetchCharacters() {
      try {
        const response = await fetch(url);
        const json = await response.json();
        if (!ignore) {
          json && setData(json.results);
          json.info && setPages(json.info.pages);
        }
      } catch (err) {
        setError(err.message);
      }
    }

    fetchCharacters();
    return () => {
      ignore = true;
    };
  }, [baseUrl, params]);

  return { data, pages, error };
};
