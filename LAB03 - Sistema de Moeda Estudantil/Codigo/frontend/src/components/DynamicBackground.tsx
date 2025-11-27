import { useEffect, useState } from "react";

/**
 * DynamicBackground
 * Usa imagens aleatórias do Unsplash (HD) baseadas na query passada.
 * Não precisa de API Key.
 */

export default function DynamicBackground({ query }: { query: string }) {
  const [bgUrl, setBgUrl] = useState<string>("");

  useEffect(() => {
    // Gera URL randômica sempre dentro do mesmo tema
    const randomUrl = `https://source.unsplash.com/1920x1080/?${query}&sig=${Math.random()}`;
    setBgUrl(randomUrl);
  }, [query]);

  return (
    <div
      className="fixed inset-0 -z-10 opacity-40 bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgUrl})`,
      }}
    />
  );
}