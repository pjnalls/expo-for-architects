import { CatFact } from "@/types/CatFact";

const CatFactAPIEndpoint = "https://catfact.ninja/fact";

export async function getRandomCatFact(): Promise<CatFact | null> {
    const data: CatFact = await fetch(CatFactAPIEndpoint).then((res) => {
        if (!res.ok) {
            return null;
        }
        return res.json();
    }).catch(() => null);
    return data;
}