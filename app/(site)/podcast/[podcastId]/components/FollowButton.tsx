"use client"

import Button from "@/components/Button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { AiOutlinePlus } from "react-icons/ai";

interface FollowButtonProps {
    isFollowing: boolean;
    user_id: string | undefined;
    podcast_id: string;
}

const FollowButton = ({ isFollowing, user_id, podcast_id }: FollowButtonProps) => {
    const supabaseClient = useSupabaseClient();

    const ChangeFollow = async () => {
        if (!user_id) {
            return;
        }

        if (isFollowing) {
            // Unfollow
            await supabaseClient.from('follows')
                .delete()
                .eq('user_id', user_id)
                .eq('podcast_id', podcast_id);                
        }
        else {
            // Follow
            await supabaseClient.from('follows')
                .insert([{ user_id: user_id, podcast_id: podcast_id }]);
        }
    }

    return (
        <Button className="bg-transparent border border-primary-500 text-primary-500 my-16 lg:w-[5vw] lg:h-[3vh] text-md font-semibold flex items-center justify-center" onClick={ChangeFollow}>
            {isFollowing ? 'Following' : 'Follow'} {!isFollowing && (<AiOutlinePlus color="white" className="ml-2"/>)}
        </Button>
    );
}

export default FollowButton;