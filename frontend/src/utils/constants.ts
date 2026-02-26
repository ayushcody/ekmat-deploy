// Contract Addresses - Update after each deployment
// These are loaded from environment variables if available, falling back to the last known deployment

// Sepolia Testnet - Deployed Contract Addresses
export const EKMAT_VOTING_ADDRESS =
    import.meta.env.VITE_EKMAT_VOTING_ADDRESS ||
    "0xCB6B64c68C961245adeB0425a35b51C2A9f91A1d"; // Sepolia deployment Feb 2026

export const VERIFIER_ADDRESS =
    import.meta.env.VITE_VERIFIER_ADDRESS ||
    "0xf483afe4A82d6E9Ef4ef50536cB934252bC87689"; // Sepolia deployment Feb 2026

// Network Configuration
export const SUPPORTED_CHAIN_ID = 11155111; // Sepolia
export const SUPPORTED_CHAIN_NAME = "Sepolia Testnet";
export const BLOCK_EXPLORER_URL = "https://sepolia.etherscan.io";

// API Configuration
export const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.PROD ? '/api' : 'http://localhost:3001/api');
