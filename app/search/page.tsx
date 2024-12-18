import getSongsByTitle from "@/actions/getSongsByTitle";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SongSearchContent from "./components/SongSearchContent";
import PlaylistSearchContent from "./components/PlaylistSearchContent";
import getPlaylistsByTitle from "@/actions/getPlaylistsByTitle";

interface SearchProps {
    searchParams: {
        title: string;
    }
}

export const revalidate = 0;

const Search = async ({ searchParams }: SearchProps) => {
    let songs = await getSongsByTitle(searchParams.title);
    let playlists = await getPlaylistsByTitle(searchParams.title);

    if (!searchParams.title)
    {
        console.log("No search params");
        songs = songs.slice(0, 7);
        playlists = playlists.slice(0, 7);
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
                    <SearchInput />
                </div>
            </Header>
            <div className="mb-3">
                <h2 className="text-white text-xl font-semibold px-6">
                    Songs
                </h2>
                <SongSearchContent songs={songs} />
            </div>
            <div>
                <h2 className="text-white text-xl font-semibold px-6">
                    Playlists
                </h2>
                <PlaylistSearchContent playlists={playlists} />
            </div>
        </div>
    )
}

export default Search;