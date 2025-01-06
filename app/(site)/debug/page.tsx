"use client";
import getData from "@/actions/getData";
import SelectDemo, { SelectType } from "./slectdemo";
import SearchSelect from "@/components/SearchSelect";
import { useState } from "react";

const DebugPage = async () => {
    // console.log("DebugPage component is rendering");
    // const data = await getData('playlists');
    // console.log("Fetched data:", data);

    const listofThings: SelectType[] = [
        {
            id: "1",
            name: "leek",
        },
        {
            id: "2",
            name: "onion",
        },
        {
            id: "3",
            name: "potato",
        }
    ];

    const [selectOpen, setSelectOpen] = useState(false);

    const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState(false);

    return (
        <div>
            <h1>Debug Page</h1>
            {/* {JSON.stringify(data)} */}
            <SearchSelect
                disabled={isLoading}
                data={listofThings.map(album => ({ id: album.id, name: album.name }))}
                onSelect={(selected) => setSelectedAlbum(selected)}
                selected={selectedAlbum}
                placeholder="Select a Album"
            />
        </div>
    );
}

export default DebugPage;