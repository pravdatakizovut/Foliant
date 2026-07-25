import { Catalog } from "@/components/catalog/Catalog";

import Image from "next/image";

export default function HomePage() {
  return (
    <main>
      <section className="relative h-228 w-full mb-8">
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
      </section>
    </main>
  );
}
