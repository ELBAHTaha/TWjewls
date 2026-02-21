-- TW Jewls Checkout Schema + Migration (Supabase / PostgreSQL)
-- Run this entire script in Supabase SQL Editor.

create extension if not exists "uuid-ossp";

-- Target tables (fresh installs)
create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  phone text not null,
  city text not null,
  address text not null,
  note text,
  delivery_fee numeric not null check (delivery_fee >= 0),
  total_price numeric not null check (total_price >= 0),
  status text not null default 'pending',
  created_at timestamp with time zone not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text not null,
  quantity integer not null check (quantity > 0),
  price numeric not null check (price >= 0)
);

-- Migration for older schemas
do $$
begin
  -- orders: customer_name -> full_name
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'orders' and column_name = 'customer_name'
  ) then
    alter table public.orders add column if not exists full_name text;
    execute 'update public.orders set full_name = coalesce(full_name, customer_name)';
    -- Keep old column nullable to avoid blocking new inserts during transition.
    alter table public.orders alter column customer_name drop not null;
  end if;

  -- orders: total -> total_price
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'orders' and column_name = 'total'
  ) then
    alter table public.orders add column if not exists total_price numeric;
    execute 'update public.orders set total_price = coalesce(total_price, total)';
    alter table public.orders alter column total drop not null;
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'orders' and column_name = 'subtotal'
  ) then
    alter table public.orders alter column subtotal drop not null;
  end if;

  alter table public.orders add column if not exists note text;
  alter table public.orders alter column full_name set default '';
  update public.orders set full_name = '' where full_name is null;
  alter table public.orders alter column full_name set not null;

  alter table public.orders alter column total_price set default 0;
  update public.orders set total_price = 0 where total_price is null;
  alter table public.orders alter column total_price set not null;

  -- order_items: remove FK to products and switch product_id to text
  if exists (
    select 1
    from information_schema.table_constraints
    where table_schema = 'public'
      and table_name = 'order_items'
      and constraint_name = 'order_items_product_id_fkey'
  ) then
    alter table public.order_items drop constraint order_items_product_id_fkey;
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'order_items' and column_name = 'product_id' and udt_name = 'uuid'
  ) then
    alter table public.order_items alter column product_id type text using product_id::text;
  end if;
end $$;

create index if not exists idx_orders_created_at on public.orders(created_at desc);
create index if not exists idx_order_items_order_id on public.order_items(order_id);
create index if not exists idx_order_items_product_id on public.order_items(product_id);

-- Optional: force PostgREST schema cache refresh immediately.
select pg_notify('pgrst', 'reload schema');
