"use client"

import * as RadixSlider from "@radix-ui/react-slider";

interface PlayerSliderProps {
    duration: number | null;
    currentTime: number | null;
    // handleChange?: (value: number) => void;
}

const PlayerSlider: React.FC<PlayerSliderProps> = ({
    duration,
    currentTime,
    // handleChange
}) => {
    if (!duration)
    {
        duration = 1;
    }
    if (!currentTime)
    {
        currentTime = 0;
    }

    return (
        <RadixSlider.Root
            className="
        relative
        flex
        items-center
        select-none
        touch-none
        w-[240px]
        mx-2
        h-10
        "
            defaultValue={[duration]}
            value={[currentTime]}
            // onValueChange={handleChange}
            max={1}
            step={0.1}
            aria-label="Duration"
        >
            <RadixSlider.Track
                className="
            bg-neutral-600
            relative
            grow
            rounded-full
            h-[3px]
            "
            >
                <RadixSlider.Range
                    className="absolute bg-white rounded-full h-full"
                />
            </RadixSlider.Track>
        </RadixSlider.Root>
    );
}

export default PlayerSlider;