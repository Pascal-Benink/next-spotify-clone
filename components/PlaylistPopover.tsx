"use client";

import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FaEllipsisH } from "react-icons/fa";import { HiOutlineTrash } from "react-icons/hi";;

const PlaylistPopover = () => {
    return (
        <div>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <button>
                        <FaEllipsisH color={'white'} size={25} />
                    </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content
                        className="py-2 min-w-[220px] rounded-md bg-neutral-900 p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
                    >
                        <DropdownMenu.Item className="flex flex-row justify-between cursor-pointer focus:outline-none hover:text-white px-3" >
                            Delete Playlist <HiOutlineTrash  size={20} className="text-neutral-400" /> 
                            {/* TODO: make a delete playlist action */}
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </div>
    );
}

export default PlaylistPopover;