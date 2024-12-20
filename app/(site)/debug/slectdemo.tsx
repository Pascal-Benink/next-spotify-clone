import React from "react";
import * as Select from "@radix-ui/react-select";
import { FaCheck, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

export type SelectType = {
    id: string;
    name: string;
}

interface SearchSelectProps {
    data: SelectType[];
    onSelect: (value: string) => void;
    selected: string | null;
    placeholder: string;
    className?: string;
}

const SelectDemo = ({ data, onSelect, selected, placeholder, className }: SearchSelectProps) => {
    const listofThings: SelectType[] = [
        // {
        //     id: "1",
        //     name: "leek",
        // },
        // {
        //     id: "2",
        //     name: "onion",
        // },
        // {
        //     id: "3",
        //     name: "potato",
        // }
    ];
    return (
        <Select.Root>
            <Select.Trigger className={twMerge("flex w-full rounded-md bg-neutral-700 border border-transparent px-3 py-3 text-sm placeholder:text-neutral-400 focus:outline-none", className)}>
                <Select.Value placeholder={placeholder} />
                <Select.Icon className="absolute right-8" />
            </Select.Trigger>
            <Select.Portal>
                <Select.Content className="overflow-hidden rounded-md bg-neutral-800 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
                    <Select.Viewport className="p-[5px]">
                    <SelectItem value="leek" className="hidden">there is none in listofThings</SelectItem>
                        {listofThings.length === 0 && (
                            <SelectItem value="leek" disabled>there is none in listofThings</SelectItem>
                        )}
                        {listofThings.map((item, index) => (
                            <SelectItem key={index} value={item.id}>{item.name}</SelectItem>
                        ))}
                    </Select.Viewport>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    )
};

interface SelectItemProps {
    children: React.ReactNode;
    className?: string;
    value: string;
    disabled?: boolean;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
    ({ children, className, ...props }, forwardedRef) => {
        return (
            <Select.Item
                className={twMerge(
                    "relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none text-green-500 data-[disabled]:pointer-events-none data-[highlighted]:bg-green-500 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[highlighted]:outline-none",
                    className,
                )}
                {...props}
                ref={forwardedRef}
            >
                <Select.ItemText>{children}</Select.ItemText>
                <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
                    <FaCheck />
                </Select.ItemIndicator>
            </Select.Item>
        );
    },
);

export default SelectDemo;