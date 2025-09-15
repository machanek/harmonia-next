import Head from "next/head";
import Link from "next/link";

export default function Success() {
  return (
    <>
      <Head>
        <title>Dziękujemy — wiadomość wysłana</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className="container" style={{ padding: "48px 0" }}>
        <h1>Dziękujemy!</h1>
        <p>Twoja wiadomość została wysłana. Skontaktujemy się najszybciej jak to możliwe.</p>
        <p>
          <Link href="/" className="btn">Wróć na stronę główną</Link>
        </p>
      </main>
    </>
  );
}
