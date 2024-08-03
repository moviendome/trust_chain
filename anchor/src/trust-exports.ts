// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Cluster, PublicKey } from '@solana/web3.js';
import TrustIDL from '../target/idl/trust_chain.json';
import type { Trust } from '../target/types/trust_chain';

// Re-export the generated IDL and type
export { Trust, TrustIDL };

// The programId is imported from the program IDL.
export const TRUST_PROGRAM_ID = new PublicKey(TrustIDL.address);

// This is a helper function to get the Counter Anchor program.
export function getTrustProgram(provider: AnchorProvider) {
  return new Program(TrustIDL as Trust, provider);
}

// This is a helper function to get the program ID for the Counter program depending on the cluster.
export function getTrustProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Counter program on devnet and testnet.
      return new PublicKey('F3G1Aa1T1qMjf9EGnBgkJ86t1fzYC2Fg6nWma843YUNe');
    case 'mainnet-beta':
    default:
      return TRUST_PROGRAM_ID;
  }
}
