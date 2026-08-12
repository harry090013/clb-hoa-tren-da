# Supabase Database Design

## 1. Nguyên tắc

Database dùng PostgreSQL trên Supabase.

Mục tiêu:
- Có thể bắt đầu nhỏ
- Dễ mở rộng
- Không thiết kế quá phức tạp
- Phục vụ nội dung public + admin sau này
- RLS từ khi có auth

## 2. Core tables

### `projects`

```sql
create table projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  cover_image text,
  location text,
  start_date date,
  end_date date,
  status text not null default 'draft',
  project_status text,
  target_amount numeric,
  received_amount numeric,
  spent_amount numeric,
  beneficiary_count integer,
  featured boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

`project_status` gợi ý:
- upcoming
- fundraising
- active
- completed
- paused

`status`:
- draft
- published
- archived

---

### `stories`

```sql
create table stories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  cover_image text,
  author_name text,
  story_type text,
  project_id uuid references projects(id) on delete set null,
  featured boolean not null default false,
  status text not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

---

### `team_members`

```sql
create table team_members (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  role text,
  department text,
  bio text,
  avatar_url text,
  display_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

---

### `partners`

```sql
create table partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  website_url text,
  description text,
  partner_type text,
  display_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

---

### `impact_stats`

```sql
create table impact_stats (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  label text not null,
  value numeric not null default 0,
  suffix text,
  display_order integer not null default 0,
  is_public boolean not null default true,
  updated_at timestamptz not null default now()
);
```

Ví dụ:
- projects_completed
- volunteers
- beneficiaries
- locations

Không điền số liệu giả vào production.

---

## 3. Transparency tables

### `financial_reports`

```sql
create table financial_reports (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  title text not null,
  report_year integer,
  total_received numeric not null default 0,
  total_spent numeric not null default 0,
  remaining_balance numeric generated always as (total_received - total_spent) stored,
  public_note text,
  status text not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### `financial_transactions`

```sql
create table financial_transactions (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references financial_reports(id) on delete cascade,
  transaction_date date not null,
  transaction_type text not null,
  category text,
  amount numeric not null check (amount >= 0),
  description text,
  receipt_url text,
  is_public boolean not null default true,
  created_at timestamptz not null default now()
);
```

`transaction_type`:
- income
- expense

Không public:
- số tài khoản người ủng hộ
- CCCD
- số điện thoại cá nhân
- dữ liệu nhạy cảm

---

## 4. Media

### `media`

```sql
create table media (
  id uuid primary key default gen_random_uuid(),
  file_url text not null,
  storage_path text,
  file_type text,
  alt_text text,
  caption text,
  project_id uuid references projects(id) on delete set null,
  story_id uuid references stories(id) on delete set null,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);
```

Storage bucket đề xuất:
- `public-images`
- `reports`
- `receipts`

Receipt bucket nên cân nhắc policy public/private tùy loại chứng từ.

---

## 5. Volunteer module

### `volunteer_applications`

```sql
create table volunteer_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text,
  phone text,
  birth_year integer,
  location text,
  skills text[],
  motivation text,
  availability text,
  status text not null default 'new',
  internal_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

Không public table này.

---

## 6. Partnership module

### `partnership_requests`

```sql
create table partnership_requests (
  id uuid primary key default gen_random_uuid(),
  organization_name text not null,
  contact_name text,
  email text,
  phone text,
  partnership_type text,
  message text,
  status text not null default 'new',
  internal_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

Không public table này.

---

## 7. Admin / audit

Supabase Auth quản lý user.

Có thể tạo:

### `profiles`

```sql
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'editor',
  active boolean not null default true,
  created_at timestamptz not null default now()
);
```

Role:
- admin
- editor
- finance
- viewer

## 8. RLS strategy

### Public read
Cho phép SELECT với:
- projects.status = 'published'
- stories.status = 'published'
- public reports
- active partners
- active team

### Admin write
Chỉ authenticated user có role phù hợp.

### Financial
- finance + admin được ghi
- public chỉ đọc những record có `is_public = true`

### Forms
- anonymous INSERT vào application/request
- không anonymous SELECT

## 9. Environment variables

Dự kiến:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Quy tắc:
- Service role key chỉ ở server
- Không đưa service role key vào client
- Không commit `.env.local`

## 10. Kết nối Supabase sau này

Khi user yêu cầu kết nối:

1. Tạo project Supabase
2. Lấy Project URL
3. Lấy anon key
4. Tạo `.env.local`
5. Cài `@supabase/supabase-js`
6. Tạo client/server helpers
7. Chạy migrations
8. Tạo Storage bucket
9. Thiết lập RLS
10. Seed dữ liệu
11. Test local
12. Thêm env vars vào Vercel
13. Redeploy

Không tự tạo hoặc yêu cầu secret nếu chưa đến giai đoạn này.
