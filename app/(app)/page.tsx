import { Catalog } from "@/app/(app)/catalog/_components/Catalog";
import Button from "@/components/ui/Buttons/Button";
import { MoveRight } from "lucide-react";

import Image from "next/image";
import { ReaderPath } from "./_components/ReaderPath";

export default function HomePage() {
  return (
    <main className="relative">
      {/* streak */}
      <section className=" h-228 w-full mb-8">
        {/* <Image src="/bg-home.jpg" alt="qwe" fill className="object-cover" /> */}
        <div className="flex justify-center items-center h-screen">
          <span className="text-6xl text-center text-accent-primary">?</span>
        </div>
      </section>
      {/* Catalog Section */}
      <section className="foliant-container mb-30">
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
      {/* RoadReader Section */}
      <section className="foliant-container mb-30">
        <ReaderPath />
        {/* </div> */}
      </section>
      <section className="foliant-container pb-50">
        <div className="grid grid-cols-4 h-160 gap-6">
          <div className="flex flex-col col-span-2 justify-between items-start">
            <div className="flex flex-col gap-6 ">
              <p className="text-[32px] font-semibold">
                Всё для вашего читательского пути
              </p>
              <p className="text-xl font-light leading-1.4 text-text-secondary">
                Читайте больше, запоминайте лучшее и делитесь открытиями с
                друзьями. Мы создали удобные инструменты, которые сделают каждую
                книгу незабываемой.
              </p>
            </div>
            <div className="flex flex-col gap-6 items-end   ml-auto">
              <p className="text-2xl ">📖 Отслеживай прогресс</p>
              <p className="text-xl font-light leading-1.4 text-text-secondary text-end">
                Читайте больше, запоминайте лучшее и делитесь открытиями с
                друзьями. Мы создали удобные инструменты, которые сделают каждую
                книгу незабываемой.
              </p>
            </div>
          </div>
          <div className="col-span-2 bg-text-secondary/15 h-full w-full rounded-3xl"></div>
        </div>
      </section>
    </main>
  );
}
