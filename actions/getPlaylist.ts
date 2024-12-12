import { Playlist } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getPlaylist = async (id: string): Promise<Playlist> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const { data, error } = await supabase
    .from('playlists')
    .select('*')
    .eq('id', id)
    .order('created_at', { ascending: false })
    .single();

    if (error) {
        console.error(error);
    }

    return (data as any) || [];
}

export default getPlaylist;