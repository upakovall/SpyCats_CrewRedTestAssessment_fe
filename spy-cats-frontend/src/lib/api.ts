// lib/api.ts
export type Cat = {
  id: number;
  name: string;
  years_of_experience: number;
  breed: string;
  salary: number;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

type ApiError = {
  status: number;
  message: string;
};

async function parseError(res: Response): Promise<ApiError> {
  let message = `HTTP ${res.status}`;
  try {
    const ct = res.headers.get("content-type") ?? "";
    if (ct.includes("application/json")) {
      const j = await res.json();
      // FastAPI often returns {detail: ...}
      if (typeof j?.detail === "string") message = j.detail;
      else if (Array.isArray(j?.detail)) message = JSON.stringify(j.detail, null, 2);
      else message = JSON.stringify(j, null, 2);
    } else {
      const t = await res.text();
      if (t) message = t;
    }
  } catch {
    // ignore
  }
  return { status: res.status, message };
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await parseError(res);
    throw new Error(err.message);
  }

  // DELETE 204
  if (res.status === 204) return undefined as T;

  return (await res.json()) as T;
}
