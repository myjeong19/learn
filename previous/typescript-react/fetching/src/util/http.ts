export async function get(url) {
  const response = await fetch(url, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data.');
  }

  const data = (await response.json()) as unknown;
  return data;
}
