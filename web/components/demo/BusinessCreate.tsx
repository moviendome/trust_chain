import React, { memo, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useTrustProgram } from '@/components/demo/demo-data-access';

const BusinessCreate =  () => {
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
};

export default memo(BusinessCreate);
