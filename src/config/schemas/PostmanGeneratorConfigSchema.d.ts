import { z } from "zod";
export declare const PostmanGeneratorConfigSchema: z.ZodUnion<[z.ZodNull, z.ZodUndefined, z.ZodObject<{
    publishing: z.ZodOptional<z.ZodObject<{
        apiKey: z.ZodString;
        workspaceId: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        workspaceId?: string | undefined;
        apiKey: string;
    }, {
        workspaceId?: string | undefined;
        apiKey: string;
    }>>;
}, "strict", z.ZodTypeAny, {
    publishing?: {
        workspaceId?: string | undefined;
        apiKey: string;
    } | undefined;
}, {
    publishing?: {
        workspaceId?: string | undefined;
        apiKey: string;
    } | undefined;
}>]>;
export declare type PostmanGeneratorConfigSchema = z.infer<typeof PostmanGeneratorConfigSchema>;
