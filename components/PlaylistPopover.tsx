"use client";

import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FaEllipsisH } from "react-icons/fa";;

const PlaylistPopover = () => {

    return (
        <div>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <button
                    >
                        <FaEllipsisH color={'white'} size={25} />
                    </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content>
                        <DropdownMenu.Item>
                            Delete Playlist
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </div>
    );
}

export default PlaylistPopover;