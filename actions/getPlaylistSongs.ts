import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getPlaylistSongs = async (playlistId: string): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const { data, error } = await supabase
    .from('playlist_songs')
    .select('*, songs(*)')
    .eq('playlist_id', playlistId)
    .order('created_at', { ascending: true });

    if (error) {
        console.error(error);
        return [];
    }

    if (!data)
    {
        return [];
    }

    return data.map((item) => ({
        ...item.songs,
    }));
}

export default getPlaylistSongs;