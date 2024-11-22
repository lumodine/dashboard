import {
    Banknote,
    Boxes,
    Languages,
    Menu,
    Palette,
    QrCode,
    Settings,
} from "lucide-react";

export const MENUS = (id: string) => [
    {
        title: "content",
        items: [
            {
                title: "units",
                href: `/d/${id}/units`,
                icon: Boxes,
            },
            {
                title: "menu",
                href: `/d/${id}/menu`,
                icon: Menu,
            },
        ],
    },
    {
        title: "design",
        items: [
            {
                title: "color_palette",
                href: `/d/${id}/design`,
                icon: Palette,
            },
        ],
    },
    {
        title: "files",
        items: [
            {
                title: "qr_code",
                href: `/d/${id}/qr-code`,
                icon: QrCode,
            },
        ],
    },
    {
        title: "settings",
        items: [
            {
                title: "language_settings",
                href: `/d/${id}/language-settings`,
                icon: Languages,
            },
            {
                title: "currency_settings",
                href: `/d/${id}/currency-settings`,
                icon: Banknote,
            },
            {
                title: "general_settings",
                href: `/d/${id}/general-settings`,
                icon: Settings,
            },
        ],
    },
];
