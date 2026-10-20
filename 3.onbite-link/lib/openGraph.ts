import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

export type OpenGraphData = {
  url: string;
  title: string;
  description: string;
  thumbnail: string | null;
};

const MAX_REDIRECTS = 3;
const MAX_BODY_BYTES = 1_000_000;
const TIMEOUT_MS = 8000;

function isPrivateAddress(address: string): boolean {
  if (isIP(address) === 4) {
    const [a, b] = address.split(".").map(Number);
    return (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168)
    );
  }
  const v6 = address.toLowerCase();
  if (v6.startsWith("::ffff:")) return isPrivateAddress(v6.slice(7));
  return (
    v6 === "::1" || v6 === "::" || v6.startsWith("fc") || v6.startsWith("fd") || v6.startsWith("fe80")
  );
}

// 서버가 내부망으로 요청을 보내는 것(SSRF)을 막기 위해 http(s) 외부 주소만 허용
async function assertPublicHttpUrl(url: URL) {
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("http(s) 링크만 지원합니다.");
  }
  const { address } = await lookup(url.hostname);
  if (isPrivateAddress(address)) {
    throw new Error("허용되지 않는 주소입니다.");
  }
}

async function fetchHtml(startUrl: URL): Promise<{ html: string; finalUrl: URL }> {
  let current = startUrl;
  for (let i = 0; i <= MAX_REDIRECTS; i++) {
    await assertPublicHttpUrl(current);
    const res = await fetch(current, {
      redirect: "manual",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; OneBiteLinkBot/1.0)",
        accept: "text/html,application/xhtml+xml",
      },
    });

    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get("location");
      if (!location) throw new Error("잘못된 리다이렉트입니다.");
      current = new URL(location, current);
      continue;
    }
    if (!res.ok) throw new Error(`페이지를 가져오지 못했습니다. (${res.status})`);

    const text = await res.text();
    return { html: text.slice(0, MAX_BODY_BYTES), finalUrl: current };
  }
  throw new Error("리다이렉트가 너무 많습니다.");
}

function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .trim();
}

function getMeta(html: string, keys: string[]): string | null {
  for (const tag of html.match(/<meta\s[^>]*>/gi) ?? []) {
    const key = /(?:property|name)\s*=\s*["']([^"']+)["']/i.exec(tag)?.[1]?.toLowerCase();
    if (!key || !keys.includes(key)) continue;
    const content = /content\s*=\s*(?:"([^"]*)"|'([^']*)')/i.exec(tag);
    const value = content?.[1] ?? content?.[2];
    if (value) return decodeEntities(value);
  }
  return null;
}

function toAbsolute(value: string | null, base: URL): string | null {
  if (!value) return null;
  try {
    const resolved = new URL(value, base);
    return resolved.protocol === "http:" || resolved.protocol === "https:"
      ? resolved.toString()
      : null;
  } catch {
    return null;
  }
}

export async function extractOpenGraph(rawUrl: string): Promise<OpenGraphData> {
  const { html, finalUrl } = await fetchHtml(new URL(rawUrl));

  const titleTag = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1];
  const title =
    getMeta(html, ["og:title", "twitter:title"]) ??
    (titleTag ? decodeEntities(titleTag) : "");

  return {
    url: rawUrl,
    title: title || finalUrl.hostname,
    description: getMeta(html, ["og:description", "twitter:description", "description"]) ?? "",
    thumbnail: toAbsolute(getMeta(html, ["og:image", "twitter:image"]), finalUrl),
  };
}
