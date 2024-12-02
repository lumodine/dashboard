import {
    Banknote,
    Globe,
    FileImage,
    Palette,
    QrCode,
    Settings,
    SquareMenu,
} from "lucide-react";

export const MENUS = (id: string) => [
    {
        title: "Başlangıç ayarları",
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
        ],
    },
    {
        title: "İçerik",
        items: [
            {
                title: "Menü",
                href: `/d/${id}/menu`,
                icon: SquareMenu,
            },
        ],
    },
    {
        title: "Baskı",
        items: [
            {
                title: "Karekod",
                href: `/d/${id}/qr-code`,
                icon: QrCode,
            },
        ],
    },
    {
        title: "Görünüm",
        items: [
            {
                title: "Logo ve arkaplan",
                href: `/d/${id}/images`,
                icon: FileImage,
            },
            {
                title: "Tema",
                href: `/d/${id}/theme`,
                icon: Palette,
            },
        ],
    },
    {
        title: "Diğer ayarlar",
        items: [
            {
                title: "Genel ayarlar",
                href: `/d/${id}/general-settings`,
                icon: Settings,
            },
        ],
    },
];
