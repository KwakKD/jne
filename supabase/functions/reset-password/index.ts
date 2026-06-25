import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apiKey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { userUid, newPassword } = await req.json()

    if (!userUid || !newPassword) {
      throw new Error("유저 UID 또는 새 비밀번호가 누락되었습니다.")
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(
      userUid,
      { password: newPassword }
    )
    if (authError) throw authError

    const { error: dbError } = await supabaseAdmin
      .from('userinfo')
      .update({ isapproved: true })
      .eq('id', userUid)
    if (dbError) throw dbError

    return new Response(
      JSON.stringify({ success: true, message: "비밀번호 초기화 성공" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    )

  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
    )
  }
})