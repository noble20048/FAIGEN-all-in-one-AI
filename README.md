# FAIGEN (All-in-One AI Platform)

FAIGEN is a modular, full-stack multi-provider LLM chat interface engineered using Next.js, TypeScript, and Tailwind CSS. Built around a strict Provider Pattern abstraction framework, the platform allows seamless runtime ecosystem toggling between Google Gemini, OpenAI, and Anthropic while keeping code entirely decoupled from vendor-specific SDK locks.

---

## Key Architectural Highlights

* **Abstract LLM Implementation:** Enforces a unified structural type contract (`AIProvider`) across the codebase, ensuring the frontend never relies directly on any single vendor's SDK structure.
* **Unified State Management:** Uses a centralized React Context layer (`AIContext`) to dynamically handle runtime model switches and track token usage overhead live.
* **Stream-Ready Design:** Leveraging native JavaScript asynchronous generation capabilities (`AsyncGenerator`), the system is designed to pipe chunk-by-chunk tokens directly into your user interfaces.
* **Secure Secret Management:** Operates on an absolute zero-leak policy. API secrets are extracted entirely at runtime through server context boundaries (`process.env`) without any hardcoded variables.

---

## Deep Dive: The Provider Architecture

The core value of FAIGEN lies in its abstract scalability. The architecture breaks down explicitly into three decoupled tiers:

### 1. The Uniform Interface (`/lib/ai/types/llm.types.ts`)
Every integrated model engine must conform to this strict contract, making extensions highly plug-and-play:
```typescript
export interface AIProvider {
  chat(messages: ChatMessage[], options?: { temperature?: number; maxTokens?: number }): Promise<ChatResponse>
  streamChat(messages: ChatMessage[], options?: StreamOptions): AsyncGenerator<string, void, unknown>
  generateEmbedding(text: string): Promise<number[]>
  countTokens(text: string): Promise<number>
}

2. Concrete Implementation (/lib/ai/providers/gemini/client.ts)

The GeminiProvider wraps the official @google/generative-ai SDK. It encapsulates all payload sanitization and formats array structures into schema patterns required by Google's API engines:
TypeScript

const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
const gemini = new GoogleGenerativeAI(API_KEY)

3. Global Context Routing (/context/AIContext.tsx)

A high-level state provider maps configuration trees down to the UI layer, laying down foundational blueprints for immediate multi-vendor scalability:
TypeScript

const MODEL_CONFIGS = {
  gemini: ['gemini-1.5-flash', 'gemini-1.5-pro'],
  openai: ['gpt-4', 'gpt-3.5-turbo'],
  anthropic: ['claude-3-5-sonnet', 'claude-3-haiku'],
}

(Note: While Google Gemini is currently leveraged due to its robust free developer tier, the context mapping layer is pre-wired to support OpenAI and Anthropic scaling instantly as backend credential parameters are provided.)
Security and Git Boundary Audits

This repository implements rigorous production credentials hygiene to insulate your infrastructure against scraper bots:

    API tokens are dynamically read on the server side at runtime.

    Comprehensive local directory tracking blocks are codified straight into your .gitignore rules:

Plaintext

# Env & Secrets
.env
.env.local
.env.development
.env.production
.env*.local

Getting Started Locally
1. Clone the Codebase
Bash

git clone [https://github.com/noble20048/FAIGEN-all-in-one-AI.git](https://github.com/noble20048/FAIGEN-all-in-one-AI.git)
cd FAIGEN-all-in-one-AI

2. Install Project Dependencies
Bash

npm install

3. Initialize Local Secrets

Create a file named .env.local inside the repository root directory. Never track this file. Add your active key:
Code snippet

GOOGLE_GENERATIVE_AI_API_KEY=your_actual_gemini_api_key_here

4. Launch the Sandbox
Bash

npm run dev

Open http://localhost:3000 to work directly inside your local environment sandbox
