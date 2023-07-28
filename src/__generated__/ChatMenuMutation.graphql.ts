/**
 * @generated SignedSource<<5bc04432c434e32b75d5f8a1942c8670>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ChatMenuMutation$variables = {
  maxTokens?: number | null;
  model?: string | null;
  stream?: boolean | null;
  temperature?: number | null;
};
export type ChatMenuMutation$data = {
  readonly createChatRoom: {
    readonly id: string | null;
  } | null;
};
export type ChatMenuMutation = {
  response: ChatMenuMutation$data;
  variables: ChatMenuMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "maxTokens"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "model"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "stream"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "temperature"
},
v4 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "maxTokens",
        "variableName": "maxTokens"
      },
      {
        "kind": "Variable",
        "name": "model",
        "variableName": "model"
      },
      {
        "kind": "Variable",
        "name": "stream",
        "variableName": "stream"
      },
      {
        "kind": "Variable",
        "name": "temperature",
        "variableName": "temperature"
      }
    ],
    "concreteType": "ChatRoom",
    "kind": "LinkedField",
    "name": "createChatRoom",
    "plural": false,
    "selections": [
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
    "name": "ChatMenuMutation",
    "selections": (v4/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "ChatMenuMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "f3ff266c31d8ecf774b769b1bbb64cfd",
    "id": null,
    "metadata": {},
    "name": "ChatMenuMutation",
    "operationKind": "mutation",
    "text": "mutation ChatMenuMutation(\n  $model: String\n  $maxTokens: Int\n  $temperature: Int\n  $stream: Boolean\n) {\n  createChatRoom(model: $model, maxTokens: $maxTokens, temperature: $temperature, stream: $stream) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "9a80efe773b470fd5b7d389e4ba1e3f0";

export default node;
