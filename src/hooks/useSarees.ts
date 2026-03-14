import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Saree {
  id: string;
  name: string;
  price: number;
  description: string;
  fabric: string;
  color: string;
  occasion: string;
  stock: number;
  blouse_piece: boolean;
  images: string[];
  created_at: string;
}

export const FABRICS = ["Silk", "Banarasi", "Chiffon", "Cotton", "Kanjeevaram", "Georgette", "Softskill", "Dola Silk", "Lenin Cotton", "Poornam", "Crape Silk", "Mysore Silk", "Semi Venkatagiri"];
export const COLORS = ["Maroon", "Blue", "Pink", "Green", "Purple", "Yellow", "Red", "Orange"];
export const OCCASIONS = ["Wedding", "Festival", "Party", "Casual", "Office", "Bridal"];

export const useSarees = () => {
  return useQuery({
    queryKey: ["sarees"],
    queryFn: async (): Promise<Saree[]> => {
      const { data, error } = await supabase
        .from("sarees")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Saree[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes - avoid refetching on every mount
    gcTime: 10 * 60 * 1000, // 10 minutes garbage collection
  });
};

export const useSaree = (id: string | undefined) => {
  return useQuery({
    queryKey: ["saree", id],
    queryFn: async (): Promise<Saree | null> => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("sarees")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return data as Saree | null;
    },
    enabled: !!id,
  });
};

export const useCreateSaree = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (saree: Omit<Saree, "id" | "created_at">) => {
      const { data, error } = await supabase.from("sarees").insert(saree).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sarees"] }),
  });
};

export const useUpdateSaree = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Saree> & { id: string }) => {
      const { data, error } = await supabase.from("sarees").update(updates).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sarees"] }),
  });
};

export const useDeleteSaree = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      // Delete related order_items first to avoid foreign key constraint
      const { error: itemsError } = await supabase.from("order_items").delete().eq("saree_id", id);
      if (itemsError) throw itemsError;
      const { error } = await supabase.from("sarees").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sarees"] }),
  });
};
