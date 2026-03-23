-- Add editor role to app_role enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'editor';

-- Allow authenticated users to view their own roles
-- (editors need to read their own role to determine access level)
CREATE POLICY "Users can view own role" ON public.user_roles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Allow editors to update site_content (covers the About section fields)
CREATE POLICY "Editors can update site content" ON public.site_content
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Editors can insert site content" ON public.site_content
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'editor'));

-- Allow editors to manage works (Portfolio section)
CREATE POLICY "Editors can insert works" ON public.works
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Editors can update works" ON public.works
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Editors can delete works" ON public.works
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'editor'));
