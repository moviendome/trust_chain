'use client';

import { useEffect, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { ellipsify } from '@/components/ui/ui-layout';
import {
  useTrustProgram,
  useTrustProgramAccount,
} from '@/components/demo/demo-data-access';
import { useWallet } from '@solana/wallet-adapter-react';

export default function Page({ params }: { params: { address: string } }) {
  const account = new PublicKey(params?.address);
  const { accountQuery } = useTrustProgramAccount({ account });
  const { reviewAccounts, createReview, setBusinessFilter } = useTrustProgram();

  const { publicKey } = useWallet();

  const business = account.toString();
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const isFormValid = title.trim() !== '' && comment.trim() !== '' && rating !== 0;

  const handleSubmit = () => {
    if (publicKey && isFormValid) {
      createReview.mutateAsync({ title, rating, comment, business, owner: publicKey }, {
        onSuccess: () => {
          // This will refetch the reviews after a new one is created
          reviewAccounts.refetch();

          // Reset form values
          setTitle("");
          setComment("");
          setRating(5);
        }
      });
    }
  };

  useEffect(() => {
    setBusinessFilter(account.toString());
  }, []); // This effect depends on newBusinessFilter

  const ratingAvg = reviewAccounts.data ? reviewAccounts.data.reduce((sum, review) => sum + review?.account.rating, 0) / reviewAccounts.data.length : 0;
  const reviews = reviewAccounts.data?.length > 0 ? reviewAccounts.data : [];

  return accountQuery.isLoading ? (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  ) : (
    <div className='max-w-4xl mx-auto my-16'>
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
            { !isNaN(ratingAvg) && (
              <>
                <div className="badge badge-secondary">{parseFloat(ratingAvg.toFixed(1))}</div>
                <span className='text-sm'>{`(${reviews.length} ${reviews.length === 1 ? 'review' : 'reviews'})`}</span>
              </>
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

      <div className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='Title of your Review'
          value={title}
          onChange={e => setTitle(e.target.value)}
          className='input input-bordered w-full'
        />

        <textarea
          className="textarea textarea-bordered"
          placeholder="Tell everyone how amazing is this place"
          value={comment}
          onChange={e => setComment(e.target.value)}>
        </textarea>

        <div className="rating rating-lg rating-half mx-auto pb-6">
          <input type="radio" name="rating-10" className="mask mask-star-2 bg-green-500 hidden" value='0' defaultChecked onChange={e => setRating(e.target.value)} />
          <input type="radio" name="rating-10" className="mask mask-star-2 bg-green-500" value='1' onChange={e => setRating(e.target.value)} />
          <input type="radio" name="rating-10" className="mask mask-star-2 bg-green-500" value='2' onChange={e => setRating(e.target.value)} />
          <input type="radio" name="rating-10" className="mask mask-star-2 bg-green-500" value='3' onChange={e => setRating(e.target.value)} />
          <input type="radio" name="rating-10" className="mask mask-star-2 bg-green-500" value='4' onChange={e => setRating(e.target.value)} />
          <input type="radio" name="rating-10" className="mask mask-star-2 bg-green-500" value='5' onChange={e => setRating(e.target.value)} />
        </div>

        <button
          className="btn btn-xs lg:btn-md btn-primary"
          onClick={handleSubmit}
          disabled={!createReview.isPending && !isFormValid}
        >
          Add Review
        </button>
      </div>

      { reviews.map((review, index) => {
          const createdAt = new Date(review?.account?.createdAt * 1000).toLocaleDateString();
          return (
        <div key={index} className="card bg-base-100 shadow-xl my-4">
          <div className="card-body">
            <h2 className="card-title">{ review?.account?.title }</h2>
            <p>{ review?.account?.comment }</p>
            <p>{ createdAt}</p>
            <div className="card-actions justify-end">
              <span className='py-1'>{ review?.account?.rating }</span>
              <div className="rating">
                <input type="radio" name="rating-10" className="mask mask-star-2 bg-green-500" />
              </div>
            </div>
          </div>
        </div>
      )})}
    </div>
  )
}
