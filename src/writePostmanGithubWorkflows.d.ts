import { GeneratorConfig, GithubOutputMode } from "@fern-fern/generator-exec-client/api";
export declare function writePostmanGithubWorkflows({ config, githubOutputMode, }: {
    config: GeneratorConfig;
    githubOutputMode: GithubOutputMode;
}): Promise<void>;
