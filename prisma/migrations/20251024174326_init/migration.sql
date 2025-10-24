-- CreateTable
CREATE TABLE "USER" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" TIMESTAMP(3),

    CONSTRAINT "USER_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "APIKEY" (
    "id" TEXT NOT NULL,
    "api_key_name" TEXT NOT NULL,
    "api_key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" TIMESTAMP(3),
    "userId" TEXT,

    CONSTRAINT "APIKEY_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AGENT" (
    "id" TEXT NOT NULL,
    "agent_name" TEXT NOT NULL,
    "idDeploy" BOOLEAN,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" TIMESTAMP(3),

    CONSTRAINT "AGENT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OPENAINODE" (
    "id" TEXT NOT NULL,
    "system_params" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" TIMESTAMP(3),
    "api_key_id" TEXT,
    "node_id" TEXT,

    CONSTRAINT "OPENAINODE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NODE" (
    "id" TEXT NOT NULL,
    "name_id" TEXT NOT NULL,
    "data_label" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "position_x" INTEGER NOT NULL,
    "position_y" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" TIMESTAMP(3),
    "agent_id" TEXT,

    CONSTRAINT "NODE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EDGE" (
    "id" TEXT NOT NULL,
    "edge_id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" TIMESTAMP(3),
    "agent_id" TEXT,

    CONSTRAINT "EDGE_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "USER_email_key" ON "USER"("email");

-- CreateIndex
CREATE UNIQUE INDEX "APIKEY_api_key_key" ON "APIKEY"("api_key");

-- CreateIndex
CREATE UNIQUE INDEX "OPENAINODE_node_id_key" ON "OPENAINODE"("node_id");

-- AddForeignKey
ALTER TABLE "APIKEY" ADD CONSTRAINT "APIKEY_userId_fkey" FOREIGN KEY ("userId") REFERENCES "USER"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AGENT" ADD CONSTRAINT "AGENT_userId_fkey" FOREIGN KEY ("userId") REFERENCES "USER"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OPENAINODE" ADD CONSTRAINT "OPENAINODE_api_key_id_fkey" FOREIGN KEY ("api_key_id") REFERENCES "APIKEY"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OPENAINODE" ADD CONSTRAINT "OPENAINODE_node_id_fkey" FOREIGN KEY ("node_id") REFERENCES "NODE"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NODE" ADD CONSTRAINT "NODE_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "AGENT"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EDGE" ADD CONSTRAINT "EDGE_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "AGENT"("id") ON DELETE CASCADE ON UPDATE CASCADE;
