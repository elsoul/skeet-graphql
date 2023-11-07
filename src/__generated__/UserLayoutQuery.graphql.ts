/**
 * @generated SignedSource<<de516ac6dbc2f3b45bdc176935a9b75b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type UserLayoutQuery$variables = Record<PropertyKey, never>;
export type UserLayoutQuery$data = {
  readonly me: {
    readonly iconUrl: string | null | undefined;
    readonly id: string | null | undefined;
    readonly username: string | null | undefined;
  } | null | undefined;
};
export type UserLayoutQuery = {
  response: UserLayoutQuery$data;
  variables: UserLayoutQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "me",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "iconUrl",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "username",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserLayoutQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UserLayoutQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "e2df0e061279e0e3f4e002be1f43e55f",
    "id": null,
    "metadata": {},
    "name": "UserLayoutQuery",
    "operationKind": "query",
    "text": "query UserLayoutQuery {\n  me {\n    id\n    iconUrl\n    username\n  }\n}\n"
  }
};
})();

(node as any).hash = "3158b9fc47af5f8d0589ffe0cf786bf1";

export default node;
