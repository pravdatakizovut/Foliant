import { Catalog } from "@/components/catalog/Catalog";
import Button from "@/components/ui/Buttons/Button";
import { MoveRight } from "lucide-react";

import Image from "next/image";

export default function HomePage() {
  return (
    <main className="relative">
      <section className=" h-228 w-full mb-8">
        {/* <Image src="/bg-home.jpg" alt="qwe" fill className="object-cover" /> */}
        <div className="flex justify-center items-center h-screen">
          <span className="text-6xl text-center text-accent-primary">?</span>
        </div>
      </section>
      <section className="foliant-container">
        <Catalog
          title="Популярное сейчас"
          showSearch={true}
          showFilters={true}
          showPagination={false}
          limit={8}
        />
        <div className="flex justify-end ">
          <Button
            variant="secondary"
            rightIcon={
              <MoveRight className="text-white/75 group-hover:text-white transition-colors duration-200 ease-in-out" />
            }
          >
            Смотреть всё
          </Button>
        </div>
      </section>
    </main>
  );
}
