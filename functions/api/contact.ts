interface Env { GHL_WEBHOOK_CONTACT: string }

// Source tag used for lead attribution. Keep in sync with src/data/site.json -> formSource.
const SOURCE = 'tampa-kitchen-cabinets';
const BRAND = 'Tampa Kitchen Cabinets';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    // Stamp attribution server-side so every lead is tagged even if the client omits it.
    const payload = { source: SOURCE, ...body, brand: BRAND, source_final: SOURCE, receivedAt: new Date().toISOString() };
    if (!env.GHL_WEBHOOK_CONTACT) throw new Error('GHL_WEBHOOK_CONTACT not configured');
    const resp = await fetch(env.GHL_WEBHOOK_CONTACT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!resp.ok) throw new Error(`GHL ${resp.status}`);
    return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
