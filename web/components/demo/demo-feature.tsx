'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { ExplorerLink } from '../cluster/cluster-ui';
import { WalletButton } from '../solana/solana-provider';
import { AppHero, ellipsify } from '../ui/ui-layout';
import { useTrustProgram } from './demo-data-access';
import { BusinessCreate, BusinessList } from './demo-ui';

export default function DemoFeature() {
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
