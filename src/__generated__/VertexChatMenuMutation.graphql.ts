/**
 * @generated SignedSource<<e310eb19ecec4b1b0586fad5444c4d62>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type VertexChatMenuMutation$variables = {
  isShared?: boolean | null | undefined;
  maxTokens?: number | null | undefined;
  model?: string | null | undefined;
  systemContent?: string | null | undefined;
  temperature?: number | null | undefined;
  topK?: number | null | undefined;
  topP?: number | null | undefined;
};
export type VertexChatMenuMutation$data = {
  readonly createVertexChatRoom: {
    readonly id: string | null | undefined;
  } | null | undefined;
};
export type VertexChatMenuMutation = {
  response: VertexChatMenuMutation$data;
  variables: VertexChatMenuMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "isShared"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "maxTokens"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "model"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "systemContent"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "temperature"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topK"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topP"
},
v7 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "context",
        "variableName": "systemContent"
      },
      {
        "kind": "Variable",
        "name": "isShared",
        "variableName": "isShared"
      },
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
        "name": "temperature",
        "variableName": "temperature"
      },
      {
        "kind": "Variable",
        "name": "topK",
        "variableName": "topK"
      },
      {
        "kind": "Variable",
        "name": "topP",
        "variableName": "topP"
      }
    ],
    "concreteType": "VertexChatRoom",
    "kind": "LinkedField",
    "name": "createVertexChatRoom",
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
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "VertexChatMenuMutation",
    "selections": (v7/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v1/*: any*/),
      (v4/*: any*/),
      (v3/*: any*/),
      (v0/*: any*/),
      (v6/*: any*/),
      (v5/*: any*/)
    ],
    "kind": "Operation",
    "name": "VertexChatMenuMutation",
    "selections": (v7/*: any*/)
  },
  "params": {
    "cacheID": "4ae3ac49ae7f85a6a5bae00ea3cdf54a",
    "id": null,
    "metadata": {},
    "name": "VertexChatMenuMutation",
    "operationKind": "mutation",
    "text": "mutation VertexChatMenuMutation(\n  $model: String\n  $maxTokens: Int\n  $temperature: Float\n  $systemContent: String\n  $isShared: Boolean\n  $topP: Float\n  $topK: Int\n) {\n  createVertexChatRoom(model: $model, maxTokens: $maxTokens, temperature: $temperature, context: $systemContent, isShared: $isShared, topP: $topP, topK: $topK) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "805121180fc94a24d93eb4ffe8c224af";

export default node;
