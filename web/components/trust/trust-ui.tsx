'use client';

import { Keypair } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import { ellipsify } from '../ui/ui-layout';
import { ExplorerLink } from '../cluster/cluster-ui';
import {
  useTrustProgram,
  useTrustProgramAccount,
} from './trust-data-access';
import { useWallet } from '@solana/wallet-adapter-react';

export function TrustCreate() {
  const { createBusiness } = useTrustProgram();
  const { publicKey } = useWallet();
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [profile, setProfile] = useState("");
  const [cover, setCover] = useState("");
  const [url, setUrl] = useState("");

  const isFormValid = name.trim() !== "";

  const handleSubmit = () => {
    if (publicKey && isFormValid) {
      createBusiness.mutateAsync({ category, name, address, profile, cover, owner: publicKey });
    }
  };

  if (!publicKey) {
    return <p>Connect your wallet</p>
  }

  return (
    <div>
      <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>open modal</button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

            <input
              type='text'
              placeholder='name'
              value={name}
              onChange={e => setName(e.target.value)}
              className='input input-bordered w-full max-w-xs'
            />

            <input
              type='text'
              placeholder='address'
              value={address}
              onChange={e => setAddress(e.target.value)}
              className='input input-bordered w-full max-w-xs'
            />

            <input
              type='text'
              placeholder='profile'
              value={profile}
              onChange={e => setProfile(e.target.value)}
              className='input input-bordered w-full max-w-xs'
            />

            <input
              type='text'
              placeholder='cover'
              value={cover}
              onChange={e => setCover(e.target.value)}
              className='input input-bordered w-full max-w-xs'
            />

            <input
              type='text'
              placeholder='category'
              value={category}
              onChange={e => setCategory(e.target.value)}
              className='input input-bordered w-full max-w-xs'
            />

            <button
              className="btn btn-xs lg:btn-md btn-primary"
              onClick={handleSubmit}
              disabled={createBusiness.isPending && !isFormValid}
            >
              Create {createBusiness.isPending && '...'}
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export function TrustList() {
  const { accounts, getProgramAccount, setCategoryFilter } = useTrustProgram();

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
    <div>
      <div className="rounded-b-box rounded-se-box relative overflow-x-auto">
        <div className="preview bg-base-100 rounded-b-box rounded-se-box flex min-h-[6rem] min-w-[18rem] flex-wrap items-center justify-center gap-2 overflow-x-hidden bg-cover bg-top p-4">
            {["All", "Brunch", "Burger", "Chinese", "Coffee", "Pizza", "Ramen", "Thai"]
.map((category, index) => (
              <button key={index} onClick={() => setCategoryFilter(category)} className="badge badge-outline">
                {category}
              </button>
            ))}
        </div>
      </div>
      <div className={'space-y-6'}>
        {accounts.isLoading ? (
          <span className="loading loading-spinner loading-lg"></span>
        ) : accounts.data?.length ? (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
    </div>
  );
}

function BusinessCard({ account }: { account: PublicKey }) {
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
  // setBusinessFilter(account.toString());

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
    const title = "My third awesome review";
    const rating = 3;
    const comment = "Quiet, good coffee & stuning view!";
    const business = account.toString();
    // console.log(business);
    createReview.mutateAsync({ title, rating, comment, business, owner: publicKey });
  };

  if (!publicKey) {
    return <p>Connect your wallet</p>
  }

  // reviewAccounts.data?.forEach((review) => {
  //   console.log(review?.account?.rating);
  // });

  const rating = reviewAccounts.data ? reviewAccounts.data.reduce((sum, review) => sum + review?.account.rating, 0) / reviewAccounts.data.length : 0;

  return accountQuery.isLoading ? (
    <span className="loading loading-spinner loading-lg"></span>
  ) : (
    <div className="card bg-base-100 w-96 shadow-xl relative">
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
          // className="absolute inset-0 m-auto w-16 h-16 transform translate-y-1/2 bg-white rounded-full border-2 border-white" // adjust size and position as needed
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {accountQuery.data?.name}
          {/* <div className="badge badge-secondary">{reviewAccounts.data?.length}</div> */}
            { !isNaN(rating) && (
              <div className="badge badge-secondary">{parseFloat(rating.toFixed(1))}</div>
            )}
        </h2>
        <p>{accountQuery.data?.address}</p>
        <p>{ellipsify(account.toString())}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{accountQuery.data?.category}</div>
        </div>
        <button
          className="btn btn-xs btn-secondary btn-outline mt-6"
          onClick={() => { handleSubmitReview() }}
        >
          Rate!
        </button>
        {/* <button */}
        {/*   className="btn btn-xs btn-secondary btn-outline mt-6" */}
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
    // <div className="card card-bordered border-base-300 border-4 text-neutral-content">
    //   <div className="card-body items-center text-center">
    //     <div className="space-y-6">
    //       <h2
    //         className="card-title justify-center text-3xl cursor-pointer"
    //         onClick={() => accountQuery.refetch()}
    //       >
    //         {accountQuery.data?.name}
    //       </h2>
    //       <p>{accountQuery.data?.avatar}</p>
    //       <div className="card-actions justify-around">
    //         <textarea
    //           placeholder='New Message'
    //           value={avatar}
    //           onChange={e => setMessage(e.target.value)}
    //           className='textarea textarea-bordered w-full max-w-xs'
    //         />
    //
    //         <button
    //           className="btn btn-xs lg:btn-md btn-primary"
    //           onClick={handleSubmit}
    //           disabled={updateEntry.isPending && !isFormValid}
    //         >
    //           Update {updateEntry.isPending && '...'}
    //         </button>
    //       </div>
    //       <div className="text-center space-y-4">
    //         <p>
    //           <ExplorerLink
    //             path={`account/${account}`}
    //             label={ellipsify(account.toString())}
    //           />
    //         </p>
    //         <button
    //           className="btn btn-xs btn-secondary btn-outline"
    //           onClick={() => {
    //             if (
    //               !window.confirm(
    //                 'Are you sure you want to close this account?'
    //               )
    //             ) {
    //               return;
    //             }
    //             const name = accountQuery.data?.name;
    //             if (name) {
    //               return deleteEntry.mutateAsync(name);
    //             }
    //           }}
    //           disabled={deleteEntry.isPending}
    //         >
    //           Delete
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
