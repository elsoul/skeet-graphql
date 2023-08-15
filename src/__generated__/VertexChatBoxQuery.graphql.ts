/**
 * @generated SignedSource<<f30bc4715a7456ca6f7f7e5d751e2acc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type VertexChatBoxQuery$variables = {
  chatRoomId?: string | null;
  first?: number | null;
};
export type VertexChatBoxQuery$data = {
  readonly getVertexChatRoom: {
    readonly createdAt: any;
    readonly id: string | null;
    readonly maxTokens: number;
    readonly model: string;
    readonly temperature: number;
    readonly title: string | null;
    readonly topK: number;
    readonly topP: number;
    readonly updatedAt: any;
  } | null;
  readonly getVertexChatRoomMessages: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly content: string;
        readonly createdAt: any;
        readonly id: string | null;
        readonly role: string;
        readonly updatedAt: any;
      } | null;
    } | null> | null;
    readonly nodes: ReadonlyArray<{
      readonly id: string | null;
    } | null> | null;
    readonly pageInfo: {
      readonly hasNextPage: boolean;
    };
  } | null;
};
export type VertexChatBoxQuery = {
  response: VertexChatBoxQuery$data;
  variables: VertexChatBoxQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "chatRoomId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "first"
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updatedAt",
  "storageKey": null
},
v5 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "chatRoomId"
      }
    ],
    "concreteType": "VertexChatRoom",
    "kind": "LinkedField",
    "name": "getVertexChatRoom",
    "plural": false,
    "selections": [
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "maxTokens",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "title",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "model",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "temperature",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "topP",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "topK",
        "storageKey": null
      },
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "first",
        "variableName": "first"
      },
      {
        "kind": "Variable",
        "name": "vertexChatRoomId",
        "variableName": "chatRoomId"
      }
    ],
    "concreteType": "VertexChatRoomMessageConnection",
    "kind": "LinkedField",
    "name": "getVertexChatRoomMessages",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "VertexChatRoomMessageEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "VertexChatRoomMessage",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "role",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "content",
                "storageKey": null
              },
              (v3/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "PageInfo",
        "kind": "LinkedField",
        "name": "pageInfo",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasNextPage",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "VertexChatRoomMessage",
        "kind": "LinkedField",
        "name": "nodes",
        "plural": true,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "VertexChatBoxQuery",
    "selections": (v5/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "VertexChatBoxQuery",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "34a546720e8f3b71442f3893e13d890e",
    "id": null,
    "metadata": {},
    "name": "VertexChatBoxQuery",
    "operationKind": "query",
    "text": "query VertexChatBoxQuery(\n  $first: Int\n  $chatRoomId: String\n) {\n  getVertexChatRoom(id: $chatRoomId) {\n    id\n    maxTokens\n    title\n    model\n    temperature\n    topP\n    topK\n    createdAt\n    updatedAt\n  }\n  getVertexChatRoomMessages(first: $first, vertexChatRoomId: $chatRoomId) {\n    edges {\n      node {\n        id\n        role\n        content\n        createdAt\n        updatedAt\n      }\n    }\n    pageInfo {\n      hasNextPage\n    }\n    nodes {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "12ef20634cbc9437085e556da8f1f26f";

export default node;
