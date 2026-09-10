import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const pageInput = z.object({
  key: z.string().min(1).max(120),
  payload: z.unknown(),
});

const keyInput = z.object({
  key: z.string().min(1).max(120),
});

export const putPublicPage = createServerFn({ method: "POST" })
  .validator(pageInput)
  .handler(async ({ data }) => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const body = JSON.stringify(data.payload);
    await sql.query(
      `insert into public_pages (key, payload, updated_at)
       values ($1, $2::jsonb, now())
       on conflict (key) do update
         set payload = excluded.payload,
             updated_at = now()`,
      [data.key, body],
    );
    return { ok: true as const };
  });

export const getPublicPage = createServerFn({ method: "GET" })
  .validator(keyInput)
  .handler(async ({ data }) => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql.query<{ payload: unknown }>(
      "select payload from public_pages where key = $1 limit 1",
      [data.key],
    );
    return rows[0]?.payload ?? null;
  });
