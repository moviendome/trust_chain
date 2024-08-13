'use client';

import { Keypair } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import { ellipsify } from '../ui/ui-layout';
import { ExplorerLink } from '../cluster/cluster-ui';
import {
  useTrustProgram,
  useTrustProgramAccount,
} from './demo-data-access';
import { useWallet } from '@solana/wallet-adapter-react';
import Link from 'next/link';

import { Categories } from '@/ui';

export function BusinessCreate() {
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
      <p className='text-center mt-10'>
        <button className="underline" onClick={()=>document.getElementById('my_modal_3').showModal()}>
          Add a new Business
        </button>
      </p>
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

export function BusinessList() {
  const { createBusiness, accounts, getProgramAccount, categoryFilter, setCategoryFilter } = useTrustProgram();

  let currentCategory = categoryFilter ? categoryFilter : 'All';

  const { publicKey } = useWallet();

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

  const handleSubmitSeed = () => {
    if (publicKey) {
      const seeds = [
        // Pizza
        {
          category: 'Pizza',
          name: 'Pala Pizza Romana & Bistrot',
          address: 'Room 1 BTS/MRT Soi Sukhumvit 23',
          profile: 'https://images.deliveryhero.io/image/fd-th/th-logos/ct3mi-logo.jpg',
          cover: 'https://d2sj0xby2hzqoy.cloudfront.net/cinque_stagioni/attachments/data/000/000/882/original/la-pizza-in-pala-alla-romana-header.jpg',
        },
        // Burger
        {
          category: 'Burger',
          name: 'Beast Smash',
          address: '27/4 Witthayu Rd',
          profile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_mjhzzBvo8Hn9oIas1JtdfvLGfRlZj9WKUA&s',
          cover: 'https://media-cdn.tripadvisor.com/media/photo-s/18/18/e0/af/burgers-is-our-specialty.jpg',
        },
        // Ramen
        {
          category: 'Ramen',
          name: 'Menzo Tokyo',
          address: '571 อาร์เอสยู ทาวเวอร์ (RSU Tower) ',
          profile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAQC9EzlrKzMtJLbgMk1Ua6Vj2MDztmoqHUw&s',
          cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC3ECQ0mqFuG586bA1rggAbTDMwhdmOMClYA&s',
        },
        {
          category: 'Ramen',
          name: 'Lust Ramen',
          address: 'Sathorn 150 Silom Soi 3 Naradhiwas Rajanagarindra Rd',
          profile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXdxDwvj2SZreDjo_LMg8KsuM-VS9LTj6OWA&s',
          cover: 'https://images.happycow.net/venues/1024/29/36/hcmp293663_1539087.jpeg',
        },
        // Coffee
        {
          category: 'Coffee',
          name: 'Artis Coffee Bangkok',
          address: '390, 20 Sukhumvit Soi 18',
          profile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2OT1Vhq71_Mzoc1hoXFSQfrF3ucz08_L8qg&s',
          cover: 'https://gurulist.net/img/address/1469.jpeg',
        },
        {
          category: 'Coffee',
          name: 'Peels & Pals',
          address: '43/1 Naradhiwas Rajanagarindra 7 Alley',
          profile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0ytkP5drzZzwJH_G3BvWuMPD_teZj6d66Aw&s',
          cover: 'https://p16-va.lemon8cdn.com/tos-alisg-v-a3e477-sg/owAaHf9PbLigDgDEEXB7PeiwA34eAJ9EIwDAI7~tplv-tej9nj120t-origin.webp',
        },
        {
          category: 'Coffee',
          name: 'Paper Plane Project',
          address: 'T-One Building 8, 40th Floor Sukhumvit 40',
          profile: 'https://media.licdn.com/dms/image/C560BAQHbxXezn6NhJw/company-logo_200_200/0/1644477838691?e=2147483647&v=beta&t=7fD2ugjAhDJzbRsfzULJ7k-NlxN8em7-meP7cfxdwpc',
          cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAK2Sv82Vo5Gihtg1zOFcfsvOg8SNg7bOp-Q&s',
        },
        {
          category: 'Coffee',
          name: 'Vivi The Coffee Place',
          address: '394, 29 Pansuk Alley',
          profile: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzmS5awaOezSNBHL1Pek9lYHnwprtilPjLVg&s',
          cover: 'https://www.reviewslowbar.com/wp-content/uploads/2021/03/Vivi-The-Coffee-Place-คาเฟ่ริมแม่นน้ำกับบรรยากาศสุดฟิน-01ปะล่าง.jpg',
        },
        // {
        //   category: '',
        //   name: '',
        //   address: '',
        //   profile: '',
        //   cover: '',
        // },
      ];

      seeds.map(({ category, name, address, profile, cover }) => {
        createBusiness.mutateAsync({ category, name, address, profile, cover, owner: publicKey });
      });
    }
  };

  return (
    <div>
      {/* <button */}
      {/*   className="btn btn-xs btn-secondary btn-outline mt-6" */}
      {/*   onClick={() => { handleSubmitSeed() }} */}
      {/* > */}
      {/*   Seed */}
      {/* </button> */}
      <div className="rounded-b-box rounded-se-box relative overflow-x-auto">
        <div className='my-10 max-w-4xl mx-auto'>
            <div role="tablist" className="tabs tabs-lg tabs-boxed">
              {["All", "Brunch", "Burger", "Chinese", "Coffee", "Pizza", "Ramen", "Thai"]
                .map((category, index) => (
                  <a
                    key={index}
                    role="tab"
                    className={`tab ${category === currentCategory ? 'tab-active' : ''}`}
                    onClick={() => setCategoryFilter(category)}
                    >
                      {category}
                    </a>
                ))
            }
            </div>
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
    const title = "My second Review";
    const rating = 4;
    const comment = "Nice environment, Live music";
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
