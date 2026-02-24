# 🗳️ EkMat - Zero-Knowledge Blockchain Voting Platform

EkMat is a privacy-first e-voting system built on Ethereum. It leverages **Zero-Knowledge Proofs (ZKPs)** to enable voters to prove their eligibility without revealing their identity on the blockchain.

---

## 🏗️ Project Architecture

- **Blockchain**: Local Ganache network for decentralized state.
- **Privacy**: Circom for ZK circuits and SnarkJS for client-side proof generation.
- **Frontend**: React + Vite (Typescript) with Framer Motion for a premium UI.
- **Backend**: Express.js relay with AI-powered assistance (EkSaathi).

---

## 🚀 Quick Start Tutorial

Follow these steps in order to get the project running locally.

### 📋 Prerequisites
- **Node.js**: v18 or higher
- **npm**: v9 or higher

### 🛠️ Step 1: Clone and Install
```bash
# Install all dependencies (Monorepo setup)
npm install
```

### ⚙️ Step 2: Environment Setup
1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and add your **GEMINI_API_KEY**.
3. (Optional) Add your Pinata keys if you want to test candidate photo uploads.

### ⛓️ Step 3: Start the Local Blockchain
In a **new terminal**, start the persistent local blockchain:
```bash
npm run chain
```
*Leave this running. It acts as your local Ethereum network on `http://127.0.0.1:8545`.*

### 🔐 Step 4: Setup ZK Circuits
In your **main terminal**, run the development setup for circuits:
```bash
npm run setup:circuits
```
*Note: In development, this generates mock circuit files to bypass the long compilation process.*

### 📜 Step 5: Deploy Smart Contracts
Deploy the voting contracts to your local chain:
```bash
npm run deploy:ganache
```

### 💻 Step 6: Launch the Application
Open **two more terminals** for the frontend and backend:

**Start Backend:**
```bash
npm run dev:backend
```

**Start Frontend:**
```bash
npm run dev:frontend
```

---

## 🖥️ Usage Guide

- **Voter Portal**: [http://localhost:5173](http://localhost:5173) - Connect your wallet (Metamask) to cast your vote.
- **Admin Dashboard**: [http://localhost:5173/admin](http://localhost:5173/admin) - Setup elections and manage candidates.
- **EkSaathi Chatbot**: Click the floating bubble on the home page for AI-powered voting assistance.

---

## 🛠️ Technology Stack
| Layer | Technology |
|---|---|
| **Smart Contracts** | Solidity, Hardhat, Ganache |
| **Privacy (ZK)** | Circom, SnarkJS |
| **Frontend** | React, Vite, Framer Motion, Ethers.js |
| **Backend** | Express, Node.js, Google Gemini AI |
| **Styling** | Vanilla CSS, Lucide Icons |

---

Developed with ❤️ by the **EkMat Team**.
