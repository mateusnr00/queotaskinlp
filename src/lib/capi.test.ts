import { ipDoVisitante, lerPedido, montarEvento, sha256 } from "@/lib/capi";

const HOST = "www.queotaskin.vip";
// O evento montado, do jeito que o teste lê.
type Evento = {
  event_name: string;
  event_id: string;
  action_source: string;
  user_data: { fbc?: string; external_id?: string[] };
  custom_data?: Record<string, string>;
};

const base = { evento: "Lead", id: "3f2b6c1e-aaaa-bbbb", url: `https://${HOST}/?fbclid=X` };

describe("API de Conversões", () => {
  it("aceita só os eventos e a página certos", () => {
    expect(lerPedido(base, HOST)).not.toBeNull();
    expect(lerPedido({ ...base, evento: "Purchase" }, HOST)).toBeNull();
    expect(lerPedido({ ...base, id: "curto" }, HOST)).toBeNull();
    expect(lerPedido({ ...base, url: "https://outro.site/" }, HOST)).toBeNull();
    expect(lerPedido({ ...base, origem: "<script>" }, HOST)?.origem).toBeUndefined();
  });

  it("pega o IP do visitante, não o do proxy", () => {
    expect(ipDoVisitante("2804:abcd::1, 10.0.0.1", null)).toBe("2804:abcd::1");
    expect(ipDoVisitante(null, "189.1.2.3")).toBe("189.1.2.3");
    expect(ipDoVisitante(null, null)).toBeUndefined();
  });

  it("monta o evento com dedup, fbc do fbclid e external_id em sha256", () => {
    const pedido = lerPedido({ ...base, origem: "hero", fbclid: "IwAR123" }, HOST)!;
    const corpo = montarEvento(pedido, {
      ip: "2804:abcd::1",
      userAgent: "UA",
      fbp: "fb.1.1.2",
      externalId: "Visitante-1",
      agora: 1_700_000_000,
    });
    const e = corpo.data[0] as unknown as Evento;
    expect(e.event_name).toBe("Lead");
    expect(e.event_id).toBe(base.id);
    expect(e.action_source).toBe("website");
    expect(e.user_data.fbc).toBe("fb.1.1700000000000.IwAR123");
    expect(e.user_data.external_id).toEqual([sha256("visitante-1")]);
    expect(e.user_data.external_id?.[0]).toMatch(/^[a-f0-9]{64}$/);
    expect(e.custom_data).toEqual({ content_name: "grupo_whatsapp", origem: "hero" });
    expect(corpo).not.toHaveProperty("test_event_code");
  });

  it("prefere o cookie _fbc ao fbclid", () => {
    const pedido = lerPedido({ ...base, fbclid: "IwAR123" }, HOST)!;
    const e = montarEvento(pedido, { fbc: "fb.1.9.cookie", agora: 1 }).data[0] as unknown as Evento;
    expect(e.user_data.fbc).toBe("fb.1.9.cookie");
  });
});
