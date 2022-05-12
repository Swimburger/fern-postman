import { HttpAuth, HttpEndpoint, HttpMethod, HttpService, IntermediateRepresentation } from "@fern-api/api";
import {
    CollectionDefinition,
    HeaderDefinition,
    ItemDefinition,
    ItemGroupDefinition,
    RequestAuthDefinition,
    RequestDefinition,
    ResponseDefinition,
} from "postman-collection";

const BASE_URL_VARIABLE_NAME = "base_url";
const BASE_URL_VARIABLE = `{{${BASE_URL_VARIABLE_NAME}}}`;
const BASE_URL_DEFAULT_VAULE = "http://localhost:8080";

const APPLICATION_JSON_HEADER_DEFINITION: HeaderDefinition = {
    key: "Content-Type",
    value: "application/json",
};

export function convertToPostmanCollection(ir: IntermediateRepresentation): CollectionDefinition {
    const id = ir.workspaceName ?? "Untitled API";
    return {
        info: {
            id,
            name: id,
        },
        item: getCollectionItems(ir),
        variable: [
            {
                key: BASE_URL_VARIABLE_NAME,
                value: BASE_URL_DEFAULT_VAULE,
            },
        ],
    };
}

function getCollectionItems(ir: IntermediateRepresentation): ItemGroupDefinition[] {
    let serviceItems: ItemGroupDefinition[] = [];
    for (const httpService of ir.services.http) {
        let endpointItems: ItemDefinition[] = [];
        for (const httpEndpoint of httpService.endpoints) {
            endpointItems.push(convertEndpoint(httpEndpoint, httpService));
        }
        const serviceItem: ItemGroupDefinition = {
            name: httpService.name.name,
            item: endpointItems,
        };
        serviceItems.push(serviceItem);
    }
    return serviceItems;
}

function convertEndpoint(httpEndpoint: HttpEndpoint, httpService: HttpService): ItemDefinition {
    let convertedEndpoint: ItemDefinition = {};
    convertedEndpoint.name = httpEndpoint.endpointId;
    convertedEndpoint.request = convertRequest(httpService, httpEndpoint);
    if (httpEndpoint.response != null) {
        convertedEndpoint.response = [convertResponse()];
    }
    return convertedEndpoint;
}

function convertResponse(): ResponseDefinition {
    return {
        code: 200,
        header: [APPLICATION_JSON_HEADER_DEFINITION],
        responseTime: 0,
    };
}

function convertRequest(httpService: HttpService, httpEndpoint: HttpEndpoint): RequestDefinition {
    let convertedRequest: RequestDefinition = {
        url: {
            host: [BASE_URL_VARIABLE],
            path: [
                ...convertPathToPostmanPathArray(httpService.basePath),
                ...convertPathToPostmanPathArray(httpEndpoint.path),
            ],
        },
        header: [APPLICATION_JSON_HEADER_DEFINITION],
        method: convertHttpMethod(httpEndpoint.method),
        auth: httpService.auth != null ? convertAuth(httpService.auth) : undefined,
    };
    if (httpEndpoint.request != null) {
        convertedRequest.description = httpEndpoint.request.docs ?? undefined;
    }
    return convertedRequest;
}

function convertPathToPostmanPathArray(path: string): string[] {
    return path
        .split("/")
        .map((path) => {
            if (path.startsWith("{") && path.endsWith("}")) {
                return ":" + path.substring(1, path.length - 1);
            }
            return path;
        })
        .filter((path) => path.length !== 0);
}

function convertHttpMethod(httpMethod: HttpMethod): string {
    return HttpMethod._visit(httpMethod, {
        get: () => "GET",
        post: () => "POST",
        put: () => "PUT",
        patch: () => "PATCH",
        delete: () => "DELETE",
        _unknown: () => {
            throw new Error("Unexpected httpMethod: " + httpMethod);
        },
    });
}

function convertAuth(httpAuth: HttpAuth): RequestAuthDefinition {
    return HttpAuth._visit(httpAuth, {
        bearer: () => {
            return { type: "bearer" };
        },
        _unknown: () => {
            throw new Error("Unexpected httpAuth:" + httpAuth);
        },
    });
}
