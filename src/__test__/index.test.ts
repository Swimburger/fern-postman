import { generateIntermediateRepresentation } from "@fern-api/ir-generator";
import { loadWorkspaceConfiguration } from "@fern-api/workspace-configuration";
import path from "path";
import { convertToPostmanCollection } from "../convertToPostmanCollection";

describe("Postman Conversion", () => {
    it("Blog Post API", async () => {
        const testApiDir = path.join(__dirname, "test-api");
        const parsed = await loadWorkspaceConfiguration({
            name: "Blog API",
            absolutePathToDefinition: path.join(testApiDir, "src"),
        });
        if (!parsed.didSucceed) {
            throw new Error(JSON.stringify(parsed.failures));
        }
        const intermediateRepresentation = generateIntermediateRepresentation(parsed.workspace);
        const postmanCollection = convertToPostmanCollection(intermediateRepresentation);
        expect(postmanCollection).toMatchSnapshot();
    });
});
