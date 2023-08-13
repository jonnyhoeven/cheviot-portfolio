drop table if exists messages;

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

drop table if exists posts;

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

drop table if exists menuitems;

create table if not exists menuitems (
  id uuid default gen_random_uuid() primary key,
  category text default 'header',
  sort_index integer default 0,
icon text,
title text,
  link_text text,
link_url text,
link_target text,
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
icon,
    link_text,
    link_url,
link_target,
    is_public
  )
values
(
  'header',
  0,
  'FaGithub',
  'GitHub',
  'https://www.github.com/jonnyhoeven',
  '_blank',
  true
),
(
  'header',
  1,
  'FaCodepen',
  'CodePen',
  'https://codepen.io/jonnyhoeven',
  '_blank',
  true
),
(
  'header',
  1,
  'FaYoutube',
  'YouTube',
  'https://www.youtube.com/@JonnyHoeven/playlists',
  '_blank',
  true
),
('footer', 0, null, 'Blog', '/blog', null, true),
(
  'footer',
  1,
  null,
  'Contact',
  '/contact',
  null,
  true
),
(
  'footer',
  2,
  null,
  'Terms of Service',
  '/tos',
  null,
  true
),
(
  'footer',
  3,
  null,
  'Privacy Policy',
  '/privacy',
  null,
  true
),
(
  'footer',
  4,
  null,
  'Contact',
  '/contact',
  null,
  true
);

drop table if exists strings;

create table if not exists strings (
  id uuid default gen_random_uuid () primary key,
  string_name text,
  string_value text,
  is_public boolean default false,
  created_at timestamp with time zone default timezone ('utc' :: text, now()) not null,
  user_id uuid references auth.users default auth.uid ()
);

alter table
  strings enable row level security;

create policy "Everyone can read public strings" on strings for
select
  using (is_public = true);

insert into
  strings (string_name, string_value, is_public)
values
  ('site_name', 'Justme.dev', true),
  ('mail_text', 'jonny@justme.dev', true),
  ('mail_link', 'mailto:jonny@justme.dev', true);