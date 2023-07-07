/*drop table messages;*/
create table if not exists messages (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  email text,
  content text,
  user_id uuid references auth.users default auth.uid()
);

alter table messages
  enable row level security;
create policy "Everyone can insert a new messages."
  on messages for insert with check ( true );
create policy "Users can read their own messages" 
  on messages for select using ( auth.uid() = user_id);
create policy "Users can update their own messages."
  on messages for update using ( auth.uid() = user_id );

create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  category text default 'post',
  title text,
  content text,
  image_url text,
  image_alt text,
  link_url text,
  link_text text,
  is_public boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users default auth.uid()
);

alter table posts
  enable row level security;
create policy "Everyone can read public posts" on posts
 for select using (is_public = true);

insert into posts (title, content, is_public, category) 
values
('test', 'content', 'true', 'timeline'),
('test2', 'content2', 'true', 'timeline')
;