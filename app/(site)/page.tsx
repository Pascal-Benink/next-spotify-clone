import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import PageContent from "./components/PageContent";
import Link from "next/link";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();

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
          <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          2xl:grid-cols-4
          gap-3
          mt-4
          ">
            <ListItem
              image="/images/liked.png"
              name="Liked Songs"
              href="/liked"
            />
          </div>
        </div>
      </Header>
      {/* <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">
            Newest Songs
          </h1>
        </div>
        <div>
          <PageContent songs={songs} />
        </div>
      </div> */}
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">
            Newest Songs
          </h1>
          <Link href="/songs">
            <p className="text-white text-sm font-semibold mr-3 hover:underline">
              View All
            </p>
          </Link>
        </div>
        <div>
          <PageContent songs={songs} />
        </div>
      </div>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">
            My Playlists
          </h1>
          {/* <Link href="/songs">
            <p className="text-white text-sm font-semibold mr-3 hover:underline">
              View All
            </p>
          </Link> */}
        </div>
        <div>
          {/* <PageContent songs={songs} /> */}
          <p className="text-red-500">This is in development</p>
        </div>
      </div>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">
            Public Playlists
          </h1>
          {/* <Link href="/songs">
            <p className="text-white text-sm font-semibold mr-3 hover:underline">
              View All
            </p>
          </Link> */}
        </div>
        <div>
          {/* <PageContent songs={songs} /> */}
          <p className="text-red-500">This is in development</p>
        </div>
      </div>
    </div>
  )
}