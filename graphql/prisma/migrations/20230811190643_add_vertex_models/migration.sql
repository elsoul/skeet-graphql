-- CreateTable
CREATE TABLE "VertexChatRoom" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "title" TEXT,
    "model" TEXT NOT NULL DEFAULT 'chat-bison@001',
    "maxTokens" INTEGER NOT NULL DEFAULT 256,
    "temperature" DOUBLE PRECISION NOT NULL DEFAULT 0.2,
    "topP" DOUBLE PRECISION NOT NULL DEFAULT 0.95,
    "topK" INTEGER NOT NULL DEFAULT 40,
    "context" TEXT NOT NULL DEFAULT 'You are a developer who is knowledgeable about the Skeet framework, a framework for building web applications.',
    "isShered" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VertexChatRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VertexChatRoomExample" (
    "id" SERIAL NOT NULL,
    "vertexChatRoomId" INTEGER NOT NULL,
    "input" TEXT NOT NULL DEFAULT 'What is the Skeet framework?',
    "output" TEXT NOT NULL DEFAULT 'The Skeet framework is a Typescript framework for building web applications using Typescript and React.',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VertexChatRoomExample_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserVertexChatRoom" (
    "userId" INTEGER NOT NULL,
    "vertexChatRoomId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserVertexChatRoom_pkey" PRIMARY KEY ("userId","vertexChatRoomId")
);

-- CreateTable
CREATE TABLE "VertexChatRoomMessage" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "vertexChatRoomId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VertexChatRoomMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VertexChatRoom_name_idx" ON "VertexChatRoom"("name");

-- CreateIndex
CREATE INDEX "VertexChatRoom_title_idx" ON "VertexChatRoom"("title");

-- CreateIndex
CREATE INDEX "VertexChatRoomExample_input_idx" ON "VertexChatRoomExample"("input");

-- CreateIndex
CREATE INDEX "VertexChatRoomExample_output_idx" ON "VertexChatRoomExample"("output");

-- CreateIndex
CREATE INDEX "VertexChatRoomMessage_content_idx" ON "VertexChatRoomMessage"("content");

-- AddForeignKey
ALTER TABLE "VertexChatRoomExample" ADD CONSTRAINT "VertexChatRoomExample_vertexChatRoomId_fkey" FOREIGN KEY ("vertexChatRoomId") REFERENCES "VertexChatRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVertexChatRoom" ADD CONSTRAINT "UserVertexChatRoom_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVertexChatRoom" ADD CONSTRAINT "UserVertexChatRoom_vertexChatRoomId_fkey" FOREIGN KEY ("vertexChatRoomId") REFERENCES "VertexChatRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VertexChatRoomMessage" ADD CONSTRAINT "VertexChatRoomMessage_vertexChatRoomId_fkey" FOREIGN KEY ("vertexChatRoomId") REFERENCES "VertexChatRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
