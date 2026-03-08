
-- Create storage bucket for saree images
INSERT INTO storage.buckets (id, name, public)
VALUES ('saree-images', 'saree-images', true);

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload saree images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'saree-images');

-- Allow anyone to view saree images (public bucket)
CREATE POLICY "Anyone can view saree images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'saree-images');

-- Allow authenticated users to update their uploads
CREATE POLICY "Authenticated users can update saree images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'saree-images');

-- Allow authenticated users to delete saree images
CREATE POLICY "Authenticated users can delete saree images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'saree-images');
