import { FernGeneratorExec } from "@fern-fern/generator-exec-client";
export declare class GeneratorNotificationService {
    sendUpdate: (update: FernGeneratorExec.GeneratorUpdate) => Promise<void>;
    constructor(generatorConfig: FernGeneratorExec.GeneratorConfig);
}
