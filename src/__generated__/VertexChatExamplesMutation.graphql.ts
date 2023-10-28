/**
 * @generated SignedSource<<cbf633d68632cf9f4bfd01df05ace260>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type VertexChatRoomExampleUpsertInput = {
  id?: string | null | undefined;
  input?: string | null | undefined;
  output?: string | null | undefined;
  vertexChatRoomId?: string | null | undefined;
};
export type VertexChatExamplesMutation$variables = {
  input?: ReadonlyArray<VertexChatRoomExampleUpsertInput | null | undefined> | null | undefined;
};
export type VertexChatExamplesMutation$data = {
  readonly upsertVertexChatRoomExamples: ReadonlyArray<{
    readonly id: string | null | undefined;
  } | null | undefined> | null | undefined;
};
export type VertexChatExamplesMutation = {
  response: VertexChatExamplesMutation$data;
  variables: VertexChatExamplesMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "data",
        "variableName": "input"
      }
    ],
    "concreteType": "VertexChatRoomExample",
    "kind": "LinkedField",
    "name": "upsertVertexChatRoomExamples",
    "plural": true,
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "VertexChatExamplesMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "VertexChatExamplesMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f96b845c975dc3ad8dbd7ef602fe9899",
    "id": null,
    "metadata": {},
    "name": "VertexChatExamplesMutation",
    "operationKind": "mutation",
    "text": "mutation VertexChatExamplesMutation(\n  $input: [VertexChatRoomExampleUpsertInput]\n) {\n  upsertVertexChatRoomExamples(data: $input) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "7cbd553ec80eba5028605a738c95df65";

export default node;
