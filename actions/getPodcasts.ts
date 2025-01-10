import { Podcast } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getPodcasts = async (): Promise<Podcast[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const {
        data: {
            session
        }
    } = await supabase.auth.getSession();

    const { data, error } = await supabase
        .from('podcasts')
        .select('*')
        .eq('user_id', session?.user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error(error);
    }

    const podcastData = await Promise.all(data?.map(async (podcast: Podcast) => {
        const { data: FollowData, error: FollowError } = await supabase
            .from('podcast_followers')
            .select('*')
            .eq('podcast_id', podcast.id)
            .eq('user_id', session?.user.id);

        if (FollowError) {
            console.error(FollowError);
            return podcast;
        }

        if (FollowData && FollowData.length > 0) {
            return {
                ...podcast,
                isFollowed: true
            }
        }

        return podcast;
    }) || []);

    return podcastData;
}

export default getPodcasts;