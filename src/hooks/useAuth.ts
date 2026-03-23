import { fetchUser, type UserInfoProps } from "@/api/supabaseAPI";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export interface FullUserInfo extends UserInfoProps {
    id: string;
    email: string | undefined;
}

export function useAuth() {
    return useQuery({
        queryKey: ['auth-user'],
        queryFn: async (): Promise<FullUserInfo | null> => {
            // 1. Supabase Auth에서 기본 세션 정보 가져오기
            const { data: { user } } = await supabase.auth.getUser();
            
            if (!user) return null;

            // 2. 방금 만든 fetchUser로 DB의 상세 정보 가져오기
            const userInfo = await fetchUser(user.id);

            if (!userInfo) return null;

            // 3. 두 정보를 하나로 합쳐서 반환
            return {
                id: user.id,
                email: user.email,
                ...userInfo, // role, schoolname, location이 들어감
            };
        },
        staleTime: 1000 * 60 * 60, // 1시간 캐싱
    });
}