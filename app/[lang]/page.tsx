export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "de" }];
}

export function generateMetadata({ params }: { params: { lang: string } }) {
  const title =
    params.lang == "en"
      ? "Time in Amsterdam"
      : params.lang == "de"
      ? "Zeit in Amsterdam"
      : "No Time";
  return {
    title: title,
  };
}

export default async function Page({ params }: { params: { lang: string } }) {
  const res = await fetch("https://www.timeapi.io/api/Time/current/zone?timeZone=Europe/Amsterdam");

  const data = (await res.json()) as { hour: number; minute: number; seconds: number };
  const stamp = data.hour + ":" + data.minute + ":" + data.seconds;

  return (
    <>
      <h1>
        {params.lang == "en"
          ? "Time in Amsterdam is "
          : params.lang == "de"
          ? "Zeit in Amsterdam "
          : "language not supported "}
        {stamp}
      </h1>
      <h2>
        dynamic route
      </h2>
    </>
  );
}
