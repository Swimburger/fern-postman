import { convertToPostmanCollection } from "../convertToPostmanCollection";

describe("index", () => {
    it("dummy", () => {
        convertToPostmanCollection({
            workspaceName: undefined,
            types: [],
            errors: [],
            services: {
                http: [],
                websocket: [],
            },
        });
    });
});
