import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export function CardSlides({ children, compact = false }: { children: ReactNode; compact?: boolean }) {
  const section = useRef<HTMLDivElement>(null); const rail = useRef<HTMLDivElement>(null); const track = useRef<HTMLDivElement>(null); const reduced = useReducedMotion(); const [distance,setDistance]=useState(0);
  const {scrollYProgress}=useScroll({target:section,offset:["start start","end start"]});const x=useTransform(scrollYProgress,[0,1],[0,-distance]);
  useEffect(()=>{const el=rail.current;const content=track.current;if(!el||!content)return;const observer=new ResizeObserver(()=>setDistance(Math.max(0,content.scrollWidth-el.clientWidth)));observer.observe(el);observer.observe(content);return()=>observer.disconnect();},[]);
  const move=(direction:number)=>rail.current?.scrollBy({left:direction*320,behavior:reduced?"instant":"smooth"});
  return <div ref={section} className="mt-8"><div ref={rail} className="overflow-x-auto overscroll-x-contain" tabIndex={0} aria-label="Slides de cards"><motion.div ref={track} style={reduced ? {} : {x}} className="flex w-max gap-5 py-3">{Children.toArray(children).map((child,i)=><div key={i} className={compact?"w-36 shrink-0":"w-[min(80vw,360px)] shrink-0"}>{child}</div>)}</motion.div></div><div className="mt-3 flex justify-end gap-2"><Button variant="outline" size="icon" aria-label="Cards anteriores" title="Cards anteriores" onClick={()=>move(-1)}><ArrowLeft/></Button><Button variant="outline" size="icon" aria-label="Próximos cards" title="Próximos cards" onClick={()=>move(1)}><ArrowRight/></Button></div></div>;
}