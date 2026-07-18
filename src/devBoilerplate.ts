export interface DevFile {
  name: string;
  path: string;
  language: "typescript" | "python" | "yaml" | "dockerfile" | "sql";
  code: string;
}

export const GITHUB_REPOSITORY_TREE = [
  {
    name: "Backend (NestJS)",
    type: "dir",
    children: [
      { name: "src/main.ts", path: "backend/src/main.ts", type: "file" },
      { name: "src/app.module.ts", path: "backend/src/app.module.ts", type: "file" },
      { name: "src/agents/agents.controller.ts", path: "backend/src/agents/agents.controller.ts", type: "file" },
      { name: "src/agents/router.service.ts", path: "backend/src/agents/router.service.ts", type: "file" },
    ]
  },
  {
    name: "AI Microservice (FastAPI)",
    type: "dir",
    children: [
      { name: "main.py", path: "ai/main.py", type: "file" },
      { name: "rag_pipeline.py", path: "ai/rag_pipeline.py", type: "file" },
      { name: "requirements.txt", path: "ai/requirements.txt", type: "file" },
    ]
  },
  {
    name: "Infrastructure & CI/CD",
    type: "dir",
    children: [
      { name: "docker-compose.yml", path: "infra/docker-compose.yml", type: "file" },
      { name: ".github/workflows/deploy.yml", path: "infra/deploy.yml", type: "file" },
    ]
  }
];

export const DEV_FILES_Boilerplate: Record<string, DevFile> = {
  "backend/src/main.ts": {
    name: "main.ts",
    path: "backend/src/main.ts",
    language: "typescript",
    code: `import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({ origin: process.env.CLIENT_URL });
  
  const config = new DocumentBuilder()
    .setTitle('Synapse OS Core API')
    .setDescription('Enterprise Multi-Agent Orchestrator backend API endpoints')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  
  await app.listen(process.env.PORT || 3000);
}
bootstrap();`
  },
  "backend/src/app.module.ts": {
    name: "app.module.ts",
    path: "backend/src/app.module.ts",
    language: "typescript",
    code: `import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentsModule } from './agents/agents.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false, // Always run migrations in production
    }),
    AgentsModule,
    UsersModule,
  ],
})
export class AppModule {}`
  },
  "backend/src/agents/agents.controller.ts": {
    name: "agents.controller.ts",
    path: "backend/src/agents/agents.controller.ts",
    language: "typescript",
    code: `import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RouterService } from './router.service';

@Controller('api/agents')
export class AgentsController {
  constructor(private readonly routerService: RouterService) {}

  @Post('orchestrate')
  @UseGuards(JwtAuthGuard)
  async routeAndResolve(
    @Req() req,
    @Body() body: { query: string; contextId?: string }
  ) {
    const userId = req.user.id;
    return this.routerService.routeWorkload({
      userId,
      query: body.query,
      contextId: body.contextId
    });
  }
}`
  },
  "backend/src/agents/router.service.ts": {
    name: "router.service.ts",
    path: "backend/src/agents/router.service.ts",
    language: "typescript",
    code: `import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class RouterService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  async routeWorkload(payload: { userId: string; query: string; contextId?: string }) {
    // 1. Analyze complexity of query using cheap model
    // 2. Select model (Gemini 3.5 Flash for classification, Claude/Pro for logic)
    // 3. Inject memory context from vector store
    // 4. Return formatted answer with token billing calculation
    return {
      routedModel: 'gemini-3.5-flash',
      latencyMs: 120,
      tokensUsed: 430,
      costUsd: 0.0003,
      response: "Resolution processed successfully with cross-agent shared memory."
    };
  }
}`
  },
  "ai/main.py": {
    name: "main.py",
    path: "ai/main.py",
    language: "python",
    code: `from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rag_pipeline import RAGProcessor

app = FastAPI(title="Synapse AI RAG Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryPayload(BaseModel):
    document_id: str
    question: str

rag_processor = RAGProcessor()

@app.post("/api/ai/rag")
async def execute_rag(payload: QueryPayload):
    try:
        response = await rag_processor.query_vector_store(payload.document_id, payload.question)
        return {"status": "success", "answer": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))`
  },
  "ai/rag_pipeline.py": {
    name: "rag_pipeline.py",
    path: "ai/rag_pipeline.py",
    language: "python",
    code: `import openai
from qdrant_client import QdrantClient

class RAGProcessor:
    def __init__(self):
        # Read keys from env variables
        self.qdrant = QdrantClient(url="https://qdrant-cluster.cloud")
        
    async def query_vector_store(self, doc_id: str, query: str):
        # 1. Embed query using text-embedding-3-small
        # 2. Search Qdrant collection using document filter
        # 3. Augment prompt with top 3 contexts
        # 4. Generate grounded completion
        return f"Grounded response based on verified RAG vector nodes of doc_id {doc_id}."`
  },
  "ai/requirements.txt": {
    name: "requirements.txt",
    path: "ai/requirements.txt",
    language: "python",
    code: `fastapi==0.110.0
uvicorn==0.28.0
qdrant-client==1.8.0
openai==1.14.1
pydantic==2.6.4
numpy==1.26.4`
  },
  "infra/docker-compose.yml": {
    name: "docker-compose.yml",
    path: "infra/docker-compose.yml",
    language: "yaml",
    code: `version: '3.8'

services:
  nest-backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://synapse_admin:prod_secure_pass@postgres-db:5432/synapse_prod
      - REDIS_URL=redis://redis-cache:6379
      - GEMINI_API_KEY=\${GEMINI_API_KEY}
    depends_on:
      - postgres-db
      - redis-cache

  postgres-db:
    image: postgres:16-alpine
    restart: always
    environment:
      - POSTGRES_USER=synapse_admin
      - POSTGRES_PASSWORD=prod_secure_pass
      - POSTGRES_DB=synapse_prod
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis-cache:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:`
  },
  "infra/deploy.yml": {
    name: "deploy.yml",
    path: "infra/deploy.yml",
    language: "yaml",
    code: `name: Production Serverless Scale-to-Zero Deployment

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Authenticate with Google Cloud
        uses: google-github-actions/auth@v2
        with:
          credentials_json: \${{ secrets.GCP_SA_KEY }}

      - name: Build and Push Docker image
        run: |
          docker build -t gcr.io/\${{ secrets.GCP_PROJECT_ID }}/synapse-core:latest .
          docker push gcr.io/\${{ secrets.GCP_PROJECT_ID }}/synapse-core:latest

      - name: Deploy to Cloud Run
        uses: google-github-actions/deploy-cloudrun@v2
        with:
          service: synapse-enterprise-os
          image: gcr.io/\${{ secrets.GCP_PROJECT_ID }}/synapse-core:latest
          region: us-central1
          flags: --min-instances=0 --max-instances=100 --cpu-throttling`
  }
};

export const POSTGRES_TABLES_SCHEMA = [
  {
    tableName: "users",
    description: "Core table containing active customers, auth roles, and pricing tiers.",
    columns: [
      { name: "id", type: "UUID", desc: "Primary Key, auto-generated", isPk: true },
      { name: "email", type: "VARCHAR(255)", desc: "Unique subscriber email address", isPk: false },
      { name: "role", type: "VARCHAR(50)", desc: "RBAC Tier (admin, manager, viewer, billing)", isPk: false },
      { name: "subscription_tier", type: "VARCHAR(50)", desc: "Active billing tier (starter, growth, enterprise)", isPk: false },
      { name: "stripe_customer_id", type: "VARCHAR(100)", desc: "External Stripe billing link", isPk: false },
      { name: "created_at", type: "TIMESTAMP", desc: "User sign up date", isPk: false },
    ]
  },
  {
    tableName: "agent_memories",
    description: "Persistent memory store for the multi-agent system. Synchronizes semantic context.",
    columns: [
      { name: "id", type: "BIGSERIAL", desc: "Primary Key", isPk: true },
      { name: "user_id", type: "UUID", desc: "FK linking memory node to specific corporate workspace", isPk: false },
      { name: "agent_id", type: "VARCHAR(50)", desc: "The ID of the specialized agent (e.g., support, legal)", isPk: false },
      { name: "memory_vector_id", type: "VARCHAR(255)", desc: "Reference to semantic vector index in Qdrant store", isPk: false },
      { name: "summary_context", type: "TEXT", desc: "Grounded conversational synopsis of past events", isPk: false },
      { name: "updated_at", type: "TIMESTAMP", desc: "Last memory merge synchronization", isPk: false },
    ]
  },
  {
    tableName: "usage_logs",
    description: "Tracks granular LLM consumption, token sizes, model names, and real billing cost.",
    columns: [
      { name: "id", type: "BIGSERIAL", desc: "Primary Key", isPk: true },
      { name: "user_id", type: "UUID", desc: "FK linking usage to specific billed customer", isPk: false },
      { name: "model_routed", type: "VARCHAR(100)", desc: "Actual model that resolved query (gemini, claude, deepseek)", isPk: false },
      { name: "input_tokens", type: "INTEGER", desc: "Input payload token count", isPk: false },
      { name: "output_tokens", type: "INTEGER", desc: "Generated response token count", isPk: false },
      { name: "cost_usd", type: "NUMERIC(10, 6)", desc: "Direct platform cost saved vs raw APIs", isPk: false },
      { name: "created_at", type: "TIMESTAMP", desc: "Timestamp of request", isPk: false },
    ]
  }
];

export const MOCK_API_ENDPOINTS = [
  {
    method: "POST",
    url: "/api/agents/chat",
    desc: "Send query to specialized LLM agents using system-instruction routing.",
    payload: `{
  "agentId": "marketing",
  "message": "Write a LinkedIn post about SaaS pricing strategy.",
  "history": []
}`,
    response: `{
  "success": true,
  "text": "📊 SaaS pricing isn't about covering costs. It's about capturing value...",
  "agentId": "marketing"
}`
  },
  {
    method: "POST",
    url: "/api/business/generate",
    desc: "Generate production-grade legal, financial, or strategic documents.",
    payload: `{
  "type": "roadmap",
  "companyName": "ForgeOS",
  "description": "Multi-agent framework",
  "targetAudience": "Enterprises"
}`,
    response: `{
  "success": true,
  "text": "## 📂 AUTOMATED ROADMAP\\n\\n### Q1: Core Foundation..."
}`
  }
];
