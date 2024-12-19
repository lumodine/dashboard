import {
  Banknote,
  Globe,
  FileImage,
  Palette,
  QrCode,
  Settings,
  SquareMenu,
  Megaphone,
  CaseSensitive,
  FileUser,
  ChartBar,
  MapPinHouse,
  Contact,
  Users,
  Tags,
} from "lucide-react";

export const MENUS = (id: string) => [
  {
    title: "Start settings",
    items: [
      {
        title: "Language settings",
        href: `/d/${id}/language-settings`,
        icon: Globe,
      },
      {
        title: "Currency settings",
        href: `/d/${id}/currency-settings`,
        icon: Banknote,
      },
    ],
  },
  {
    title: "Basic contents",
    items: [
      {
        title: "Menu",
        href: `/d/${id}/menu`,
        icon: SquareMenu,
      },
    ],
  },
  {
    title: "Other contents",
    items: [
      {
        title: "Tags",
        href: `/d/${id}/tags`,
        icon: Tags,
      },
      {
        title: "Announcements",
        href: `/d/${id}/announcements`,
        icon: Megaphone,
        isDisabled: true,
      },
    ],
  },
  {
    title: "Appearance",
    items: [
      {
        title: "Logo and background",
        href: `/d/${id}/images`,
        icon: FileImage,
      },
      {
        title: "Color palette",
        href: `/d/${id}/color-palette`,
        icon: Palette,
      },
      {
        title: "Font",
        href: `/d/${id}/font`,
        icon: CaseSensitive,
        isDisabled: true,
      },
    ],
  },
  {
    title: "Analytics",
    items: [
      {
        title: "Survey results",
        href: `/d/${id}/survey-results`,
        icon: FileUser,
        isDisabled: true,
      },
      {
        title: "Interaction reports",
        href: `/d/${id}/interaction-reports`,
        icon: ChartBar,
        isDisabled: true,
      },
    ],
  },
  {
    title: "Print",
    items: [
      {
        title: "QR code",
        href: `/d/${id}/qr-code`,
        icon: QrCode,
      },
    ],
  },
  {
    title: "Other settings",
    items: [
      {
        title: "Address",
        href: `/d/${id}/address`,
        icon: MapPinHouse,
        isDisabled: true,
      },
      {
        title: "Social media",
        href: `/d/${id}/social-media`,
        icon: Contact,
      },
      {
        title: "Users",
        href: `/d/${id}/users`,
        icon: Users,
      },
      {
        title: "General settings",
        href: `/d/${id}/general-settings`,
        icon: Settings,
      },
    ],
  },
];
