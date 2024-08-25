import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useTrustProgram } from '@/components/demo/demo-data-access';
import { BusinessCard } from '@/components/demo';

const BusinessList = () => {
  const { createBusiness, accounts, getProgramAccount, categoryFilter, setCategoryFilter } = useTrustProgram();

  let currentCategory = categoryFilter ? categoryFilter : 'All';

  const { publicKey } = useWallet();

  if (getProgramAccount.isLoading) {
    // return <span className="loading loading-spinner loading-lg"></span>;
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
          <div className="card bg-base-100 w-96 shadow-xl relative">
            <div className="skeleton h-72 w-full"></div>
            <div className="card-body">
              <h2 className="card-title">
              <div className="skeleton h-4 w-48"></div>
              </h2>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
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
          <div className="hero bg-base-200 max-w-6xl mx-auto">
            <div className="hero-content text-center">
              <div className="max-w-xl py-20">
                <h1 className="text-2xl md:text-3xl font-bold">No Business found in this category</h1>
                <p className="py-6">
                  Create one to get started
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BusinessList;
