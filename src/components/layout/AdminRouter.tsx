import { supabase } from "@/lib/supabase"
import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"

export function AdminRoute() {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

    useEffect(() => {
        async function checkAdmin() {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                setIsAdmin(false)
                return
            }

            // userinfo 테이블에서 현재 로그인한 사람의 역할(role) 확인
            const { data } = await supabase
                .from('userinfo')
                .select('role')
                .eq('id', user.id)
                .single()

            setIsAdmin(data?.role === 'superadmin')
        }
        checkAdmin()
    }, [])

    if (isAdmin === null) return <div>권한 확인 중...</div>

    // 관리자가 맞으면 하위 페이지(Outlet)를 보여주고, 아니면 메인으로 튕겨냄
    return isAdmin ? <Outlet /> : <Navigate to="/high-school" replace />
}