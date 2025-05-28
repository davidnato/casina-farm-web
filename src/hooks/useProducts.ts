
interface Product {
  id: string;
  name: string;
  category: string;
  sizes: {
    size: string;
    price: number;
  }[];
}

export const useProducts = () => {
  const products: Product[] = [
    {
      id: "mangrove-honey",
      name: "Mangrove Honey",
      category: "Honey",
      sizes: [
        { size: "380g", price: 500 },
        { size: "660g", price: 1000 },
        { size: "1kg", price: 1500 }
      ]
    },
    {
      id: "terrestrial-honey",
      name: "Terrestrial Honey", 
      category: "Honey",
      sizes: [
        { size: "380g", price: 400 },
        { size: "660g", price: 700 },
        { size: "1kg", price: 1000 }
      ]
    },
    {
      id: "hibiscus-petals",
      name: "Hibiscus Dried Petals",
      category: "Natural Products",
      sizes: [
        { size: "100g", price: 550 }
      ]
    },
    {
      id: "seaweed-shampoo",
      name: "Seaweed Shampoo",
      category: "Seaweed Products",
      sizes: [
        { size: "300ml", price: 400 }
      ]
    },
    {
      id: "seaweed-hair-food",
      name: "Seaweed Hair Food",
      category: "Seaweed Products",
      sizes: [
        { size: "250ml", price: 300 }
      ]
    },
    {
      id: "seaweed-shower-gel",
      name: "Seaweed Shower Gel",
      category: "Seaweed Products",
      sizes: [
        { size: "300ml", price: 400 }
      ]
    },
    {
      id: "seaweed-body-lotion",
      name: "Seaweed Body Lotion",
      category: "Seaweed Products",
      sizes: [
        { size: "250ml", price: 350 }
      ]
    },
    {
      id: "seaweed-bar-soap",
      name: "Seaweed Bar Soap",
      category: "Seaweed Products",
      sizes: [
        { size: "100g", price: 250 }
      ]
    }
  ];

  return { products };
};
