/**
 * @generated SignedSource<<dcb05d40e102723b806e5f0ef77f92ae>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type VertexChatBoxQuery$variables = {
  after?: string | null;
  before?: string | null;
  chatRoomId?: string | null;
  first?: number | null;
  last?: number | null;
};
export type VertexChatBoxQuery$data = {
  readonly getVertexChatRoom: {
    readonly VertexChatRoomExample: ReadonlyArray<{
      readonly id: string | null;
    } | null> | null;
    readonly VertexChatRoomMessage: ReadonlyArray<{
      readonly content: string;
      readonly id: string | null;
    } | null> | null;
    readonly context: string;
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
  readonly " $fragmentSpreads": FragmentRefs<"VertexChatExamples_query">;
};
export type VertexChatBoxQuery = {
  response: VertexChatBoxQuery$data;
  variables: VertexChatBoxQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "after"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "before"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "chatRoomId"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "first"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "last"
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updatedAt",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "content",
  "storageKey": null
},
v9 = [
  (v5/*: any*/)
],
v10 = {
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
    (v5/*: any*/),
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
      "name": "context",
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
    (v6/*: any*/),
    (v7/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "VertexChatRoomMessage",
      "kind": "LinkedField",
      "name": "VertexChatRoomMessage",
      "plural": true,
      "selections": [
        (v5/*: any*/),
        (v8/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "VertexChatRoomExample",
      "kind": "LinkedField",
      "name": "VertexChatRoomExample",
      "plural": true,
      "selections": (v9/*: any*/),
      "storageKey": null
    }
  ],
  "storageKey": null
},
v11 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v12 = {
  "kind": "Variable",
  "name": "vertexChatRoomId",
  "variableName": "chatRoomId"
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hasNextPage",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": [
    (v11/*: any*/),
    (v12/*: any*/)
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
            (v5/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "role",
              "storageKey": null
            },
            (v8/*: any*/),
            (v6/*: any*/),
            (v7/*: any*/)
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
        (v13/*: any*/)
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
      "selections": (v9/*: any*/),
      "storageKey": null
    }
  ],
  "storageKey": null
},
v15 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "before",
    "variableName": "before"
  },
  (v11/*: any*/),
  {
    "kind": "Variable",
    "name": "last",
    "variableName": "last"
  },
  (v12/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "VertexChatBoxQuery",
    "selections": [
      (v10/*: any*/),
      (v14/*: any*/),
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "VertexChatExamples_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v3/*: any*/),
      (v0/*: any*/),
      (v4/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "VertexChatBoxQuery",
    "selections": [
      (v10/*: any*/),
      (v14/*: any*/),
      {
        "alias": null,
        "args": (v15/*: any*/),
        "concreteType": "VertexChatRoomExampleConnection",
        "kind": "LinkedField",
        "name": "getVertexChatRoomExampleConnection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "VertexChatRoomExampleEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "VertexChatRoomExample",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "input",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "output",
                    "storageKey": null
                  },
                  (v6/*: any*/),
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "VertexChatRoomExample",
            "kind": "LinkedField",
            "name": "nodes",
            "plural": true,
            "selections": (v9/*: any*/),
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
                "name": "endCursor",
                "storageKey": null
              },
              (v13/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasPreviousPage",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "startCursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v15/*: any*/),
        "filters": [
          "vertexChatRoomId"
        ],
        "handle": "connection",
        "key": "VertexChatExamples_getVertexChatRoomExampleConnection",
        "kind": "LinkedHandle",
        "name": "getVertexChatRoomExampleConnection"
      }
    ]
  },
  "params": {
    "cacheID": "eec68096707f521cfe3a1d53f5f13528",
    "id": null,
    "metadata": {},
    "name": "VertexChatBoxQuery",
    "operationKind": "query",
    "text": "query VertexChatBoxQuery(\n  $first: Int\n  $after: String\n  $last: Int\n  $before: String\n  $chatRoomId: String\n) {\n  getVertexChatRoom(id: $chatRoomId) {\n    id\n    maxTokens\n    title\n    model\n    temperature\n    context\n    topP\n    topK\n    createdAt\n    updatedAt\n    VertexChatRoomMessage {\n      id\n      content\n    }\n    VertexChatRoomExample {\n      id\n    }\n  }\n  getVertexChatRoomMessages(first: $first, vertexChatRoomId: $chatRoomId) {\n    edges {\n      node {\n        id\n        role\n        content\n        createdAt\n        updatedAt\n      }\n    }\n    pageInfo {\n      hasNextPage\n    }\n    nodes {\n      id\n    }\n  }\n  ...VertexChatExamples_query\n}\n\nfragment VertexChatExamples_query on Query {\n  getVertexChatRoomExampleConnection(first: $first, after: $after, last: $last, before: $before, vertexChatRoomId: $chatRoomId) {\n    edges {\n      node {\n        id\n        input\n        output\n        createdAt\n        updatedAt\n        __typename\n      }\n      cursor\n    }\n    nodes {\n      id\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a0507105142ff70240f2f763e4b2e9e0";

export default node;
