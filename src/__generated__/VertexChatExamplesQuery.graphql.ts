/**
 * @generated SignedSource<<83d9995e5fbfd92120713a19e3374448>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type VertexChatExamplesQuery$variables = {
  after?: string | null;
  before?: string | null;
  chatRoomId?: string | null;
  first?: number | null;
  last?: number | null;
};
export type VertexChatExamplesQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"VertexChatExamples_query">;
};
export type VertexChatExamplesQuery = {
  response: VertexChatExamplesQuery$data;
  variables: VertexChatExamplesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "before"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "chatRoomId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "last"
  }
],
v1 = [
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
  },
  {
    "kind": "Variable",
    "name": "vertexChatRoomId",
    "variableName": "chatRoomId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "VertexChatExamplesQuery",
    "selections": [
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "VertexChatExamplesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "VertexChatRoomExampleConnection",
        "kind": "LinkedField",
        "name": "getVertexChatRoomExamples",
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
                  (v2/*: any*/),
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
            "selections": [
              (v2/*: any*/)
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
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "filters": [
          "vertexChatRoomId"
        ],
        "handle": "connection",
        "key": "VertexChatExamples_getVertexChatRoomExamples",
        "kind": "LinkedHandle",
        "name": "getVertexChatRoomExamples"
      }
    ]
  },
  "params": {
    "cacheID": "0f33a4a961441e3ffe18412264493341",
    "id": null,
    "metadata": {},
    "name": "VertexChatExamplesQuery",
    "operationKind": "query",
    "text": "query VertexChatExamplesQuery(\n  $after: String\n  $before: String\n  $chatRoomId: String\n  $first: Int\n  $last: Int\n) {\n  ...VertexChatExamples_query\n}\n\nfragment VertexChatExamples_query on Query {\n  getVertexChatRoomExamples(first: $first, after: $after, last: $last, before: $before, vertexChatRoomId: $chatRoomId) {\n    edges {\n      node {\n        id\n        input\n        output\n        createdAt\n        updatedAt\n        __typename\n      }\n      cursor\n    }\n    nodes {\n      id\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "58cb5b0c8a702f8eeff713e247609321";

export default node;
