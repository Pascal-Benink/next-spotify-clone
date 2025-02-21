import getSongsByTitle from "@/actions/getSongsByTitle";
import getPlaylistsByTitle from "@/actions/getPlaylistsByTitle";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SongSearchContent from "./components/SongSearchContent";
import PlaylistSearchContent from "./components/PlaylistSearchContent";
import SearchControls from "./components/SearchControls";
import getUser from "@/actions/getUser";
import AlbumSearchContent from "./components/AlbumSearchContent";
import getAlbumsByTitle from "@/actions/getAlbumsByTitle";

interface SearchProps {
    searchParams: {
        title: string;
        type?: string;
    }
}

export const revalidate = 0;

const Search = async ({ searchParams }: SearchProps) => {
    const { title, type } = searchParams;

    let songs = await getSongsByTitle(title);
    let playlists = await getPlaylistsByTitle(title);
    let albums = await getAlbumsByTitle(title);
    const user = await getUser();

    if (!type) {
        console.log("No search params");
        songs = songs.slice(0, 7);
        playlists = playlists.slice(0, 7);
        albums = albums.slice(0, 7);
    }

    return (
        <div
            className="
        bg-neutral-900
        rounded-lg
        h-full
        w-hull
        overflow-hidden
        overflow-y-auto
        "
        >
            <Header className="from-bg-neutral-900">
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className="text-white text-3xl font-semibold">
                        Search
                    </h1>
                    <SearchControls />
                    <SearchInput />
                </div>
            </Header>
            {!type && (
                <>
                    <div className="mb-3">
                        <h2 className="text-white text-xl font-semibold px-6">
                            Songs
                        </h2>
                        <SongSearchContent songs={songs} userId={user?.id} />
                    </div>
                    <div className="mb-3">
                        <h2 className="text-white text-xl font-semibold px-6">
                            Playlists
                        </h2>
                        <PlaylistSearchContent playlists={playlists} userId={user?.id} />
                    </div>
                    <div>
                        <h2 className="text-white text-xl font-semibold px-6">
                            Albums
                        </h2>
                        <AlbumSearchContent albums={albums} userId={user?.id} />
                    </div>
                </>
            )}
            {type === 'songs' && (
                <div className="mb-3">
                    <h2 className="text-white text-xl font-semibold px-6">
                        Songs
                    </h2>
                    <SongSearchContent songs={songs} userId={user?.id} />
                </div>
            )}
            {type === 'playlists' && (
                <div className="mb-3">
                    <h2 className="text-white text-xl font-semibold px-6">
                        Playlists
                    </h2>
                    <PlaylistSearchContent playlists={playlists} userId={user?.id} />
                </div>
            )}
            {type === 'albums' && (
                <div>
                    <h2 className="text-white text-xl font-semibold px-6">
                        Albums
                    </h2>
                    <AlbumSearchContent albums={albums} userId={user?.id} />
                </div>
            )}
        </div>
    )
}

export default Search;