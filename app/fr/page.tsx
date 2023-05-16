
export const metadata = {
    title: "L'heure a Amsterdam"
}

  export default async function Page() {
    const res = await fetch("https://www.timeapi.io/api/Time/current/zone?timeZone=Europe/Amsterdam");
  
    const data = (await res.json()) as { hour: number; minute: number; seconds: number };
    const stamp = data.hour + ":" + data.minute + ":" + data.seconds;
  
    return (
      <>
        <h1>L'heure à Amsterdam est {stamp}
        </h1>
        <h2>
            Static route
        </h2>
      </>
    );
  }
  