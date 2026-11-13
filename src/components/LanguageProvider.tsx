import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import dictionaries from "@/data/translations.json";
type Language = "pt" | "en" | "es";
const Context = createContext({ language: "pt" as Language, setLanguage: (_language: Language) => {}, t: (value: string) => value });
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language,setLanguage] = useState<Language>("pt");
  useEffect(()=>{const saved=localStorage.getItem("site-language");if(saved==="pt"||saved==="en"||saved==="es")setLanguage(saved);},[]);
  useEffect(()=>{document.documentElement.lang=language;localStorage.setItem("site-language",language);},[language]);
  const t=(value:string)=>{const dictionary:Record<string,string>=dictionaries[language];return dictionary[value.trim()] ?? value;};
  return <Context.Provider value={{language,setLanguage,t}}>{children}</Context.Provider>;
}
export const useTranslation=()=>useContext(Context);
export function LanguageSelect(){const {language,setLanguage}=useTranslation();return <select aria-label="Idioma / Language" value={language} onChange={e=>{const v=e.target.value;if(v==="pt"||v==="en"||v==="es")setLanguage(v);}} className="w-16 shrink-0 rounded-full border border-border bg-background px-2 py-2 text-xs"><option value="pt">PT</option><option value="en">EN</option><option value="es">ES</option></select>;}