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
        items: [
            /*{
                title: "Dil ayarları",
                href: `/d/${id}/language-settings`,
                icon: Globe,
            },
            {
                title: "Para birimi ayarları",
                href: `/d/${id}/currency-settings`,
                icon: Banknote,
            },*/
            {
                title: "Logo ve arkaplan",
                href: `/d/${id}/images`,
                icon: FileImage,
            },
            {
                title: "Menü",
                href: `/d/${id}/menu`,
                icon: SquareMenu,
                isSuggested: true,
            },
            {
                title: "Tema",
                href: `/d/${id}/theme`,
                icon: Palette,
            },
            {
                title: "Karekod",
                href: `/d/${id}/qr-code`,
                icon: QrCode,
            },
            {
                title: "Genel ayarlar",
                href: `/d/${id}/general-settings`,
                icon: Settings,
            },
        ],
    },
];
