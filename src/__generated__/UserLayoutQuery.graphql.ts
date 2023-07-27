/**
 * @generated SignedSource<<3a610f2fa9cb747f798856e2c73e4cd1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type UserLayoutQuery$variables = {};
export type UserLayoutQuery$data = {
  readonly me: {
    readonly iconUrl: string | null;
    readonly username: string | null;
  } | null;
};
export type UserLayoutQuery = {
  response: UserLayoutQuery$data;
  variables: UserLayoutQuery$variables;
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
    "name": "UserLayoutQuery",
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
    "name": "UserLayoutQuery",
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
    "cacheID": "88bfa86067a9edb358a7d80e4f9ed0c8",
    "id": null,
    "metadata": {},
    "name": "UserLayoutQuery",
    "operationKind": "query",
    "text": "query UserLayoutQuery {\n  me {\n    iconUrl\n    username\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "288f848ffe905cb3282dc44a771ee2cd";

export default node;
