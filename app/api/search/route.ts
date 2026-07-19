// app/api/search/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const subject = searchParams.get("subject");
  const query = searchParams.get("q");
  const limit = Math.min(parseInt(searchParams.get("limit") || "8"), 20);
  const offset = (page - 1) * limit;

  const fields = [
    "key",
    "title",
    "author_name",
    "cover_i",
    "first_publish_year",
    "number_of_pages_median",
    "ratings_average",
    "ratings_count",
  ];

  let q = "subject:fiction";
  if (query && subject) {
    q = `${query} subject:${subject}`;
  } else if (query) {
    q = query;
  } else if (subject) {
    q = `subject:${subject}`;
  }

  const res = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&sort=readinglog&limit=${limit}&offset=${offset}&fields=${fields.join(",")}`,
  );

  if (!res.ok) {
    return Response.json(
      { error: "Failed to fetch books" },
      { status: res.status },
    );
  }

  const data = await res.json();

  // OpenLibrary может вернуть миллионы результатов, но дальше ~100 страниц
  // никто не листает, а огромное число не влезает в кнопки пагинации.
  const cappedTotalPages = Math.min(Math.ceil(data.numFound / limit), 999);

  return Response.json({
    books: data.docs,
    total: data.numFound,
    page,
    totalPages: cappedTotalPages,
  });
}
