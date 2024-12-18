"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchControls: React.FC = () => {
    const router = useRouter();
    const [type, setType] = useState<string | null>(null);

    const handleButtonClick = (type?: string) => {
        const url = new URL(window.location.href);
        if (type) {
            url.searchParams.set('type', type);
            setType(type);
        } else {
            url.searchParams.delete('type');
            setType(null);
        }
        router.push(url.toString());
    };

    return (
        <div>
            <button onClick={() => handleButtonClick('songs')}>Songs</button>
            <button onClick={() => handleButtonClick('playlists')}>Playlists</button>
            {type && <button onClick={() => handleButtonClick()}>Show All</button>}
        </div>
    );
};

export default SearchControls;