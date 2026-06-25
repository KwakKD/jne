import { supabase } from "@/lib/supabase"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function ChangePasswordPage() {
    const navigate = useNavigate()
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState({ type: "", text: "" })

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage({ type: "", text: "" })

        // 1. 유효성 검사
        if (password.length < 6) {
            setMessage({ type: "error", text: "비밀번호는 최소 6자리 이상이어야 합니다." })
            return
        }
        if (password !== confirmPassword) {
            setMessage({ type: "error", text: "새 비밀번호와 비밀번호 확인이 일치하지 않습니다." })
            return
        }
        if (password === "jne1234!") {
            setMessage({ type: "error", text: "초기 비밀번호와 다른 비밀번호를 설정해주세요." })
            return
        }

        setIsLoading(true)

        try {
            // 2. Supabase API를 이용해 로그인된 현재 유저의 비밀번호 변경
            const { error: authError } = await supabase.auth.updateUser({
                password: password
            })
            if (authError) throw authError

            // 3. 비밀번호를 바꿨으므로 userinfo 테이블의 is_initial_password를 false로 변경
            // 💡 로그인된 상태이므로 본인 Row를 직접 수정할 수 있습니다 (기존 RLS로 허용됨).
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { error: dbError } = await supabase
                    .from("userinfo")
                    .update({ isapproved: false })
                    .eq("id", user.id)

                if (dbError) throw dbError
            }

            setMessage({ type: "success", text: "비밀번호 변경이 완료되었습니다! 잠시 후 메인 화면으로 이동합니다." })

            // 4. 성공 후 2초 뒤 메인 화면으로 리다이렉트
            setTimeout(() => {
                navigate("/")
            }, 2000)

        } catch (error: any) {
            setMessage({ type: "error", text: error.message || "비밀번호 변경 중 오류가 발생했습니다." })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="max-w-md w-full bg-white shadow-lg rounded-xl border border-slate-200 p-8">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">🔒 비밀번호 변경</h2>
                    <p className="text-sm text-slate-600 mt-2">
                        안전한 서비스 이용을 위해 초기 비밀번호를 변경해 주세요.
                    </p>
                </div>

                <form onSubmit={handleChangePassword} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">새 비밀번호</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="새로운 비밀번호 입력 (6자리 이상)"
                            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">새 비밀번호 확인</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="비밀번호 다시 입력"
                            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                            required
                        />
                    </div>

                    {message.text && (
                        <div className={`p-3 rounded-md text-sm ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
                            }`}>
                            {message.text}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-medium text-sm hover:bg-indigo-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "변경 중..." : "비밀번호 변경하기"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export {ChangePasswordPage}