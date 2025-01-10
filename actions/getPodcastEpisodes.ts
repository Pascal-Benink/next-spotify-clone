import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getPodcastSongs = async (podcastId: string): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    try {
        const { data, error } = await supabase
            .from('podcast_songs')
            .select('*, songs(*)')
            .eq('podcast_id', podcastId);

        if (error) {
            console.error('Error fetching podcast songs:', error);
            return [];
        }

        if (!data) {
            console.warn('No data returned for podcast songs');
            return [];
        }

        return data.map((item) => ({
            ...item.songs,
        }));
    } catch (err) {
        console.error('Fetch failed:', err);
        return [];
    }
}

export default getPodcastSongs;