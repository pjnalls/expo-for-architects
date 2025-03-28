import { CatFact } from "@/types/CatFact";

const CatFactAPIEndpoint = "https://catfact.ninja/fact";

export async function getRandomCatFact(): Promise<CatFact | undefined> {
    const data: CatFact | undefined = await fetch(CatFactAPIEndpoint).then((res) => {
        if (!res.ok) {
            return undefined;
        }
        return res.json();
    }).catch(() => undefined);
    return data;
}