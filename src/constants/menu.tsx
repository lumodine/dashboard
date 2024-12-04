import {
    Banknote,
    Globe,
    FileImage,
    Palette,
    QrCode,
    Settings,
    SquareMenu,
    Tag,
    Megaphone,
    CaseSensitive,
    FileUser,
    ChartBar,
    MapPinHouse,
    Contact,
    Users,
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
        title: "Temel içerikler",
        items: [
            {
                title: "Menü",
                href: `/d/${id}/menu`,
                icon: SquareMenu,
            },
        ],
    },
    {
        title: "Diğer içerikler",
        items: [
            {
                title: "Etiketler",
                href: `/d/${id}/tags`,
                icon: Tag,
                isDisabled: true,
            },
            {
                title: "Duyurular",
                href: `/d/${id}/announcements`,
                icon: Megaphone,
                isDisabled: true,
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
            {
                title: "Yazı tipi",
                href: `/d/${id}/font`,
                icon: CaseSensitive,
                isDisabled: true,
            },
        ],
    },
    {
        title: "Analiz",
        items: [
            {
                title: "Anket sonuçları",
                href: `/d/${id}/survey-results`,
                icon: FileUser,
                isDisabled: true,
            },
            {
                title: "Etkileşim raporları",
                href: `/d/${id}/interaction-reports`,
                icon: ChartBar,
                isDisabled: true,
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
        title: "Diğer ayarlar",
        items: [
            {
                title: "Adres",
                href: `/d/${id}/address`,
                icon: MapPinHouse,
                isDisabled: true,
            },
            {
                title: "Sosyal medya",
                href: `/d/${id}/social-media`,
                icon: Contact,
            },
            {
                title: "Kullanıcılar",
                href: `/d/${id}/users`,
                icon: Users,
                isDisabled: true,
            },
            {
                title: "Genel ayarlar",
                href: `/d/${id}/general-settings`,
                icon: Settings,
            },
        ],
    },
];
