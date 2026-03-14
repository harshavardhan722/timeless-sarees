
-- Indexes for sarees table (most queried)
CREATE INDEX IF NOT EXISTS idx_sarees_created_at ON public.sarees (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sarees_fabric ON public.sarees (fabric);
CREATE INDEX IF NOT EXISTS idx_sarees_occasion ON public.sarees (occasion);
CREATE INDEX IF NOT EXISTS idx_sarees_color ON public.sarees (color);
CREATE INDEX IF NOT EXISTS idx_sarees_price ON public.sarees (price);

-- Indexes for orders
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders (status);

-- Indexes for order_items
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items (order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_saree_id ON public.order_items (saree_id);
