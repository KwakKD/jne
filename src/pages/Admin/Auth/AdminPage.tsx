import { fetchAllUser } from "@/api/supabaseAPI"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from '@/lib/supabase'

interface TeacherUser {
    id: string
    schoolname: string
    location: string
    role: string
    isapproved: boolean
}

function AdminPage() {
    const queryClient = useQueryClient()

    // 🎯 1. 교사 목록 조회 (기존 뼈대 유지 + 타입 명시)
    const { data: users, isLoading, isError, error } = useQuery<TeacherUser[]>({
        queryKey: ['admin', 'users'],
        queryFn: fetchAllUser
    })

    // 🎯 2. 배포 완료한 'reset-password' Edge Function을 호출하는 mutation
    const resetPasswordMutation = useMutation({
        mutationFn: async (userUid: string) => {
            const { data, error: functionError } = await supabase.functions.invoke('reset-password', {
                body: {
                    userUid,
                    newPassword: 'jne1234!' // 초기화할 공통 임시 비밀번호
                },
            })
            if (functionError) throw functionError
            return data
        },
        onSuccess: () => {
            alert('성공적으로 비밀번호가 초기화되었습니다.')
            // 💡 3. 성공 시 캐시를 무효화하여 목록을 깔끔하게 자동 갱신합니다.
            queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })
        },
        onError: (err: any) => {
            alert(`초기화 실패: ${err.message || '오류가 발생했습니다.'}`)
        }
    })

    if (isLoading) return <div className="p-8 text-center text-slate-600">교사 목록을 불러오는 중...</div>
    if (isError) return <div className="p-8 text-center text-red-500">에러 발생: {error.message}</div>

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-slate-900">⚙️ 관리자 패널</h1>

            <div className="bg-white shadow rounded-lg overflow-hidden border border-slate-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-slate-50">
                        <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            <th className="px-6 py-3">지역</th>
                            <th className="px-6 py-3">학교명</th>
                            <th className="px-6 py-3 text-center">관리 조치</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users && users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-slate-600">{user.location}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{user.schoolname}</td>
                                    <td className="px-6 py-4 text-center text-sm">
                                        <button
                                            onClick={() => {
                                                if (window.confirm(`[${user.schoolname}] 계정의 비밀번호를 'jne1234!' 로 초기화하시겠습니까?`)) {
                                                    resetPasswordMutation.mutate(user.id)
                                                }
                                            }}
                                            // 💡 4. 한창 변경 작업 중일 때는 버튼을 잠가서 중복 클릭 방지
                                            disabled={resetPasswordMutation.isPending}
                                            className="text-red-600 bg-red-50 hover:bg-red-100 disabled:bg-slate-100 disabled:text-slate-400 px-3 py-1.5 rounded-md font-medium transition-colors disabled:cursor-not-allowed"
                                        >
                                            {resetPasswordMutation.isPending ? '처리 중...' : '비밀번호 초기화'}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="px-6 py-8 text-center text-sm text-slate-500">
                                    조회된 교직원 계정이 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export { AdminPage }