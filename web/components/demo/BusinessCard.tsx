import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useTrustProgram, useTrustProgramAccount } from '@/components/demo/demo-data-access';
import { ellipsify } from '@/components/ui/ui-layout';

const BusinessCard = ({ account }: { account: PublicKey }) => {
  const {
    accountQuery,
    deleteBusiness,
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
    <div className='card bg-base-100 w-96 shadow-xl relative'>
      <div className='skeleton h-72 w-full'></div>
      <div className='card-body'>
        <h2 className='card-title'>
          <div className='skeleton h-4 w-48'></div>
        </h2>
        <div className='skeleton h-4 w-28'></div>
      </div>
    </div>
  ) : (
      <div className='card bg-base-100 w-96 shadow-xl relative'>
        <a href={`/demo/${account.toString()}`} className='relative aspect-w-4 aspect-h-3'>
          <img
            src={accountQuery.data?.cover}
            alt={accountQuery.data?.name}
            className='object-cover'
          />
          <img
            src={accountQuery.data?.profile}
            alt={accountQuery.data?.name}
            className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full border-2 border-white' // adjust size and position as needed
          />
        </a>
        <div className='card-body'>
          <h2 className='card-title'>
            {accountQuery.data?.name}
            { !isNaN(rating) && (
              <>
                <div className='badge badge-secondary'>
                  <span className='pt-1 pr-1'>{parseFloat(rating.toFixed(1))}</span>
                  <input type='radio' name='rating-4' className='mask mask-star-2 bg-green-500' />
                </div>
              </>
            )}
          </h2>
          <p>{accountQuery.data?.address}</p>
          <p>{ellipsify(account.toString())}</p>

          <div className='card-actions justify-end' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className='badge badge-outline'>{accountQuery.data?.category}</div>
            <button
              className='btn btn-square'
              onClick={() => {
                if (
                  !window.confirm(
                    'Are you sure you want to close this business?'
                  )
                ) {
                  return;
                }
                const name = accountQuery.data?.name;
                if (name) {
                  return deleteBusiness.mutateAsync(name);
                }
              }}
              disabled={deleteBusiness.isPending}
            >
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' width='24' height='24'>
                <path fill='white' d='M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z'/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
}

export default BusinessCard;
