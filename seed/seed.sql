drop table messages;

create table if not exists messages (
  id uuid default gen_random_uuid() primary key,
created_at timestamp with time zone default timezone('utc' :: text, now()) not null,
  email text,
  content text,
  user_id uuid references auth.users default auth.uid()
);

alter table
  messages enable row level security;

create policy "Everyone can insert a new messages." on messages for
insert
  with check (true);

create policy "Users can read their own messages" on messages for
select
  using (auth.uid() = user_id);

create policy "Users can update their own messages." on messages for
update
  using (auth.uid() = user_id);

drop table posts;

create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  category text default 'blog',
  title text,
  slug text,
  intro text,
  subtitle text,
  content text,
  image_url text,
  image_alt text,
  link_url text,
  link_text text,
  is_public boolean default false,
created_at timestamp with time zone default timezone('utc' :: text, now()) not null,
user_id uuid references auth.users default auth.uid()
);

alter table
  posts enable row level security;

create policy "Everyone can read public posts" on posts for
select
  using (is_public = true);

insert into
  posts (
    title,
    slug,
    subtitle,
    intro,
    content,
    is_public,
    category
  )
values
  (
    'test',
    'test',
    'subtitle',
    'intro',
    'content',
    true,
    'blog'
  ),
  (
    'test2',
    'test2',
    'subtitle2',
    'intro',
    'content',
    true,
    'blog'
  ),
  (
    'testb',
    'testb',
    'subtitleb',
    'intro',
    'content',
    true,
    'blog'
  ),
  (
    'testb2',
    'testb2',
    'subtitleb2',
    'intro',
    'content',
    true,
    'blog'
  );

drop table menuitems;

create table if not exists menuitems (
  id uuid default gen_random_uuid() primary key,
  category text default 'header',
  sort_index integer default 0,
  title text,
  link_url text,
  link_text text,
  is_public boolean default false,
  created_at timestamp with time zone default timezone('utc' :: text, now()) not null,
  user_id uuid references auth.users default auth.uid()
);

alter table
  menuitems enable row level security;

create policy "Everyone can read public menuitems" on menuitems for
select
  using (is_public = true);

insert into
  menuitems (
    category,
    sort_index,
    link_text,
    link_url,
    is_public
  )
values
('header', 0, 'Blog', '/blog', true),
('header', 1, 'Contact', '/contact', true),
('footer', 0, 'Blog', '/blog', true),
('footer', 1, 'Terms of Service', '/tos', true),
('footer', 2, 'Privacy Policy', '/privacy', true),
('footer', 3, 'Contact', '/contact', true);