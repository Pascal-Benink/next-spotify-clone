import React from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";
import { HiChevronRight } from "react-icons/hi";
import { FaCheck, FaDownload, FaTrashAlt } from "react-icons/fa";
import { RxDotFilled } from "react-icons/rx";
import { MdOutlineModeEditOutline } from "react-icons/md";

interface SongRightClickContentProps {
	isOwner: boolean;
}

const SongRightClickContent: React.FC<SongRightClickContentProps> = ({ isOwner }) => {
	const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
	const [urlsChecked, setUrlsChecked] = React.useState(false);
	const [person, setPerson] = React.useState("pedro");

	return (
		<ContextMenu.Portal>
			<ContextMenu.Content
				className="min-w-[220px] overflow-hidden rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] bg-neutral-950"
			>
				<ContextMenu.Item className="group relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none text-green-600 
				outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-green-500 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1">
					<div className="absolute left-0 inline-flex w-[25px] items-center justify-center">
						<FaDownload />
					</div>
					Download Song
				</ContextMenu.Item>


				{isOwner && (
					<>

						<ContextMenu.Separator className="m-[5px] h-px bg-neutral-700" />

						<ContextMenu.Sub>
							<ContextMenu.SubTrigger className="group relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none text-green-600 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-green-500 data-[highlighted]:data-[state=open]:bg-green-500 data-[state=open]:bg-green-300 data-[disabled]:text-mauve8 data-[highlighted]:data-[state=open]:text-violet1 data-[highlighted]:text-violet1 data-[state=open]:text-green-600">
								<div className="absolute left-0 inline-flex w-[25px] items-center justify-center">
									<MdOutlineModeEditOutline />
								</div>
								Edit song
								<div className="ml-auto pl-5 text-mauve11 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white">
									<HiChevronRight />
								</div>
							</ContextMenu.SubTrigger>
							<ContextMenu.Portal>
								<ContextMenu.SubContent
									className="min-w-[220px] overflow-hidden rounded-md bg-neutral-800 p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
									sideOffset={2}
									alignOffset={-5}
								>
									<ContextMenu.Item className="relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none text-green-600 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-green-500 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1">
										Edit Song
									</ContextMenu.Item>
									<ContextMenu.Separator className="m-[5px] h-px bg-neutral-700" />
									<ContextMenu.Item className="relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none text-green-600 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-green-500 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1">
										Add lyrics
									</ContextMenu.Item>
								</ContextMenu.SubContent>
							</ContextMenu.Portal>
						</ContextMenu.Sub>

						<ContextMenu.Item
							className="group relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none text-green-600 
						outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-green-500 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
						>
							<div className="absolute left-0 inline-flex w-[25px] items-center justify-center">
								<FaTrashAlt />
							</div>
							Delete Song
						</ContextMenu.Item>
					</>
				)}

				{/* <ContextMenu.CheckboxItem
					className="group relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none text-green-600 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-green-500 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
					checked={bookmarksChecked}
					onCheckedChange={setBookmarksChecked}
				>
					<ContextMenu.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
						<FaCheck />
					</ContextMenu.ItemIndicator>
					Show Bookmarks{" "}
					<div className="ml-auto pl-5 text-mauve11 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white">
						⌘+B
					</div>
				</ContextMenu.CheckboxItem>
				<ContextMenu.CheckboxItem
					className="relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none text-green-600 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-green-500 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
					checked={urlsChecked}
					onCheckedChange={setUrlsChecked}
				>
					<ContextMenu.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
						<FaCheck />
					</ContextMenu.ItemIndicator>
					Show Full URLs
				</ContextMenu.CheckboxItem> */}
			</ContextMenu.Content>
		</ContextMenu.Portal>
	);
};

export default SongRightClickContent;