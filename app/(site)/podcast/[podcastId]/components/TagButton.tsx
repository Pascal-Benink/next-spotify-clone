"use client"

import Button from "@/components/Button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";

interface TagButtonProps {
    tag: { name: string, id: string };
}

const TagButton = ({ tag }: TagButtonProps) => {
    const supabaseClient = useSupabaseClient();

    return (
        <Link href={`/tag/${tag.id}`}>
            <Button className="bg-natual-600 ">
                {tag.name}
            </Button>
        </Link>
    );
}

export default TagButton;