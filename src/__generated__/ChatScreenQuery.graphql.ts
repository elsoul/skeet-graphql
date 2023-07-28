/**
 * @generated SignedSource<<f6173aa9f890523a66d09d74672dc1c0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ChatScreenQuery$variables = {
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
};
export type ChatScreenQuery$data = {
  readonly chatRoomConnection: {
    readonly edges: ReadonlyArray<{
      readonly cursor: string;
      readonly node: {
        readonly createdAt: any;
        readonly id: string | null;
        readonly maxTokens: number;
        readonly model: string;
        readonly temperature: number;
        readonly title: string | null;
        readonly updatedAt: any;
      } | null;
    } | null> | null;
    readonly nodes: ReadonlyArray<{
      readonly id: string | null;
    } | null> | null;
    readonly pageInfo: {
      readonly endCursor: string | null;
      readonly hasNextPage: boolean;
      readonly hasPreviousPage: boolean;
      readonly startCursor: string | null;
    };
  } | null;
};
export type ChatScreenQuery = {
  response: ChatScreenQuery$data;
  variables: ChatScreenQuery$variables;
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
  "name": "first"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "last"
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
  {
    "alias": null,
    "args": [
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
      {
        "kind": "Variable",
        "name": "first",
        "variableName": "first"
      },
      {
        "kind": "Variable",
        "name": "last",
        "variableName": "last"
      }
    ],
    "concreteType": "QueryChatRoomConnection_Connection",
    "kind": "LinkedField",
    "name": "chatRoomConnection",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ChatRoomEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "cursor",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ChatRoom",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v4/*: any*/),
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
                "name": "model",
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
                "name": "createdAt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "updatedAt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "temperature",
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
        "args": null,
        "concreteType": "ChatRoom",
        "kind": "LinkedField",
        "name": "nodes",
        "plural": true,
        "selections": [
          (v4/*: any*/)
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
            "name": "endCursor",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasNextPage",
            "storageKey": null
          },
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
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ChatScreenQuery",
    "selections": (v5/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v3/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "ChatScreenQuery",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "53976a80e7d3fc87198f1d2e01ab4343",
    "id": null,
    "metadata": {},
    "name": "ChatScreenQuery",
    "operationKind": "query",
    "text": "query ChatScreenQuery(\n  $first: Int\n  $after: String\n  $last: Int\n  $before: String\n) {\n  chatRoomConnection(first: $first, after: $after, last: $last, before: $before) {\n    edges {\n      cursor\n      node {\n        id\n        maxTokens\n        model\n        title\n        createdAt\n        updatedAt\n        temperature\n      }\n    }\n    nodes {\n      id\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ae895e2cc34277c7937cce53792ccc93";

export default node;
