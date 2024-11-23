import {
    Banknote,
    Globe,
    Palette,
    QrCode,
    Settings,
    SquareMenu,
} from "lucide-react";

export const MENUS = (id: string) => [
    {
        title: "Dil",
        items: [
            {
                title: "Dil ayarları",
                href: `/d/${id}/language-settings`,
                icon: Globe,
            },
        ],
    },
    {
        title: "Para birimi",
        items: [
            {
                title: "Para birimi ayarları",
                href: `/d/${id}/currency-settings`,
                icon: Banknote,
            },
        ],
    },
    {
        title: "İçerik",
        items: [
            {
                title: "Menü",
                href: `/d/${id}/menu`,
                icon: SquareMenu,
                isSuggested: true,
            },
        ],
    },
    {
        title: "Görünüm",
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
                title: "Genel ayarlar",
                href: `/d/${id}/general-settings`,
                icon: Settings,
            },
        ],
    },
];
