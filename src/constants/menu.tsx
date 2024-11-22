import {
    Banknote,
    Boxes,
    Globe,
    Menu,
    Palette,
    QrCode,
    Settings,
} from "lucide-react";

export const MENUS = (id: string) => [
    {
        title: "İçerik",
        items: [
            {
                title: "Birimler",
                href: `/d/${id}/units`,
                icon: Boxes,
            },
            {
                title: "Menü",
                href: `/d/${id}/menu`,
                icon: Menu,
            },
        ],
    },
    {
        title: "Tasarım",
        items: [
            {
                title: "Tema",
                href: `/d/${id}/theme`,
                icon: Palette,
            },
        ],
    },
    {
        title: "Dosyalar",
        items: [
            {
                title: "Karekod",
                href: `/d/${id}/qr-code`,
                icon: QrCode,
            },
        ],
    },
    {
        title: "Ayarlar",
        items: [
            {
                title: "Dil ayarları",
                href: `/d/${id}/language-settings`,
                icon: Globe,
            },
            {
                title: "Para birimi ayarları",
                href: `/d/${id}/currency-settings`,
                icon: Banknote,
            },
            {
                title: "Genel ayarlar",
                href: `/d/${id}/general-settings`,
                icon: Settings,
            },
        ],
    },
];
