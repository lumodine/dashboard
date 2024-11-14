import { AppBreadcrumb } from "@/components/app/breadcrumb";
import { Hero } from "@/components/app/hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import currencyService from "@/services/currency.service";
import languageService from "@/services/language.service";

export default async function DashboardPage() {
    const [
        { data: languages },
        { data: currencies },
    ] = await Promise.all([
        languageService.getAll(),
        currencyService.getAll(),
    ]);

    const [
        websiteScheme,
        websiteHost
    ] = process.env.NEXT_PUBLIC_QR_MENU_URL!.split("{alias}");

    return (
        <>
            <Hero
                supTitle={process.env.NEXT_PUBLIC_APP_NAME!}
                title={"İşletme ekle"}
                description={"Lorem ipsum dolor sit amet."}
                image={"https://placehold.co/500x300/png"}
            />

            <AppBreadcrumb
                items={[
                    {
                        title: "İşletme ekle",
                    },
                ]}
            />

            <section className="container my-3">
                <form className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="name">
                                Adı (*)
                            </Label>
                        </div>
                        <Input
                            id="name"
                            type="text"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="address">
                                Adresi (*)
                            </Label>
                        </div>
                        <Input
                            id="address"
                            type="text"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="alias">
                            Web adresi (*)
                        </Label>
                        <div className="flex">
                            <span className="bg-primary text-white py-1 px-2 rounded-l-lg">
                                {websiteScheme}
                            </span>
                            <Input
                                id="alias"
                                type="text"
                                required
                                className="rounded-none"
                            />
                            <span className="bg-primary text-white py-1 px-2 rounded-r-lg">
                                {websiteHost}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1 grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="languages">
                                    Desteklenen diller (*)
                                </Label>
                            </div>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        languages.map((language, languageIndex) => (
                                            <SelectItem
                                                key={languageIndex}
                                                value={language._id}
                                            >
                                                {language.name} ({language.shortName})
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex-1 grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="defaultLanguage">
                                    Varsayılan dil (*)
                                </Label>
                            </div>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        languages.map((language, languageIndex) => (
                                            <SelectItem
                                                key={languageIndex}
                                                value={language._id}
                                            >
                                                {language.name} ({language.shortName})
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1 grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="currencies">
                                    Desteklenen para birimleri (*)
                                </Label>
                            </div>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        currencies.map((currency, currencyIndex) => (
                                            <SelectItem
                                                key={currencyIndex}
                                                value={currency._id}
                                            >
                                                {currency.code} ({currency.symbol})
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex-1 grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="defaultCurrency">
                                    Varsayılan para birimi (*)
                                </Label>
                            </div>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        currencies.map((currency, currencyIndex) => (
                                            <SelectItem
                                                key={currencyIndex}
                                                value={currency._id}
                                            >
                                                {currency.code} ({currency.symbol})
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <span className="text-xs">
                        (*) Zorunlu alan
                    </span>
                    <Button type="submit" className="w-full">
                        İşletmemi oluştur
                    </Button>
                </form>
            </section>
        </>
    );
}
