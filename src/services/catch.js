import { useQuery } from "@tanstack/react-query";

async function fetchFromAPI(apiUrl, route) {
  const url = `${apiUrl}/${route}`;
  console.log("fetching", url);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error fetching route: ${route}.`);
  }

  return response.json();
}

export function useStatusQueue(apiUrl) {
  return useQuery({
    queryKey: [apiUrl, "status/queue"],
    queryFn: () => fetchFromAPI(apiUrl, "status/queue"),
  });
}

export function useStatusUpdates(apiUrl) {
  return useQuery({
    queryKey: [apiUrl, "status/updates"],
    queryFn: () => fetchFromAPI(apiUrl, "status/updates"),
  });
}

export function useStatusQueries(apiUrl) {
  return useQuery({
    queryKey: [apiUrl, "status/queries"],
    queryFn: () => fetchFromAPI(apiUrl, "status/queries"),
  });
}

export function useStatusSources(apiUrl) {
  return useQuery({
    queryKey: [apiUrl, "status/sources"],
    queryFn: () => fetchFromAPI(apiUrl, "status/sources"),
  });
}
