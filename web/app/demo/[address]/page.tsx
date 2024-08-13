'use client';

import { useEffect, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { ellipsify } from '../../../components/ui/ui-layout';
import {
  useTrustProgram,
  useTrustProgramAccount,
} from '../../../components/demo/demo-data-access';


export default function Page({ params }: { params: { address: string } }) {
  const account = new PublicKey(params?.address);
  const { accountQuery } = useTrustProgramAccount({ account });
  const { reviewAccounts, setBusinessFilter } = useTrustProgram();

  useEffect(() => {
    setBusinessFilter(account.toString());
  }, []); // This effect depends on newBusinessFilter

  const rating = reviewAccounts.data ? reviewAccounts.data.reduce((sum, review) => sum + review?.account.rating, 0) / reviewAccounts.data.length : 0;
  const reviews = reviewAccounts.data?.length > 0 ? reviewAccounts.data : [];

  return accountQuery.isLoading ? (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  ) : (
    <div className='max-w-4xl mx-auto mt-16'>
      <div className="card bg-base-100 shadow-xl">
        <figure className="relative aspect-w-4 aspect-h-3">
          <img
            src={accountQuery.data?.cover}
            alt={accountQuery.data?.name}
            className="object-cover"
          />
          <img
            src={accountQuery.data?.profile} // replace with the path to your logo
            alt={accountQuery.data?.name}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full border-2 border-white" // adjust size and position as needed
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {accountQuery.data?.name}
            { !isNaN(rating) && (
              <div className="badge badge-secondary">{parseFloat(rating.toFixed(1))}</div>
            )}
          </h2>
          <p>{accountQuery.data?.address}</p>
          <p>{ellipsify(account.toString())}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">{accountQuery.data?.category}</div>
          </div>
        </div>
      </div>

      <br />

      { reviews.map((review, index) => (
        <div key={index} className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{ review?.account?.title }</h2>
            <p>{ review?.account?.comment }</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
