import { describe,it,expect } from "vitest";
import { callSchema,editSchema,requestSchema } from "@/lib/support-schema";
import { convertMoney } from "@/lib/currency";
describe("support rules",()=>{
 it("allows helpdesk and development service requests",()=>{expect(requestSchema.parse({title:"Suporte",description:"Erro de acesso",kind:"helpdesk",priority:"normal"}).kind).toBe("helpdesk");expect(requestSchema.parse({title:"Projeto",description:"Aplicação web",kind:"service",priority:"normal"}).kind).toBe("service");});
 it("accepts only Calendly and Google Meet call links",()=>{const base={request_id:"11111111-1111-4111-8111-111111111111",scheduled_at:"2026-11-20T15:00:00Z"};expect(callSchema.safeParse({...base,url:"https://meet.google.com/abc-defg-hij"}).success).toBe(true);expect(callSchema.safeParse({...base,url:"https://calendly.com/matheus/suporte"}).success).toBe(true);expect(callSchema.safeParse({...base,url:"https://meet.google.com.evil.test/abc"}).success).toBe(false);});
 it("limits development progress to 0 through 100",()=>{const base={id:"11111111-1111-4111-8111-111111111111",status:"in_progress"};expect(editSchema.safeParse({...base,progress:101}).success).toBe(false);expect(editSchema.parse({...base,progress:100}).progress).toBe(100);});
 it("converts real results into dollars and pounds using reference rates",()=>{expect(convertMoney(15000,"BRL","USD")).toBeCloseTo(2668.335);expect(convertMoney(15000,"BRL","GBP")).toBeCloseTo(2015.97);});
});