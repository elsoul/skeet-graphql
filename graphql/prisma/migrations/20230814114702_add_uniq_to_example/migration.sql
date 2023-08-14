/*
  Warnings:

  - A unique constraint covering the columns `[vertexChatRoomId,input,output]` on the table `VertexChatRoomExample` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VertexChatRoomExample_vertexChatRoomId_input_output_key" ON "VertexChatRoomExample"("vertexChatRoomId", "input", "output");
