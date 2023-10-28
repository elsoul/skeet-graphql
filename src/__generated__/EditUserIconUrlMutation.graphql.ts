/**
 * @generated SignedSource<<cd3050d38e32d5f16ef590334c7d5ba6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type EditUserIconUrlMutation$variables = {
  iconUrl?: string | null | undefined;
  id?: string | null | undefined;
};
export type EditUserIconUrlMutation$data = {
  readonly updateUser: {
    readonly iconUrl: string | null | undefined;
  } | null | undefined;
};
export type EditUserIconUrlMutation = {
  response: EditUserIconUrlMutation$data;
  variables: EditUserIconUrlMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "iconUrl"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = [
  {
    "kind": "Variable",
    "name": "iconUrl",
    "variableName": "iconUrl"
  },
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "iconUrl",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "EditUserIconUrlMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "updateUser",
        "plural": false,
        "selections": [
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "EditUserIconUrlMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "updateUser",
        "plural": false,
        "selections": [
          (v3/*: any*/),
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
    "cacheID": "5b67f4816eb4231b4290f1c765d40979",
    "id": null,
    "metadata": {},
    "name": "EditUserIconUrlMutation",
    "operationKind": "mutation",
    "text": "mutation EditUserIconUrlMutation(\n  $id: String\n  $iconUrl: String\n) {\n  updateUser(id: $id, iconUrl: $iconUrl) {\n    iconUrl\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "03b84bcd94f4d2883aba2bbff9e24147";

export default node;
