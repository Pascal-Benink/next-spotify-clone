import { Playlist } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getPlaylist = async (id: string): Promise<Playlist> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const {
        data: {
            session
        }
    } = await supabase.auth.getSession();

    const { data, error } = await supabase
        .from('playlists')
        .select('*')
        .eq('id', id)
        .order('created_at', { ascending: false })
        .single();

    if (error) {
        console.error(error);
    }

    if (!data || (data.user_id !== session?.user.id && !data.is_public)) {
        throw new Error("You do not have access to this playlist.");
    }

    return (data as any) || [];
}

export default getPlaylist;