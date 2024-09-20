import { useTrustProgram } from '@/components/demo/demo-data-access';
import { BusinessCard } from '@/components/demo';

const BusinessList = () => {
  const { accounts, getProgramAccount, categoryFilter, setCategoryFilter } = useTrustProgram();

  const currentCategory = categoryFilter ? categoryFilter : 'All';

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

  return (
    <div>
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
                <h1 className="text-2xl md:text-3xl font-bold">No Business found</h1>
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
