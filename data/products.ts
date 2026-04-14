export type Category = "desk" | "chair" | "monitor" | "lamp" | "accessory";

export interface Product {
  id: string;
  name: string;
  category: Category;
  pricePerWeek: number;
  image: string;
  description: string;
}

export const products: Product[] = [
  // Desks
  {
    id: "electric-desk",
    name: "Electric Adjustable Desk",
    category: "desk",
    pricePerWeek: 6,
    image: "https://strapi.monis.rent/uploads/desk_titel_new_3db151d44c.jpg",
    description: "Electric height 70–118cm, sit-stand ergonomic design",
  },
  {
    id: "mechanical-desk",
    name: "Mechanical Adjustable Desk",
    category: "desk",
    pricePerWeek: 7,
    image: "https://strapi.monis.rent/uploads/Mechanical_Adjustable_Desk_front_new_a83b8077b0.jpg",
    description: "Manual height 70–120cm, no electricity needed",
  },

  // Chairs
  {
    id: "ergonomic-chair",
    name: "Ergonomic Office Chair",
    category: "chair",
    pricePerWeek: 7,
    image: "https://strapi.monis.rent/uploads/fantech_oca259s_chair_6_b632a0c529.jpg",
    description: "Mesh back, 4D armrests, lumbar support, reclining",
  },
  {
    id: "gaming-chair",
    name: "Gaming Chair Pro",
    category: "chair",
    pricePerWeek: 9,
    image: "https://strapi.monis.rent/uploads/fantech_oca259s_chair_6_b632a0c529.jpg",
    description: "Racing-style, high backrest, adjustable headrest",
  },

  // Monitors
  {
    id: "monitor-24-fhd",
    name: '24" Full HD Monitor',
    category: "monitor",
    pricePerWeek: 6,
    image: "https://strapi.monis.rent/uploads/24_Full_HD_Office_Monitor_A24i_1_7f987306af.jpg",
    description: "100Hz IPS, 1920×1080, 99% sRGB",
  },
  {
    id: "monitor-27-4k",
    name: '27" 4K Multimedia Monitor',
    category: "monitor",
    pricePerWeek: 12,
    image: "https://strapi.monis.rent/uploads/27_4_K_A27_U_Multitasking_Monitor_1_ce29d15357.jpg",
    description: "4K 3840×2160, USB-C, 100% sRGB, HDR",
  },
  {
    id: "monitor-34-curved",
    name: '34" Curved Gaming Monitor',
    category: "monitor",
    pricePerWeek: 19,
    image: "https://strapi.monis.rent/uploads/34_4_K_Gaming_Monitor_7_3f6b2ba627.jpg",
    description: "180Hz curved WQHD, 1ms response, DCI-P3 95%",
  },
  {
    id: "monitor-apple",
    name: '27" Apple Studio Display',
    category: "monitor",
    pricePerWeek: 75,
    image: "https://strapi.monis.rent/uploads/Apple_Studio_Display_6_94c6329a05.jpg",
    description: "5K Retina, 600 nits, True Tone, Thunderbolt 3",
  },

  // Lamps
  {
    id: "desk-lamp",
    name: "Smart LED Desk Lamp",
    category: "lamp",
    pricePerWeek: 3,
    image: "https://strapi.monis.rent/uploads/Xiaomi_Mi_Led_Desk_Lamp_1_S_10_3777ddd163.jpg",
    description: "Wi-Fi smart, 4 modes, 2600–5000K, voice control",
  },
  {
    id: "hue-lamp",
    name: "Hue Signe Gradient Lamp",
    category: "lamp",
    pricePerWeek: 8,
    image: "https://strapi.monis.rent/uploads/Philips_Hue_Signe_gradient_table_lamp_new_e4eeba8c56.jpg",
    description: "Multicolour gradient, Bluetooth & Zigbee, Alexa/Google",
  },

  // Accessories
  {
    id: "logitech-keyboard",
    name: "Logitech MX Keyboard",
    category: "accessory",
    pricePerWeek: 6,
    image: "https://strapi.monis.rent/uploads/Logitech_MX_keys_1_9977480ae1.jpg",
    description: "Wireless, Easy-Switch 3 devices, 5-month battery",
  },
  {
    id: "logitech-mouse",
    name: "Logitech MX Master Mouse",
    category: "accessory",
    pricePerWeek: 3,
    image: "https://strapi.monis.rent/uploads/Logitech_S3_6_4cf1e523b8.jpg",
    description: "8000 DPI, ergonomic, 70-day battery",
  },
  {
    id: "monitor-light-bar",
    name: "Monitor Light Bar",
    category: "accessory",
    pricePerWeek: 5,
    image: "https://strapi.monis.rent/uploads/Monitor_Light_Bar_1_8e97972171.jpg",
    description: "Dimmable, 2700–6500K, Ra95, magnetic rotation",
  },
  {
    id: "webcam",
    name: "Logitech 4K Webcam",
    category: "accessory",
    pricePerWeek: 6,
    image: "https://strapi.monis.rent/uploads/Logitech_Brio_4_K_Webcam_6_d7ea7e69b0.jpg",
    description: "4K 60fps, 5x zoom, noise-canceling mic",
  },
  {
    id: "laptop-stand",
    name: "Ergonomic Laptop Stand",
    category: "accessory",
    pricePerWeek: 2,
    image: "https://strapi.monis.rent/uploads/Laptop_stand_back_new2_91df29c3c8.jpg",
    description: "Fits 10–17\" laptops, adjustable angle",
  },
];

export const desks = products.filter((p) => p.category === "desk");
export const chairs = products.filter((p) => p.category === "chair");
export const accessories = products.filter(
  (p) => p.category === "monitor" || p.category === "lamp" || p.category === "accessory"
);
