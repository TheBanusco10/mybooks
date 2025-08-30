alter table "public"."profiles" add column "achievements" text[] not null default '{}'::text[];

alter table "public"."profiles" add column "created_at" timestamp with time zone not null default now();

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$begin
  insert into public.profiles (id, email, image_url, username, is_private, settings, created_at)
  values (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data ->> 'image_url', ''),
    new.raw_user_meta_data ->> 'username',
    COALESCE((new.raw_user_meta_data ->> 'is_private')::boolean, TRUE),
    COALESCE(
      (new.raw_user_meta_data ->> 'settings')::jsonb,
      '{}'::jsonb
    ),
    new.created_at
  );
  return new;
end;$function$
;