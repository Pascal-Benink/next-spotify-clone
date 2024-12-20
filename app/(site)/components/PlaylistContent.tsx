import PlaylistItem from "@/components/PlaylistItem";
import { Playlist } from "@/types";

interface PlaylistContentProps {
    playlists: Playlist[];
    userId: string | undefined;
}

const PlaylistContent: React.FC<PlaylistContentProps> = ({ playlists, userId }) => {
    return (
        <div className="grid grid-rows-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 lx:grid-cols-5 2xl:grid-cols-8 gap-4 ml-4">
            {playlists.slice(0, 16).map((item) => (
                <PlaylistItem
                    key={item.id}
                    data={item}
                    isOwner={item.user_id === userId}
                />
            ))}
        </div>
    );
}

export default PlaylistContent;