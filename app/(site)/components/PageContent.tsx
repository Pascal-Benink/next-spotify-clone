"use client"

import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";
import { useRef } from "react";

interface PageContentProps {
    songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({
    songs
}) => {
    const onPlay = useOnPlay(songs);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -600, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 600, behavior: 'smooth' });
        }
    };

    if (songs.length === 0) {
        return (
            <div className="mt-4 text-neutral-400">
                No Songs Available
            </div>
        )
    }
    return (
        // <div
        // className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 lx:grid-cols-5 2xl:grid-cols-8 gap-4 ml-4"
        // >
        //     {songs.map((item) => (
        //         <SongItem 
        //         key={item.id}
        //         onClick={(id: string) => {onPlay(id)}}
        //         data={item}
        //         />
        //     ))}
        // </div>
        <div className="relative">
            <button onClick={scrollLeft} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">
                &lt;
            </button>
            <div ref={scrollContainerRef} className="overflow-hidden truncate">
                <div className="grid grid-rows-2 gap-4 ml-4 grid-flow-col">
                    {songs.map((item) => (
                        <SongItem
                            key={item.id}
                            onClick={(id: string) => { onPlay(id) }}
                            data={item}
                        />
                    ))}
                </div>
            </div>
            <button onClick={scrollRight} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">
                &gt;
            </button>
        </div>
    );
}

export default PageContent;