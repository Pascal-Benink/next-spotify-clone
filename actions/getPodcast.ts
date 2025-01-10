import { Podcast } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getPodcast = async (id: string): Promise<Podcast> => {
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
        .eq('id', id)
        .order('created_at', { ascending: false })
        .single();

    if (error) {
        console.error(error);
    }

    if (!data) {
        throw new Error("Podcast not found.");
        // throw new Error("You do not have access to this podcast.");
        // toast.error("You do not have access to this podcast.");
    }

    if (!data.is_public) {
        if (data.user_id !== session?.user.id) {
            redirect('/');
        }
    }

    return (data as any) || [];
}

export default getPodcast;