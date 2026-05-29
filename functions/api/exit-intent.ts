interface Env { GHL_WEBHOOK_CONTACT: string }

const SOURCE = 'tampa-kitchen-cabinets';
const BRAND = 'Tampa Kitchen Cabinets';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const payload = { source: SOURCE, ...body, brand: BRAND, source_final: SOURCE, leadType: 'exit-intent', receivedAt: new Date().toISOString() };
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
