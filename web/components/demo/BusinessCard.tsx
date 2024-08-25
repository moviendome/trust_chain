import React, { memo, useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useTrustProgram, useTrustProgramAccount } from '@/components/demo/demo-data-access';
import { ellipsify } from '@/components/ui/ui-layout';

const BusinessCard = ({ account }: { account: PublicKey }) => {
  const {
    accountQuery,
    updateEntry,
    deleteBusiness,
  } = useTrustProgramAccount({ account });

  const { reviewAccounts, createReview, setBusinessFilter } = useTrustProgram();

  const { publicKey } = useWallet();
  const [avatar, setAvatar] = useState("");
  const name = accountQuery.data?.name;
  const [business, setBusiness] = useState("");

  useEffect(() => {
    setBusinessFilter(account.toString());
  }, [name]); // This effect depends on newBusinessFilter

  const isFormValid = avatar.trim() !== "";

  const handleSubmit = () => {
    if (publicKey && isFormValid && name) {
      updateEntry.mutateAsync({ name, avatar, owner: publicKey });
    }
  };

  const handleSubmitReview = () => {
    const title = "My second Review";
    const rating = 4;
    const comment = "Nice environment, Live music";
    const business = account.toString();
    createReview.mutateAsync({ title, rating, comment, business, owner: publicKey });
  };

  if (!publicKey) {
    return <p>Connect your wallet</p>
  }

  const rating = reviewAccounts.data ? reviewAccounts.data.reduce((sum, review) => sum + review?.account.rating, 0) / reviewAccounts.data.length : 0;

  return accountQuery.isLoading ? (
    <span className="loading loading-spinner loading-lg"></span>
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

        <button
          className="btn btn-link"
          onClick={() => {
            if (
              !window.confirm(
                'Are you sure you want to close this account?'
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
          Delete
        </button>
      </div>
    </div>
  );
}

export default memo(BusinessCard);
