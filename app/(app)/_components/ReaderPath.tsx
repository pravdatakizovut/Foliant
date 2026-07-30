"use client";

import Image from "next/image";

type Step = {
  title: string;
  items: string[];
};

const STEPS: Step[] = [
  {
    title: "Начало",
    items: ["Найди книгу", "Добавь в полку", "Отслеживай прогресс"],
  },
  {
    title: "Погружение",
    items: ["Сохраняй цитаты", "Обнови статус", "Напиши рецензию"],
  },
  {
    title: "Сообщество",
    items: ["Подписывай друзей", "Смотри ленту", "Получай достижения"],
  },
  {
    title: "Развитие",
    items: ["Смотри статистику", "Ставь цели", "Делись цитатами"],
  },
];

function StepBlock({ label }: { label: string }) {
  return (
    <div className="bg-accent-primary relative h-full w-fit rounded-full">
      <span className="text-md text-text-secondary whitespace-nowrap block translate-y-15 px-2">
        {label}
      </span>
    </div>
  );
}

export function ReaderPath() {
  return (
    <div className="flex flex-col gap-20 pb-30">
      <div>
        <div className="flex gap-3 mb-15">
          <Image
            src="/step-icon.svg"
            width={32}
            height={32}
            alt="icon"
            draggable={false}
          />
          <span className="text-[32px] font-semibold ">Путь читателя</span>
        </div>
        <div className="flex flex-col gap-25">
          {/* 1 */}
          <div className="flex gap-3 items-end">
            <div className="flex flex-col gap-3">
              <span className="text-2xl font-semibold">Начало</span>
              <div className="flex h-13 gap-3">
                <div className="bg-accent-primary relative h-full w-fit rounded-full ">
                  <span className="text-md text-text-secondary whitespace-nowrap block translate-y-15 px-2">
                    Найди книгу
                  </span>
                </div>
                <div className="bg-accent-primary relative h-full w-fit rounded-full ">
                  <span className="text-md text-text-secondary whitespace-nowrap block translate-y-15 px-2">
                    Добавь в полку
                  </span>
                </div>
                <div className="bg-accent-primary relative h-full w-fit rounded-full ">
                  <span className="text-md text-text-secondary whitespace-nowrap block translate-y-15 px-2">
                    Отслеживай прогресс
                  </span>
                </div>
              </div>
            </div>
            <div className="h-13 flex-1 stripes-pattern" />
          </div>
          {/* 2 */}
          <div className="flex gap-3 items-end">
            <div className="h-13 stripes-pattern w-67" />
            <div className="flex flex-col gap-3">
              <span className="text-2xl font-semibold">Погружение</span>
              <div className="flex h-13 gap-3">
                <div className="bg-accent-primary relative h-full w-fit rounded-full ">
                  <span className="text-md text-text-secondary whitespace-nowrap block translate-y-15 px-2">
                    Сохраняй цитаты
                  </span>
                </div>
                <div className="bg-accent-primary relative h-full w-fit rounded-full ">
                  <span className="text-md text-text-secondary whitespace-nowrap block translate-y-15 px-2">
                    Обнови статус
                  </span>
                </div>
                <div className="bg-accent-primary relative h-full w-fit rounded-full ">
                  <span className="text-md text-text-secondary whitespace-nowrap block translate-y-15 px-2">
                    Напиши рецензию
                  </span>
                </div>
              </div>
            </div>
            <div className="h-13 flex-1 stripes-pattern" />
          </div>
          {/* 3 */}
          <div className="flex gap-3 items-end">
            <div className="h-13 stripes-pattern w-144" />
            <div className="flex flex-col gap-3">
              <span className="text-2xl font-semibold">Сообщество</span>
              <div className="flex h-13 gap-3">
                <div className="bg-accent-primary relative h-full w-fit rounded-full ">
                  <span className="text-md text-text-secondary whitespace-nowrap block translate-y-15 px-2">
                    Подпишисьна друзей
                  </span>
                </div>
                <div className="bg-accent-primary relative h-full w-fit rounded-full ">
                  <span className="text-md text-text-secondary whitespace-nowrap block translate-y-15 px-2">
                    Смотри ленту
                  </span>
                </div>
                <div className="bg-accent-primary relative h-full w-fit rounded-full ">
                  <span className="text-md text-text-secondary whitespace-nowrap block translate-y-15 px-2">
                    Получай достижения
                  </span>
                </div>
              </div>
            </div>
            <div className="h-13 flex-1 stripes-pattern" />
          </div>
          {/* 4 */}
          <div className="flex gap-3 items-end">
            <div className="h-13 stripes-pattern flex-1" />
            <div className="flex flex-col gap-3">
              <span className="text-2xl font-semibold">Развитие</span>
              <div className="flex h-13 gap-3">
                <div className="bg-accent-primary relative h-full w-fit rounded-full ">
                  <span className="text-md text-text-secondary whitespace-nowrap block translate-y-15 px-2">
                    Смотри статистику
                  </span>
                </div>
                <div className="bg-accent-primary relative h-full w-fit rounded-full ">
                  <span className="text-md text-text-secondary whitespace-nowrap block translate-y-15 px-2">
                    Ставь цели
                  </span>
                </div>
                <div className="bg-accent-primary relative h-full w-fit rounded-full ">
                  <span className="text-md text-text-secondary whitespace-nowrap block translate-y-15 px-2">
                    Делись цитатой
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
