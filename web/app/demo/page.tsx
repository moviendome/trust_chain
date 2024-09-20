'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletButton } from '@/components/solana/solana-provider';
import { BusinessCreate, BusinessList } from '@/components/demo';

export default function Page() {
  const { publicKey } = useWallet();

  return publicKey ? (
    <div className='pb-16'>
      <BusinessList />
      <BusinessCreate />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton className="btn btn-primary" />
        </div>
      </div>
    </div>
  );
}
