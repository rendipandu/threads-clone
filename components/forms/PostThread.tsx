"use client"

import * as z from "zod"
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod";
import { useOrganization } from "@clerk/nextjs";

import { usePathname, useRouter } from "next/navigation";

import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";

interface Props {
    userId: string;
}

function PostThread({ userId }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const { organization } = useOrganization();

    const form = useForm({
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
            thread: '',
            accountId: userId,
        }
    });

    const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
        await createThread({
            text: values.thread,
            author: userId,
            communityId: organization ? organization.id : null,
            path: pathname
        });

        router.push("/");
        form.reset();
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col justify-start gap-5"
            >
                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-full gap-3">
                            <FormLabel className="text-base-semibold text-light-2">
                                Content
                            </FormLabel>
                            <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                                <Textarea
                                    placeholder="Create threads..."
                                    rows={1}
                                    {...field}
                                    className="overflow-hidden resize-none max-h-52"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="bg-primary-500"
                >
                    Post Thread
                </Button>
            </form>
        </Form>
    )
}

export default PostThread;