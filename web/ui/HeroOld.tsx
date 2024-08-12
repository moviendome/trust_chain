import React, { memo } from 'react';

const Hero = () => (
  <div className="hero bg-base-200 w-full mt-10 mb-10 p-10">
    {/* <div className="hero-content flex-col lg:flex-row-reverse"> */}
    <div className="hero-content">
      <div>
        <h1 className="text-3xl">
          Read reviews & write reviews of your favorite places<br />
          <span className="font-bold text-accent">Verify them on Solana Network</span>
        </h1>

        <br />

        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd" />
          </svg>
        </label>
      </div>
    </div>
  </div>
)

export default memo(Hero);
