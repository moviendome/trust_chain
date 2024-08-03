'use client';

import { Keypair } from '@solana/web3.js';
import { useState } from 'react';
import { ellipsify } from '../ui/ui-layout';
import { ExplorerLink } from '../cluster/cluster-ui';
import {
  useTrustProgram,
  useTrustProgramAccount,
} from './trust-data-access';
import { useWallet } from '@solana/wallet-adapter-react';

export function TrustCreate() {
  const { createBusiness} = useTrustProgram();
  const { publicKey } = useWallet();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [category, setCategory] = useState("");
  const [url, setUrl] = useState("");

  const isFormValid = name.trim() !== "" & avatar.trim() !== ""  & category.trim() !== ""  & url.trim() !== "";

  const handleSubmit = () => {
    if (publicKey && isFormValid) {
      createBusiness.mutateAsync({ name, avatar, category, url, owner: publicKey });
    }
  };

  if (!publicKey) {
    return <p>Connect your wallet</p>
  }

  return (
    <div>
      <input
        type='text'
        placeholder='name'
        value={name}
        onChange={e => setName(e.target.value)}
        className='input input-bordered w-full max-w-xs'
      />

      <input
        type='text'
        placeholder='avatar'
        value={avatar}
        onChange={e => setAvatar(e.target.value)}
        className='input input-bordered w-full max-w-xs'
      />

      <input
        type='text'
        placeholder='category'
        value={category}
        onChange={e => setCategory(e.target.value)}
        className='input input-bordered w-full max-w-xs'
      />

      <input
        type='text'
        placeholder='url'
        value={url}
        onChange={e => setUrl(e.target.value)}
        className='input input-bordered w-full max-w-xs'
      />


      <button
        className="btn btn-xs lg:btn-md btn-primary"
        onClick={handleSubmit}
        disabled={createBusiness.isPending && !isFormValid}
      >
        Create {createBusiness.isPending && '...'}
      </button>
    </div>
  );
}

export function TrustList() {
  const { accounts, getProgramAccount } = useTrustProgram();

  if (getProgramAccount.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  if (!getProgramAccount.data?.value) {
    return (
      <div className="alert alert-info flex justify-center">
        <span>
          Program account not found. Make sure you have deployed the program and
          are on the correct cluster.
        </span>
      </div>
    );
  }
  return (
    <div className={'space-y-6'}>
      {accounts.isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : accounts.data?.length ? (
        <div className="grid md:grid-cols-2 gap-4">
          {accounts.data?.map((account) => (
            <BusinessCard
              key={account.publicKey.toString()}
              account={account.publicKey}
            />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className={'text-2xl'}>No accounts</h2>
          No accounts found. Create one above to get started.
        </div>
      )}
    </div>
  );
}

function BusinessCard({ account }: { account: PublicKey }) {
  const {
    accountQuery,
    updateEntry,
    deleteEntry,
  } = useTrustProgramAccount({ account });

  const { publicKey } = useWallet();
  const [avatar, setAvatar] = useState("");
  const name = accountQuery.data?.name;

  const isFormValid = avatar.trim() !== "";

  const handleSubmit = () => {
    if (publicKey && isFormValid && namme) {
      updateEntry.mutateAsync({ name, avatar, owner: publicKey });
    }
  };

  if (!publicKey) {
    return <p>Connect your wallet</p>
  }

  return accountQuery.isLoading ? (
    <span className="loading loading-spinner loading-lg"></span>
  ) : (
    <div className="card card-bordered border-base-300 border-4 text-neutral-content">
      <div className="card-body items-center text-center">
        <div className="space-y-6">
          <h2
            className="card-title justify-center text-3xl cursor-pointer"
            onClick={() => accountQuery.refetch()}
          >
            {accountQuery.data?.name}
          </h2>
          <p>{accountQuery.data?.avatar}</p>
          <div className="card-actions justify-around">
            <textarea
              placeholder='New Message'
              value={avatar}
              onChange={e => setMessage(e.target.value)}
              className='textarea textarea-bordered w-full max-w-xs'
            />

            <button
              className="btn btn-xs lg:btn-md btn-primary"
              onClick={handleSubmit}
              disabled={updateEntry.isPending && !isFormValid}
            >
              Update {updateEntry.isPending && '...'}
            </button>
          </div>
          <div className="text-center space-y-4">
            <p>
              <ExplorerLink
                path={`account/${account}`}
                label={ellipsify(account.toString())}
              />
            </p>
            <button
              className="btn btn-xs btn-secondary btn-outline"
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
                  return deleteEntry.mutateAsync(name);
                }
              }}
              disabled={deleteEntry.isPending}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
