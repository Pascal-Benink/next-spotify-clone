import * as Select from "@radix-ui/react-select";
import { useState, forwardRef } from "react";
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

const SearchSelect = forwardRef<HTMLDivElement, SearchSelectProps>(
    ({ data, onSelect, selected, placeholder, className }, ref) => {
        const [searchTerm, setSearchTerm] = useState("");

        const filteredData = data.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <Select.Root onValueChange={onSelect} value={selected ?? undefined}>
                <Select.Trigger className={twMerge("flex w-full rounded-md bg-neutral-700 border border-transparent px-3 py-3 text-sm placeholder:text-neutral-400 focus:outline-none", className)}>
                    <Select.Value placeholder={placeholder} />
                    <Select.Icon />
                </Select.Trigger>

                <Select.Portal>
                    <Select.Content>
                        <Select.ScrollUpButton />
                        <Select.Viewport>
                            <div style={{ padding: "8px" }}>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search..."
                                    className={twMerge("flex w-full rounded-md bg-neutral-700 border border-transparent px-3 py-3 text-sm placeholder:text-neutral-400 focus:outline-none")}
                                />
                            </div>
                            {filteredData.map((item, index) => (
                                <Select.Item key={index} value={item.id}>
                                    <Select.ItemText>{item.name}</Select.ItemText>
                                    <Select.ItemIndicator />
                                </Select.Item>
                            ))}
                        </Select.Viewport>
                        <Select.ScrollDownButton />
                        <Select.Arrow />
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        );
    }
);

SearchSelect.displayName = 'SearchSelect';

export default SearchSelect;