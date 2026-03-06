-- Collection table
create table if not exists collection (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users not null,
  google_book_id text not null,
  title         text not null,
  author        text,
  cover_url     text,
  status        text check (status in ('to_read','reading','read')) default 'to_read',
  rating        int2 check (rating between 1 and 5),
  notes         text,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- Prevent duplicates per user
create unique index if not exists collection_user_book_unique
  on collection (user_id, google_book_id);

-- Row Level Security
alter table collection enable row level security;

create policy "Users manage their own collection"
  on collection for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
