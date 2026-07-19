import { NextResponse } from "next/server";

interface Edition {
  publish_date?: string;
  number_of_pages?: number;
  publishers?: string[];
  languages?: { key?: string }[];
  isbn_13?: string[];
  isbn_10?: string[];
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const workKey = decodeURIComponent(id);

  try {
    // 1. Получаем данные work
    const workRes = await fetch(`https://openlibrary.org${workKey}.json`);
    if (!workRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch work" },
        { status: workRes.status },
      );
    }
    const work = await workRes.json();

    // 2. Получаем первую edition для доп. данных
    let edition: Edition | null = null;
    try {
      const editionsRes = await fetch(
        `https://openlibrary.org${workKey}/editions.json?limit=1`,
      );
      if (editionsRes.ok) {
        const editionsData = await editionsRes.json();
        edition = editionsData.entries?.[0] ?? null;
      }
    } catch {
      // edition не критична
    }

    // 3. Получаем имена авторов
    const authors: { name: string; key: string }[] = [];
    if (work.authors && Array.isArray(work.authors)) {
      for (const a of work.authors) {
        const authorKey = a.author?.key || a.key;
        if (!authorKey) continue;
        try {
          const authorRes = await fetch(
            `https://openlibrary.org${authorKey}.json`,
          );
          if (authorRes.ok) {
            const authorData = await authorRes.json();
            authors.push({ name: authorData.name || "Неизвестный", key: authorKey });
          }
        } catch {
          authors.push({ name: "Неизвестный", key: authorKey });
        }
      }
    }

    // 4. Извлекаем описание
    let description = "";
    if (work.description) {
      if (typeof work.description === "string") {
        description = work.description;
      } else if (work.description.value) {
        description = work.description.value;
      }
    }

    // 5. Собираем данные
    const coverId = work.covers?.[0] ?? null;
    const bookDetails = {
      key: workKey,
      title: work.title || "Без названия",
      author_name: authors.map((a) => a.name),
      authors,
      cover_i: coverId,
      ratings_average: work.ratings_average ?? null,
      first_publish_year: edition
        ? parseInt(String(edition.publish_date || work.first_publish_year), 10) || undefined
        : work.first_publish_year,
      number_of_pages_median: edition
        ? (edition.number_of_pages as number) || work.number_of_pages_median
        : work.number_of_pages_median,
      description: description || "Описание отсутствует.",
      subjects: work.subjects?.slice(0, 3) || [],
      publisher: edition
        ? (edition.publishers?.[0] as string) || "Неизвестно"
        : "Неизвестно",
      language: edition
        ? (edition.languages?.[0]?.key as string)?.replace("/languages/", "") || "eng"
        : (work.language?.[0] as string) || "eng",
      isbn: edition
        ? ((edition.isbn_13?.[0] || edition.isbn_10?.[0]) as string) || ""
        : "",
    };

    return NextResponse.json(bookDetails);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch book details" },
      { status: 500 },
    );
  }
}
