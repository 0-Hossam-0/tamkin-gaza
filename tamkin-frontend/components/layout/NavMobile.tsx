// components/navbar/NavMobile.tsx
"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type Props = {
  t: {
    campaigns: string;
    stories: string;
    privacy: string;
    terms: string;
    about: string;
    login: string;
    register: string;
  };
};

export default function NavMobile({ t }: Props) {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button className="border px-3 py-1 rounded">Menu</button>
        </SheetTrigger>

        <SheetContent side="right" className="w-72">
          <div className="flex flex-col p-4 gap-4 mt-6">
            <Link href="/campaigns">{t.campaigns}</Link>
            <Link href="/stories">{t.stories}</Link>

            <div className="border-t pt-4">
              <Link href="/privacy">{t.privacy}</Link>
              <Link href="/terms" className="block mt-2">
                {t.terms}
              </Link>
              <Link href="/about" className="block mt-2">
                {t.about}
              </Link>
            </div>

            <div className="border-t max-w-[250px] mx-auto pt-4 flex flex-col gap-2">
              <Button variant="ghost">{t.login}</Button>
              <Button>{t.register}</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
