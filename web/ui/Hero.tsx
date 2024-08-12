import React, { memo } from 'react';
import Link from 'next/link';

const Hero = () => {

  const feature = [
    {
      title: 'Decentralized',
      content: 'Leverages the power of blockchain to store reviews securely, making it impossible for them to be altered or tampered with',
    },
    {
      title: 'Transparency',
      content: 'Every review is publicly verifiable, giving you peace of mind that what you’re reading is genuine',
    },
    {
      title: 'Open Source',
      content: 'Invites developers to learn, contribute or build your own decentralized app based on Trust Chain code',
    },
  ];

  return (
    <div className='container'>
      <div className="hero bg-base-200 min-h-[420px]">
        <div className="hero-content text-center">
          <div className="max-w-4xl">
            <div className="rating rating-lg rating-half">
              <input type="radio" name="rating-10" className="rating-hidden" />
              <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-green-500" />
              <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-green-500" />
              <input
                type="radio"
                name="rating-10"
                className="mask mask-star-2 mask-half-1 bg-green-500"
                defaultChecked />
              <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-green-500" />
              <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-green-500" />
              <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-green-500" />
              <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-green-500" />
              <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-green-500" />
              <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-green-500" />
              <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-green-500" />
            </div>
            <h1 className="text-5xl font-bold">Trust Chain is an Open Source decentralized application (dApp) that serves as a Real-World example</h1>
            <p className="py-6">
              Built on Solana Blockchain transform the way we read and write reviews for our favorite places
            </p>
            <Link
              className='btn btn-primary'
              href='/trust'
            >
              Demo
            </Link>
          </div>
        </div>
      </div>

      <div className='my-10'>
        <h2 className='text-4xl font-bold text-center'>Why Reviews on Blockchain</h2>
        <div className="grid mx-6 md:mx-0 my-10 md:grid-cols-3 gap-8">
          { feature.map((item) => (
            <div className="card max-w-96 bg-neutral shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{ item.title }</h2>
                <p>{ item.content }</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='my-10'>
        <h2 className='my-10 text-4xl font-bold text-center'>How It Works</h2>
        <div className='flex justify-center'>
          <ul className="steps steps-vertical md:steps-horizontal">
            <li className="step">Go to Demo</li>
            <li className="step">Connect you Wallet</li>
            <li className="step">Review a place</li>
            <li className="step">Read your Review & Verify on chain</li>
          </ul>
        </div>
      </div>

      <div className='my-10'>
        <h2 className='my-10 text-4xl font-bold text-center'>Get Started</h2>
        <div className="mockup-code bg-primary text-primary-content max-w-4xl mx-auto">
          <pre data-prefix='$'><code>git clone https://github.com/moviendome/trust-chain</code></pre>
        </div>
      </div>
    </div>
  )
};

export default memo(Hero);
