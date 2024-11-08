import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sayfa Bulunamadı",
  robots: "noindex, nofollow"
}

export default function NotFoundPage() {
  return (
    <div className="grid h-screen px-4 place-content-center">
      <div className="text-center">
        <h1 className="font-black text-4xl">
          Sayfa Bulunamadı!
        </h1>

        <p className="mt-4 text-muted-foreground">
          Üzgünüz, gitmeye çalıştığınız sayfayı bulamadık.
        </p>
      </div>
    </div>
  )
}
