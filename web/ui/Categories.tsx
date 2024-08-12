import React, { memo } from 'react';

const Categories = () => (
  <div role="tablist" className="tabs tabs-boxed">
    {["All", "Brunch", "Burger", "Chinese", "Coffee", "Pizza", "Ramen", "Thai"]
.map((category, index) => (
      <a key={index} role="tab" className={`tab ${index === 0 ? 'tab-active' : ''}`}>{category}</a>
        // <a role="tab" className="tab tab-active">Tab 2</a>
    ))}
  </div>
)

export default memo(Categories);
