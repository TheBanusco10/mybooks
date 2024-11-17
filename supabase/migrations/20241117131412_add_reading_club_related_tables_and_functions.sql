create sequence "public"."clubs_id_seq";

create sequence "public"."clubs_messages_id_seq";

create sequence "public"."reading_clubs_members_id_seq";

create table "public"."profiles" (
    "id" uuid not null,
    "email" text,
    "image_url" text,
    "username" text,
    "is_private" boolean not null default true
);


alter table "public"."profiles" enable row level security;

create table "public"."reading_clubs" (
    "id" integer not null default nextval('clubs_id_seq'::regclass),
    "name" text not null,
    "created_at" timestamp with time zone default now(),
    "user_id" uuid default auth.uid(),
    "is_private" boolean default true,
    "image" text,
    "description" text
);


alter table "public"."reading_clubs" enable row level security;

create table "public"."reading_clubs_members" (
    "id" integer not null default nextval('reading_clubs_members_id_seq'::regclass),
    "user_id" uuid not null,
    "club_id" integer,
    "created_at" timestamp with time zone default now()
);


alter table "public"."reading_clubs_members" enable row level security;

create table "public"."reading_clubs_messages" (
    "id" integer not null default nextval('clubs_messages_id_seq'::regclass),
    "user_id" uuid default auth.uid(),
    "content" text not null,
    "created_at" timestamp with time zone default now(),
    "club_id" integer
);


alter table "public"."reading_clubs_messages" enable row level security;

alter sequence "public"."clubs_id_seq" owned by "public"."reading_clubs"."id";

alter sequence "public"."clubs_messages_id_seq" owned by "public"."reading_clubs_messages"."id";

alter sequence "public"."reading_clubs_members_id_seq" owned by "public"."reading_clubs_members"."id";

CREATE UNIQUE INDEX clubs_messages_pkey ON public.reading_clubs_messages USING btree (id);

CREATE UNIQUE INDEX clubs_pkey ON public.reading_clubs USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX reading_clubs_members_pkey ON public.reading_clubs_members USING btree (id);

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."reading_clubs" add constraint "clubs_pkey" PRIMARY KEY using index "clubs_pkey";

alter table "public"."reading_clubs_members" add constraint "reading_clubs_members_pkey" PRIMARY KEY using index "reading_clubs_members_pkey";

alter table "public"."reading_clubs_messages" add constraint "clubs_messages_pkey" PRIMARY KEY using index "clubs_messages_pkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."reading_clubs" add constraint "clubs_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."reading_clubs" validate constraint "clubs_user_id_fkey";

alter table "public"."reading_clubs_members" add constraint "reading_clubs_members_club_id_fkey" FOREIGN KEY (club_id) REFERENCES reading_clubs(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."reading_clubs_members" validate constraint "reading_clubs_members_club_id_fkey";

alter table "public"."reading_clubs_members" add constraint "reading_clubs_members_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."reading_clubs_members" validate constraint "reading_clubs_members_user_id_fkey";

alter table "public"."reading_clubs_members" add constraint "reading_clubs_members_user_id_fkey1" FOREIGN KEY (user_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."reading_clubs_members" validate constraint "reading_clubs_members_user_id_fkey1";

alter table "public"."reading_clubs_messages" add constraint "reading_clubs_messages_club_id_fkey" FOREIGN KEY (club_id) REFERENCES reading_clubs(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."reading_clubs_messages" validate constraint "reading_clubs_messages_club_id_fkey";

alter table "public"."reading_clubs_messages" add constraint "reading_clubs_messages_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."reading_clubs_messages" validate constraint "reading_clubs_messages_user_id_fkey";

alter table "public"."reading_clubs_messages" add constraint "reading_clubs_messages_user_id_fkey1" FOREIGN KEY (user_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."reading_clubs_messages" validate constraint "reading_clubs_messages_user_id_fkey1";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  insert into public.profiles (id, email, image_url, username, is_private)
  values (new.id,
    new.email,
    COALESCE(new.raw_user_meta_data ->> 'image_url', ''),
    new.raw_user_meta_data ->> 'username',
    COALESCE((new.raw_user_meta_data ->> 'is_private')::boolean, TRUE));
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.sync_existing_users_to_profiles()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
  INSERT INTO public.profiles (id, email, image_url, username, is_private)
  SELECT
    id,
    email,
    COALESCE(raw_user_meta_data ->> 'image_url', ''),
    raw_user_meta_data ->> 'username',
    COALESCE((raw_user_meta_data ->> 'is_private')::boolean, TRUE)
  FROM auth.users
  ON CONFLICT (id) DO NOTHING;
END;$function$
;

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."reading_clubs" to "anon";

grant insert on table "public"."reading_clubs" to "anon";

grant references on table "public"."reading_clubs" to "anon";

grant select on table "public"."reading_clubs" to "anon";

grant trigger on table "public"."reading_clubs" to "anon";

grant truncate on table "public"."reading_clubs" to "anon";

grant update on table "public"."reading_clubs" to "anon";

grant delete on table "public"."reading_clubs" to "authenticated";

grant insert on table "public"."reading_clubs" to "authenticated";

grant references on table "public"."reading_clubs" to "authenticated";

grant select on table "public"."reading_clubs" to "authenticated";

grant trigger on table "public"."reading_clubs" to "authenticated";

grant truncate on table "public"."reading_clubs" to "authenticated";

grant update on table "public"."reading_clubs" to "authenticated";

grant delete on table "public"."reading_clubs" to "service_role";

grant insert on table "public"."reading_clubs" to "service_role";

grant references on table "public"."reading_clubs" to "service_role";

grant select on table "public"."reading_clubs" to "service_role";

grant trigger on table "public"."reading_clubs" to "service_role";

grant truncate on table "public"."reading_clubs" to "service_role";

grant update on table "public"."reading_clubs" to "service_role";

grant delete on table "public"."reading_clubs_members" to "anon";

grant insert on table "public"."reading_clubs_members" to "anon";

grant references on table "public"."reading_clubs_members" to "anon";

grant select on table "public"."reading_clubs_members" to "anon";

grant trigger on table "public"."reading_clubs_members" to "anon";

grant truncate on table "public"."reading_clubs_members" to "anon";

grant update on table "public"."reading_clubs_members" to "anon";

grant delete on table "public"."reading_clubs_members" to "authenticated";

grant insert on table "public"."reading_clubs_members" to "authenticated";

grant references on table "public"."reading_clubs_members" to "authenticated";

grant select on table "public"."reading_clubs_members" to "authenticated";

grant trigger on table "public"."reading_clubs_members" to "authenticated";

grant truncate on table "public"."reading_clubs_members" to "authenticated";

grant update on table "public"."reading_clubs_members" to "authenticated";

grant delete on table "public"."reading_clubs_members" to "service_role";

grant insert on table "public"."reading_clubs_members" to "service_role";

grant references on table "public"."reading_clubs_members" to "service_role";

grant select on table "public"."reading_clubs_members" to "service_role";

grant trigger on table "public"."reading_clubs_members" to "service_role";

grant truncate on table "public"."reading_clubs_members" to "service_role";

grant update on table "public"."reading_clubs_members" to "service_role";

grant delete on table "public"."reading_clubs_messages" to "anon";

grant insert on table "public"."reading_clubs_messages" to "anon";

grant references on table "public"."reading_clubs_messages" to "anon";

grant select on table "public"."reading_clubs_messages" to "anon";

grant trigger on table "public"."reading_clubs_messages" to "anon";

grant truncate on table "public"."reading_clubs_messages" to "anon";

grant update on table "public"."reading_clubs_messages" to "anon";

grant delete on table "public"."reading_clubs_messages" to "authenticated";

grant insert on table "public"."reading_clubs_messages" to "authenticated";

grant references on table "public"."reading_clubs_messages" to "authenticated";

grant select on table "public"."reading_clubs_messages" to "authenticated";

grant trigger on table "public"."reading_clubs_messages" to "authenticated";

grant truncate on table "public"."reading_clubs_messages" to "authenticated";

grant update on table "public"."reading_clubs_messages" to "authenticated";

grant delete on table "public"."reading_clubs_messages" to "service_role";

grant insert on table "public"."reading_clubs_messages" to "service_role";

grant references on table "public"."reading_clubs_messages" to "service_role";

grant select on table "public"."reading_clubs_messages" to "service_role";

grant trigger on table "public"."reading_clubs_messages" to "service_role";

grant truncate on table "public"."reading_clubs_messages" to "service_role";

grant update on table "public"."reading_clubs_messages" to "service_role";

create policy "Enable delete for users based on user_id"
on "public"."profiles"
as permissive
for delete
to authenticated
using ((( SELECT auth.uid() AS uid) = id));


create policy "Enable read access for all authenticated users"
on "public"."profiles"
as permissive
for select
to authenticated
using (true);


create policy "Enable update for users based on user_id"
on "public"."profiles"
as permissive
for update
to authenticated
using ((( SELECT auth.uid() AS uid) = id));


create policy "Enable delete for users based on user_id"
on "public"."reading_clubs"
as permissive
for delete
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable insert for authenticated users only"
on "public"."reading_clubs"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."reading_clubs"
as permissive
for select
to authenticated
using (true);


create policy "Enable update for users based on user_id"
on "public"."reading_clubs"
as permissive
for update
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable everything for authenticated users"
on "public"."reading_clubs_members"
as permissive
for all
to authenticated
using (true);


create policy "Enable everything for authenticated users"
on "public"."reading_clubs_messages"
as permissive
for all
to authenticated
using (true);