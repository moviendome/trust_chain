'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { ExplorerLink } from '@/cluster/cluster-ui';
import { WalletButton } from '@/components/solana/solana-provider';
import { AppHero, ellipsify } from '@/ui/ui-layout';
import { useTrustProgram } from '@/components/demo/demo-data-access';
import { BusinessCreate, BusinessList } from '@/components/demo';

export default function Page() {
  const { publicKey } = useWallet();
  const { programId } = useTrustProgram();

  return publicKey ? (
    <div className='pb-16'>
      <BusinessCreate />
      <BusinessList />
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
