import { useQuery } from "@tanstack/react-query";

const apiUrl = "https://catch-dev-api.astro.umd.edu/";

async function fetchFromAPI(route) {
  const url = `${apiUrl}/${route}`;
  console.log("fetching", url);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error fetching route: ${route}.`);
  }

  return response.json();
}

export function useStatusQueue() {
  return useQuery({
    queryKey: ["status/queue"],
    queryFn: () => fetchFromAPI("status/queue"),
  });
}

export function useStatusUpdates() {
  return useQuery({
    queryKey: ["status/updates"],
    queryFn: () => fetchFromAPI("status/updates"),
  });
}

export function useStatusQueries() {
  return useQuery({
    queryKey: ["status/queries"],
    queryFn: () => fetchFromAPI("status/queries"),
  });
}

export function useStatusSources() {
  return useQuery({
    queryKey: ["status/sources"],
    queryFn: () => fetchFromAPI("status/sources"),
  });
}
