
-- Sarees table
CREATE TABLE public.sarees (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  fabric TEXT NOT NULL,
  color TEXT NOT NULL,
  occasion TEXT NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  blouse_piece BOOLEAN NOT NULL DEFAULT true,
  images TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  total_price NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Order items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  saree_id UUID REFERENCES public.sarees(id) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  price NUMERIC NOT NULL
);

-- RLS
ALTER TABLE public.sarees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Sarees: public read
CREATE POLICY "Anyone can read sarees" ON public.sarees FOR SELECT USING (true);

-- Orders: anyone can insert (no auth yet)
CREATE POLICY "Anyone can create orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read orders" ON public.orders FOR SELECT USING (true);

-- Order items: anyone can insert/read
CREATE POLICY "Anyone can create order items" ON public.order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read order items" ON public.order_items FOR SELECT USING (true);

-- Admin operations on sarees (open for now, should be secured with auth later)
CREATE POLICY "Anyone can insert sarees" ON public.sarees FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update sarees" ON public.sarees FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can delete sarees" ON public.sarees FOR DELETE USING (true);
