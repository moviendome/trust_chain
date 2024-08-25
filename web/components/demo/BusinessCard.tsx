import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useTrustProgram, useTrustProgramAccount } from '@/components/demo/demo-data-access';
import { ellipsify } from '@/components/ui/ui-layout';

const BusinessCard = ({ account }: { account: PublicKey }) => {
  const {
    accountQuery,
    // deleteBusiness,
  } = useTrustProgramAccount({ account });

  const { reviewAccounts, setBusinessFilter } = useTrustProgram();

  const { publicKey } = useWallet();
  const name = accountQuery.data?.name;

  useEffect(() => {
    setBusinessFilter(account.toString());
  }, [name]); // This effect depends on newBusinessFilter

  if (!publicKey) {
    return <p>Connect your wallet</p>
  }

  const rating = reviewAccounts.data ? reviewAccounts.data.reduce((sum, review) => sum + review?.account.rating, 0) / reviewAccounts.data.length : 0;

  return accountQuery.isLoading ? (
    <div className="card bg-base-100 w-96 shadow-xl relative">
      <div className="skeleton h-72 w-full"></div>
      <div className="card-body">
        <h2 className="card-title">
        <div className="skeleton h-4 w-48"></div>
        </h2>
        <div className="skeleton h-4 w-28"></div>
      </div>
    </div>
  ) : (
    <div className="card bg-base-100 w-96 shadow-xl relative">
      <a href={`/demo/${account.toString()}`} className="relative aspect-w-4 aspect-h-3">
        <img
          src={accountQuery.data?.cover}
          alt={accountQuery.data?.name}
          className="object-cover"
        />
        <img
          src={accountQuery.data?.profile}
          alt={accountQuery.data?.name}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full border-2 border-white" // adjust size and position as needed
        />
      </a>
      <div className="card-body">
        <h2 className="card-title">
          {accountQuery.data?.name}
            { !isNaN(rating) && (
              <>
                <div className="badge badge-secondary">
                  <span className='pt-1 pr-1'>{parseFloat(rating.toFixed(1))}</span>
                  <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" />
                </div>
              </>
            )}
        </h2>
        <p>{accountQuery.data?.address}</p>
        <p>{ellipsify(account.toString())}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{accountQuery.data?.category}</div>
        </div>

        {/* <button */}
        {/*   className="btn btn-link" */}
        {/*   onClick={() => { */}
        {/*     if ( */}
        {/*       !window.confirm( */}
        {/*         'Are you sure you want to close this account?' */}
        {/*       ) */}
        {/*     ) { */}
        {/*       return; */}
        {/*     } */}
        {/*     const name = accountQuery.data?.name; */}
        {/*     if (name) { */}
        {/*       return deleteBusiness.mutateAsync(name); */}
        {/*     } */}
        {/*   }} */}
        {/*   disabled={deleteBusiness.isPending} */}
        {/* > */}
        {/*   Delete */}
        {/* </button> */}
      </div>
    </div>
  );
}

export default BusinessCard;
