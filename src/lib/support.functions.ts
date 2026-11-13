import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { callSchema, editSchema, messageSchema, requestSchema } from "./support-schema";
import { z } from "zod";

export const getSupport = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
  const { supabase, userId } = context;
  const [role, requests, profile] = await Promise.all([supabase.from("user_roles").select("role").eq("user_id",userId).single(),supabase.from("support_requests").select("*").order("created_at",{ascending:false}).limit(200),supabase.from("profiles").select("display_name").eq("id",userId).single()]);
  if (role.error || requests.error || profile.error) throw new Error("Não foi possível carregar seus atendimentos.");
  return { admin: role.data.role === "admin", requests: requests.data, name: profile.data.display_name, userId };
});
export const getConversation = createServerFn({ method:"GET" }).middleware([requireSupabaseAuth]).inputValidator((v) => z.object({ id:z.string().uuid() }).parse(v)).handler(async ({ data,context }) => {
  const [messages,updates,calls] = await Promise.all([context.supabase.from("support_messages").select("*").eq("request_id",data.id).order("created_at"),context.supabase.from("support_updates").select("*").eq("request_id",data.id).order("created_at",{ascending:false}),context.supabase.from("support_calls").select("*").eq("request_id",data.id).order("scheduled_at")]);
  if(messages.error || updates.error || calls.error) throw new Error("Não foi possível carregar a conversa.");
  return { messages: messages.data, updates:updates.data,calls:calls.data };
});
export const createRequest = createServerFn({ method:"POST" }).middleware([requireSupabaseAuth]).inputValidator(v => requestSchema.parse(v)).handler(async ({data,context}) => {
  const result = await context.supabase.from("support_requests").insert({...data,client_id:context.userId}).select("id").single();
  if(result.error) throw new Error("Não foi possível criar a solicitação."); return result.data;
});
export const editRequest = createServerFn({ method:"POST" }).middleware([requireSupabaseAuth]).inputValidator(v => editSchema.parse(v)).handler(async ({data,context}) => {
  const { data:admin,error } = await context.supabase.rpc("is_support_admin"); if(error || !admin) throw new Error("Acesso restrito ao administrador.");
  const result = await context.supabase.from("support_requests").update({status:data.status,progress:data.progress,updated_at:new Date().toISOString()}).eq("id",data.id).select("id").single();
  if(result.error) throw new Error("Não foi possível atualizar o serviço."); return result.data;
});
export const sendMessage = createServerFn({method:"POST"}).middleware([requireSupabaseAuth]).inputValidator(v => messageSchema.parse(v)).handler(async ({data,context}) => {
  if(data.kind === "update") { const {data:admin,error} = await context.supabase.rpc("is_support_admin"); if(error || !admin) throw new Error("Acesso restrito ao administrador."); }
  const result = data.kind === "message" ? await context.supabase.from("support_messages").insert({request_id:data.request_id,body:data.body,sender_id:context.userId}) : await context.supabase.from("support_updates").insert({request_id:data.request_id,body:data.body});
  if(result.error) throw new Error("Não foi possível enviar."); return {success:true};
});
export const scheduleCall = createServerFn({method:"POST"}).middleware([requireSupabaseAuth]).inputValidator(v => callSchema.parse(v)).handler(async ({data,context}) => {
  const {data:admin,error} = await context.supabase.rpc("is_support_admin"); if(error || !admin) throw new Error("Acesso restrito ao administrador.");
  const result = await context.supabase.from("support_calls").insert(data); if(result.error) throw new Error("Não foi possível agendar a call."); return {success:true};
});