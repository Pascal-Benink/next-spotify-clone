"use client";
import SelectDemo, { SelectType } from "./slectdemo";
import SearchSelect from "@/components/SearchSelect";
import { useState } from "react";
const Clientpage = () => {

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
            <h1>Client Page</h1>
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

export default Clientpage;