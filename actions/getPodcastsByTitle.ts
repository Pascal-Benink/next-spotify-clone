import { Podcast } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getPodcasts from "./getPodcasts";

const getPodcastsByTitle = async (title: string): Promise<Podcast[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    if (!title)
    {
        const allPodcasts = await getPodcasts();
        return allPodcasts;
    }

    const { data, error } = await supabase
    .from('podcasts')
    .select('*')
    .like('name', `%${title}%`)
    .order('created_at', { ascending: false });

    if (error) {
        console.error(error);
    }

    return (data as any) || [];
}

export default getPodcastsByTitle;