import Header from "@/components/Header";
import PageContent from "./components/SongContent";
import getSongs from "@/actions/getSongs";
import getUser from "@/actions/getUser";

const SongListPage = async () => {
    const songs = await getSongs();
    const user = await getUser();

    return (
        <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
            <Header>
                <div className="mb-2">
                    <h1 className="
          text-white
          text-3xl
          font-semibold
          ">
                        Welcome back
                    </h1>
                </div>
            </Header>
            <div className="mt-2 mb-7 px-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-white text-2xl font-semibold mb-2">
                        All Songs
                    </h1>
                </div>
                <PageContent songs={songs} userId={user?.id}/>
            </div>
        </div>
    );
}

export default SongListPage;