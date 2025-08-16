alter table "public"."profiles" add column "settings" jsonb not null default '{}'::jsonb;

alter table "public"."profiles" alter column "email" set not null;

alter table "public"."profiles" alter column "username" set not null;

CREATE UNIQUE INDEX profiles_username_key ON public.profiles USING btree (username);

alter table "public"."profiles" add constraint "profiles_username_key" UNIQUE using index "profiles_username_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$begin
  insert into public.profiles (id, email, image_url, username, is_private, settings)
  values (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data ->> 'image_url', ''),
    new.raw_user_meta_data ->> 'username',
    COALESCE((new.raw_user_meta_data ->> 'is_private')::boolean, TRUE),
    COALESCE(
      (new.raw_user_meta_data ->> 'settings')::jsonb,
      '{}'::jsonb
    )
  );
  return new;
end;$function$
;