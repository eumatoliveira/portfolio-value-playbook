import vault from "@/assets/client-vault.jpeg.asset.json";
import positivo from "@/assets/client-positivo.jpg.asset.json";
import zntt from "@/assets/client-zntt.jpeg.asset.json";
import educa from "@/assets/client-educa.png.asset.json";
import finance from "@/assets/client-finance.jpeg.asset.json";
import outlier from "@/assets/client-outlier.avif.asset.json";
import bilhon from "@/assets/client-bilhon.png.asset.json";
import agir from "@/assets/client-agir.png.asset.json";
import { CardSlides } from "./CardSlides";
import { Reveal } from "./Motion";
import { useTranslation } from "./LanguageProvider";

const companies=[{name:"Vault Capital",asset:vault},{name:"Positivo",asset:positivo},{name:"Grupo ZNTT",asset:zntt},{name:"Educa fora da caixa",asset:educa},{name:"Serviços financeiros",asset:finance},{name:"Outlier",asset:outlier},{name:"Bilhon",asset:bilhon},{name:"AGIR36",asset:agir}];
export function ClientCompanies(){const {language}=useTranslation();return <section className="mx-auto max-w-6xl px-5 pb-12"><Reveal><h2 className="text-xl font-semibold text-foreground">{language==="en"?"Companies I have worked with":language==="es"?"Empresas que he atendido":"Empresas que já atendi"}</h2></Reveal><CardSlides>{companies.map(({name,asset})=><div key={name} className="flex h-32 items-center justify-center border-b border-border px-5"><img src={asset.url} alt={name} loading="lazy" className="max-h-24 w-full object-contain grayscale brightness-75"/></div>)}</CardSlides></section>;}