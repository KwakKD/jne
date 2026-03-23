import { supabase } from "@/lib/supabase"

export interface UserInfoProps {
    role: string
    schoolname: string
    location: string
}

const fetchUser = async (userId: string): Promise<UserInfoProps | null> => {
    const { data: userinfo, error: userinfoError } = await supabase
        .from('userinfo')
        .select('role, schoolname, location')
        .eq('id', userId)
        .single()

    if (userinfoError) throw new Error(userinfoError.message)
    return userinfo
}

export { fetchUser }