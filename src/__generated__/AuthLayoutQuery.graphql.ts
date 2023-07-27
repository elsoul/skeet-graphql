/**
 * @generated SignedSource<<158ee0de74ccad16b7712a12ab41231c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type AuthLayoutQuery$variables = {};
export type AuthLayoutQuery$data = {
  readonly me: {
    readonly iconUrl: string | null;
    readonly username: string | null;
  } | null;
};
export type AuthLayoutQuery = {
  response: AuthLayoutQuery$data;
  variables: AuthLayoutQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "iconUrl",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AuthLayoutQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AuthLayoutQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "556f6613eed40e85943106c39ce739aa",
    "id": null,
    "metadata": {},
    "name": "AuthLayoutQuery",
    "operationKind": "query",
    "text": "query AuthLayoutQuery {\n  me {\n    iconUrl\n    username\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "5963d87a30c33315a6e8493b53102296";

export default node;
