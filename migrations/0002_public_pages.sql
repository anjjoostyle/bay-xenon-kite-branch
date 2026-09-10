create table if not exists public_pages (
  key text primary key,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);
