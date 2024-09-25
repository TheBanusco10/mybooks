set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_top_categories(limit_num integer DEFAULT 5)
 RETURNS TABLE(category text, count bigint)
 LANGUAGE sql
AS $function$
  SELECT unnest(categories) as category, COUNT(*) as count
  FROM books
  GROUP BY category
  ORDER BY count DESC
  LIMIT limit_num;
$function$
;
