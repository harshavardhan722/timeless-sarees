import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface OrderInput {
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  total_price: number;
  items: { saree_id: string; quantity: number; price: number }[];
}

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async (order: OrderInput) => {
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_name: order.customer_name,
          customer_phone: order.customer_phone,
          customer_address: order.customer_address,
          total_price: order.total_price,
        })
        .select()
        .single();
      if (orderError) throw orderError;

      const orderItems = order.items.map((item) => ({
        order_id: orderData.id,
        saree_id: item.saree_id,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
      if (itemsError) throw itemsError;

      return orderData;
    },
  });
};
