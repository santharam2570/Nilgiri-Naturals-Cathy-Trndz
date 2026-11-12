export const PHONE_DISPLAY = "73959 88203";
export const PHONE_E164 = "+917395988203";
export const BRAND = "Nilgiri Naturals";
export const PARTNER = "Cathy_Trndz";

export function whatsappLink(message: string) {
  return `https://wa.me/${PHONE_E164.replace("+", "")}?text=${encodeURIComponent(message)}`;
}

export type Registration = {
  id: "fssai" | "msme";
  name: string;
  shortLabel: string;
  authority: string;
  description: string;
};

export const REGISTRATIONS: Registration[] = [
  {
    id: "fssai",
    name: "FSSAI License",
    shortLabel: "FSSAI Licensed",
    authority: "Food Safety and Standards Authority of India",
    description: "Licensed for safe and hygienic handling of food products, including our Ooty Varkey and Homemade Chocolate.",
  },
  {
    id: "msme",
    name: "MSME License",
    shortLabel: "MSME Registered",
    authority: "Ministry of Micro, Small & Medium Enterprises, Govt. of India",
    description: "Recognised as a Micro, Small & Medium Enterprise by the Government of India.",
  },
];

export const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#story", label: "Our Story" },
  { href: "#products", label: "Products" },
  { href: "#remedy", label: "Find Your Remedy" },
  { href: "#gallery", label: "Gallery" },
  { href: "#faq", label: "FAQ" },
  { href: "#order", label: "Order" },
];
