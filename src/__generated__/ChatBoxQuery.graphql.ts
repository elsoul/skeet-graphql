/**
 * @generated SignedSource<<44252fc303dcb06810f26b83ee51fd80>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ChatBoxQuery$variables = {
  chatRoomId?: string | null;
  first?: number | null;
};
export type ChatBoxQuery$data = {
  readonly chatRoomMessageConnection: {
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
export type ChatBoxQuery = {
  response: ChatBoxQuery$data;
  variables: ChatBoxQuery$variables;
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
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "chatRoomId",
        "variableName": "chatRoomId"
      },
      {
        "kind": "Variable",
        "name": "first",
        "variableName": "first"
      }
    ],
    "concreteType": "QueryChatRoomMessageConnection_Connection",
    "kind": "LinkedField",
    "name": "chatRoomMessageConnection",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ChatRoomMessageEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ChatRoomMessage",
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
        "concreteType": "ChatRoomMessage",
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
    "name": "ChatBoxQuery",
    "selections": (v3/*: any*/),
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
    "name": "ChatBoxQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "cba29ff1379722a032423736839f8106",
    "id": null,
    "metadata": {},
    "name": "ChatBoxQuery",
    "operationKind": "query",
    "text": "query ChatBoxQuery(\n  $first: Int\n  $chatRoomId: String\n) {\n  chatRoomMessageConnection(first: $first, chatRoomId: $chatRoomId) {\n    edges {\n      node {\n        id\n        role\n        content\n        createdAt\n        updatedAt\n      }\n    }\n    pageInfo {\n      hasNextPage\n    }\n    nodes {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e8a1f1c2c80a5b2abadaa1224547f444";

export default node;
