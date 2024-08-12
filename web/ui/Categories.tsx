import React, { memo } from 'react';

const Categories = () => (
  <div className='my-10 max-w-4xl mx-auto'>
    <div role="tablist" className="tabs tabs-lg tabs-boxed">
      {["All", "Brunch", "Burger", "Chinese", "Coffee", "Pizza", "Ramen", "Thai"]
  .map((category, index) => (
        <a
          key={index}
          role="tab"
          className={`tab ${index === 0 ? 'tab-active' : ''}`}
          onClick={() => setCategoryFilter(category)}
          >
            {category}
          </a>
          // <a role="tab" className="tab tab-active">Tab 2</a>
      ))}
    </div>
  </div>
)

export default memo(Categories);


{/* <ul className="menu menu-horizontal px-1 space-x-2"> */}
{/*   {links.map(({ label, path }) => ( */}
{/*     <li key={path}> */}
{/*       <Link */}
{/*         className={pathname.startsWith(path) ? 'active' : ''} */}
{/*         href={path} */}
{/*       > */}
{/*         {label} */}
{/*       </Link> */}
{/*     </li> */}
{/*   ))} */}
{/* </ul> */}
