import { useAuthModal } from "@/hooks/useAuthModal";
import { useSubscribeModal } from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
import { MdPlaylistAdd, MdPlaylistAddCheck } from "react-icons/md";

interface PlaylistButtonProps {
    songId: string;
}

const PlaylistButton: React.FC<PlaylistButtonProps> = ({
    songId
}) => {
    // const router = useRouter();
    const { supabaseClient } = useSessionContext();

    const authModal = useAuthModal();
    const subscribeModal = useSubscribeModal();
    const { user, subscription } = useUser();

    const [isInPlaylist, setIsInPlaylist] = useState(false);

    useEffect(() => {
        if (!user?.id) {
            return;
        }

        const fetchData = async () => {
            const { data, error } = await supabaseClient
                .from("playlist_songs")
                .select("playlist_id, playlists(user_id)")
                .eq("song_id", songId)
                .eq("playlists.user_id", user.id)
                .single();

            if (!error && data) {
                setIsInPlaylist(true);
            }
        };

        fetchData();
    }, [songId, supabaseClient, user?.id]);

    const Icon = isInPlaylist ? MdPlaylistAddCheck : MdPlaylistAdd;

    const handleLike = async () => {
        if (!user) {
            return authModal.onOpen();
        }

        if (!subscription) {
            return subscribeModal.onOpen();
        }

        // if (isInPlaylist)
        // {
        //     const { error } = await supabaseClient
        //     .from("liked_songs")
        //     .delete()
        //     .eq("user_id", user.id)
        //     .eq("song_id", songId);

        //     if (error) {
        //         toast.error(error.message);
        //     }

        //     setIsInPlaylist(false);
        // }
        // else {
        //     const { error } = await supabaseClient
        //     .from("liked_songs")
        //     .insert({
        //         song_id: songId,
        //         user_id: user.id
        //     });

        //     if (error) {
        //         toast.error(error.message);
        //     } else {
        //         setIsInPlaylist(true);
        //         toast.success("Liked!");
        //     }
        // }

        // router.refresh();
    }

    return (
        <button
            onClick={handleLike}
            className="
        hover:opacity-75
        transition
        "
        >
            <Icon color={'white'} size={25} />
        </button>
    );
}

export default PlaylistButton;