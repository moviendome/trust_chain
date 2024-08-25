import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useTrustProgram } from '@/components/demo/demo-data-access';

const BusinessCreate =  () => {
  const { createBusiness } = useTrustProgram();
  const { publicKey } = useWallet();
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [profile, setProfile] = useState('');
  const [cover, setCover] = useState('');
  const [url, setUrl] = useState('');

  const isFormValid = name.trim() !== '' && address.trim() !== '' && profile.trim() !== '' && cover.trim() !== '' && category.trim() !== '';

  const resetForm = () => {
    setName('');
    setAddress('');
    setProfile('');
    setCover('');
    setCategory('');
  };

  const handleCloseDialog = () => {
    resetForm();
  }

  const handleSubmit = () => {
    if (publicKey && isFormValid) {
      createBusiness.mutateAsync({ category, name, address, profile, cover, owner: publicKey });
      resetForm();
    }
  };

  if (!publicKey) {
    return <p>Connect your wallet</p>
  }

  return (
    <div>
      <p className='text-center mt-10'>
        <button className='btn btn-outline btn-success' onClick={()=>document.getElementById('newModal').showModal()}>
          Add a New Business
        </button>
      </p>
      <dialog id='newModal' className='modal'>
        <div className='modal-box'>
          <form method='dialog' className='w-full'>
            <button
              className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
              onClick={() => handleCloseDialog()}
            >✕</button>

            <p className='text-xl font-bold text-center'>Add a New Business</p>

            <label className='form-control py-4'>
              <div className='label'>
                <span className='label-text'>What is the name of the Business?</span>
              </div>
              <input
                type='text'
                placeholder='Acme Inc.'
                value={name}
                onChange={e => setName(e.target.value)}
                className='input input-bordered w-full'
              />
            </label>

            <label className='form-control py-4'>
              <div className='label'>
                <span className='label-text'>What is the address of the Business?</span>
              </div>
              <input
                type='text'
                placeholder='Soi 6. Sukhummvit Road, TH 10120'
                value={address}
                onChange={e => setAddress(e.target.value)}
                className='input input-bordered w-full max-w-xs'
              />
            </label>

            <label className='form-control py-4'>
              <div className='label'>
                <span className='label-text'>Profile Picture URL</span>
              </div>
              <input
                type='text'
                placeholder='https://mydomain.com/images/profile.png'
                value={profile}
                onChange={e => setProfile(e.target.value)}
                className='input input-bordered w-full'
              />
            </label>

            <label className='form-control py-4'>
              <div className='label'>
                <span className='label-text'>Cover Picture URL</span>
              </div>
              <input
                type='text'
                placeholder='https://mydomain.com/images/cover.png'
                value={cover}
                onChange={e => setCover(e.target.value)}
                className='input input-bordered w-full'
              />
            </label>

            <label className='form-control py-4'>
              <div className='label'>
                <span className='label-text'>Select a Category</span>
              </div>
              <select value={category} className='select select-bordered w-full' onChange={e => setCategory(e.target.value)}>
                <option value='' defaultValue>Select a category</option>
                <option>Brunch</option>
                <option>Burger</option>
                <option>Chinese</option>
                <option>Coffee</option>
                <option>Pizza</option>
                <option>Ramen</option>
                <option>Thai</option>
              </select>
            </label>

            <div className='flex justify-center'>
              <button
                className='btn btn-xs lg:btn-md btn-primary'
                onClick={handleSubmit}
                disabled={!createBusiness.isPending && !isFormValid}
              >
                Create {createBusiness.isPending && '...'}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default BusinessCreate;
