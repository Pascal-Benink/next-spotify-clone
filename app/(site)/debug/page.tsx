"use client";
import getData from "@/actions/getData";
import SelectDemo, { SelectType } from "./slectdemo";

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

    return (
        <div>
            <h1>Debug Page</h1>
            {/* {JSON.stringify(data)} */}
            <SelectDemo data={listofThings} onSelect={function (value: string): void {
                throw new Error("Function not implemented.");
            }} selected={null} placeholder={"ijvgn"} />
        </div>
    );
}

export default DebugPage;