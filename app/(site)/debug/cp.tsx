"use client";
import React, { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Modal from '@/components/Modal';
import SearchSelect from '@/components/SearchSelect';
import { SelectType } from './slectdemo';

const CP = () => {
    const [listofThings, setListofThings] = useState<SelectType[]>([]);
    const [selectedAlbum, setSelectedAlbum] = useState<string | undefined>(undefined);
    const [selectedAlbumName, setSelectedAlbumName] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const supabaseClient = useSupabaseClient();

    useEffect(() => {
        const fetchAlbums = async () => {
            setIsLoading(true);
            try {
                const { data, error } = await supabaseClient
                    .from('albums')
                    .select('id, name');

                if (error) {
                    console.error(error);
                    return;
                }

                setListofThings(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchAlbums();
    }, [supabaseClient]);

    useEffect(() => {
        const album = listofThings.find(album => album.id === selectedAlbum);
        console.log('Selected Album Name:', album);
        setSelectedAlbumName(album ? album.name : undefined);
    }, [selectedAlbum, listofThings]);

    useEffect(() => {
        console.log('Selected Album:', selectedAlbum);
    }, [selectedAlbum]);

    const onChange = (open: boolean) => {
        if (!open) {
            // Handle modal close
        }
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle form submission
        console.log('Selected Album:', selectedAlbum);
    }

    return (
        <div>
            <h1>Client Page</h1>
            {/* <Modal
                title="Edit Album"
                description="Edit an album you uploaded to the platform"
                isOpen={true}
                onChange={onChange}
            > */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
                    <SearchSelect
                        disabled={isLoading}
                        data={listofThings.map(album => ({ id: album.id, name: album.name }))}
                        onSelect={(selected: string) => setSelectedAlbum(selected)}
                        selected={selectedAlbum}
                        placeholder="Select an Album"
                    />
                    Selected album: {selectedAlbumName}
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            {/* </Modal> */}
        </div>
    );
}

export default CP;