import React, { useEffect, useState } from 'react';
import { SUPPORTED_CHAIN_ID, SUPPORTED_CHAIN_NAME, BLOCK_EXPLORER_URL } from '../utils/constants';

interface NetworkBadgeProps {
    style?: React.CSSProperties;
}

export const NetworkBadge: React.FC<NetworkBadgeProps> = ({ style }) => {
    const [chainId, setChainId] = useState<number | null>(null);
    const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);

    useEffect(() => {
        const checkNetwork = async () => {
            if (window.ethereum) {
                try {
                    const id = await window.ethereum.request({ method: 'eth_chainId' });
                    const numericId = parseInt(id, 16);
                    setChainId(numericId);
                    setIsCorrectNetwork(numericId === SUPPORTED_CHAIN_ID);
                } catch (e) {
                    console.error('Failed to get chain ID:', e);
                }
            }
        };

        checkNetwork();

        if (window.ethereum) {
            window.ethereum.on('chainChanged', (id: string) => {
                const numericId = parseInt(id, 16);
                setChainId(numericId);
                setIsCorrectNetwork(numericId === SUPPORTED_CHAIN_ID);
            });
        }
    }, []);

    const switchToSepolia = async () => {
        if (!window.ethereum) return;
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x' + SUPPORTED_CHAIN_ID.toString(16) }],
            });
        } catch (error: any) {
            // Chain not added to wallet, add it
            if (error.code === 4902) {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: '0x' + SUPPORTED_CHAIN_ID.toString(16),
                        chainName: SUPPORTED_CHAIN_NAME,
                        rpcUrls: ['https://rpc.sepolia.org'],
                        blockExplorerUrls: [BLOCK_EXPLORER_URL],
                        nativeCurrency: {
                            name: 'Sepolia ETH',
                            symbol: 'ETH',
                            decimals: 18,
                        },
                    }],
                });
            }
        }
    };

    const getNetworkName = (id: number): string => {
        switch (id) {
            case 1: return 'Mainnet';
            case 5: return 'Goerli';
            case 11155111: return 'Sepolia';
            case 1337: return 'Localhost';
            case 137: return 'Polygon';
            case 80001: return 'Mumbai';
            default: return `Chain ${id}`;
        }
    };

    if (!chainId) {
        return (
            <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 600,
                background: 'rgba(160, 174, 192, 0.15)',
                color: '#A0AEC0',
                border: '1px solid rgba(160, 174, 192, 0.3)',
                ...style,
            }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#A0AEC0' }} />
                No Wallet
            </div>
        );
    }

    if (!isCorrectNetwork) {
        return (
            <button
                onClick={switchToSepolia}
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    background: 'rgba(245, 101, 101, 0.15)',
                    color: '#F56565',
                    border: '1px solid rgba(245, 101, 101, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    ...style,
                }}
                title={`Currently on ${getNetworkName(chainId)}. Click to switch to ${SUPPORTED_CHAIN_NAME}.`}
            >
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#F56565', animation: 'pulse 2s infinite' }} />
                ⚠️ Wrong Network — Switch to {SUPPORTED_CHAIN_NAME}
            </button>
        );
    }

    return (
        <a
            href={BLOCK_EXPLORER_URL}
            target="_blank"
            rel="noreferrer"
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: 600,
                background: 'rgba(72, 187, 120, 0.15)',
                color: '#48BB78',
                border: '1px solid rgba(72, 187, 120, 0.3)',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                ...style,
            }}
            title={`Connected to ${SUPPORTED_CHAIN_NAME}. Click to view on Etherscan.`}
        >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#48BB78' }} />
            🔗 {SUPPORTED_CHAIN_NAME}
        </a>
    );
};
