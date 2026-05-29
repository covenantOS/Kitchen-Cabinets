interface Env { GOOGLE_MAPS_API_KEY: string }

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const url = new URL(request.url);
    const input = url.searchParams.get('input');
    if (!input) {
      return new Response(JSON.stringify({ predictions: [] }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${env.GOOGLE_MAPS_API_KEY}&components=country:us&types=address`;
    const resp = await fetch(apiUrl);
    const data = await resp.json();
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ predictions: [], error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
