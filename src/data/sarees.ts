import saree1 from "@/assets/saree-1.jpg";
import saree2 from "@/assets/saree-2.jpg";
import saree3 from "@/assets/saree-3.jpg";
import saree4 from "@/assets/saree-4.jpg";
import saree5 from "@/assets/saree-5.jpg";
import saree6 from "@/assets/saree-6.jpg";

export interface Saree {
  id: string;
  name: string;
  price: number;
  description: string;
  fabric: string;
  color: string;
  occasion: string;
  stock: number;
  blousePiece: boolean;
  images: string[];
  createdAt: string;
}

export const FABRICS = ["Silk", "Banarasi", "Chiffon", "Cotton", "Kanjeevaram", "Georgette", "Softskill", "Dola Silk", "Lenin Cotton", "Poornam", "Crape Silk", "Mysore Silk", "Semi Venkatagiri"];
export const COLORS = ["Maroon", "Blue", "Pink", "Green", "Purple", "Yellow", "Red", "Orange"];
export const OCCASIONS = ["Wedding", "Festival", "Party", "Casual", "Office", "Bridal"];

export const mockSarees: Saree[] = [
  {
    id: "1",
    name: "Royal Maroon Silk Saree",
    price: 8999,
    description: "Exquisite pure silk saree with rich golden zari border. Perfect for weddings and grand occasions. Features intricate weaving patterns inspired by traditional Indian motifs.",
    fabric: "Silk",
    color: "Maroon",
    occasion: "Wedding",
    stock: 12,
    blousePiece: true,
    images: [saree1],
    createdAt: "2025-12-01",
  },
  {
    id: "2",
    name: "Royal Blue Banarasi Saree",
    price: 12499,
    description: "Stunning Banarasi silk saree in royal blue with intricate gold weaving throughout. A masterpiece of Varanasi craftsmanship, ideal for special celebrations.",
    fabric: "Banarasi",
    color: "Blue",
    occasion: "Festival",
    stock: 8,
    blousePiece: true,
    images: [saree2],
    createdAt: "2025-12-05",
  },
  {
    id: "3",
    name: "Soft Pink Chiffon Saree",
    price: 4599,
    description: "Delicate chiffon saree in soft pink with silver embroidery border. Lightweight and elegant, perfect for parties and evening events.",
    fabric: "Chiffon",
    color: "Pink",
    occasion: "Party",
    stock: 20,
    blousePiece: false,
    images: [saree3],
    createdAt: "2025-12-10",
  },
  {
    id: "4",
    name: "Emerald Green Temple Border Saree",
    price: 6799,
    description: "Beautiful cotton silk saree in emerald green with golden temple border motifs. A blend of tradition and comfort for festive occasions.",
    fabric: "Cotton",
    color: "Green",
    occasion: "Festival",
    stock: 15,
    blousePiece: true,
    images: [saree4],
    createdAt: "2025-12-15",
  },
  {
    id: "5",
    name: "Purple Kanjeevaram Silk Saree",
    price: 15999,
    description: "Luxurious Kanjeevaram silk in rich purple with heavy gold zari work. The epitome of South Indian bridal elegance. Handwoven by master artisans.",
    fabric: "Kanjeevaram",
    color: "Purple",
    occasion: "Bridal",
    stock: 5,
    blousePiece: true,
    images: [saree5],
    createdAt: "2025-12-20",
  },
  {
    id: "6",
    name: "Mustard Yellow Georgette Saree",
    price: 5499,
    description: "Gorgeous georgette saree in mustard yellow with intricate hand embroidery. A vibrant choice for festive gatherings and celebrations.",
    fabric: "Georgette",
    color: "Yellow",
    occasion: "Festival",
    stock: 18,
    blousePiece: true,
    images: [saree6],
    createdAt: "2025-12-25",
  },
];
