import { z } from "zod";
export declare const PublishConfigSchema: z.ZodObject<{
    apiKey: z.ZodString;
    workspaceId: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    workspaceId?: string | undefined;
    apiKey: string;
}, {
    workspaceId?: string | undefined;
    apiKey: string;
}>;
export declare type PublishConfigSchema = z.infer<typeof PublishConfigSchema>;
