# Trust Chain Solana dApp

This is an example of an on-chain Solana dApp to read and write reviews for our favorite places.

This project was created using the [create-solana-dapp](https://github.com/solana-developers/create-solana-dapp) generator.

## Demo

### Home

![Trust Chain - Home](/screenshots/trust-chain-description.webp)

### Index

![Trust Chain - Index](/screenshots/trust-chain-demo-index.webp)

### Filter

![Trust Chain - Filter](/screenshots/trust-chain-demo-filter.webp)

### New business

![Trust Chain - New business](/screenshots/trust-chain-demo-new-business.webp)

### Business details

![Trust Chain - Business details](/screenshots/trust-chain-demo-detail.webp)

### Business review

![Trust Chain - Business review](/screenshots/trust-chain-demo-review.webp)

## Getting Started

### Prerequisites

- Node v18.18.0 or higher

- Rust v1.77.2 or higher
- Anchor CLI 0.30.0 or higher
- Solana CLI 1.18.9 or higher

### Installation

#### Clone the repo

```shell
git clone https://github.com/moviendome/trust_chain.git
cd trust_chain
```

#### Install Dependencies

```shell
npm install
```

#### Start the web app

```
npm run dev
```

## Apps

### anchor

This is a Solana program written in Rust using the Anchor framework.

#### Commands

You can use any normal anchor commands. Either move to the `anchor` directory and run the `anchor` command or prefix the command with `npm run`, eg: `npm run anchor`.

#### Sync the program id:

Running this command will create a new keypair in the `anchor/target/deploy` directory and save the address to the Anchor config file and update the `declare_id!` macro in the `./src/lib.rs` file of the program.

You will manually need to update the constant in `anchor/lib/basic-exports.ts` to match the new program id.

```shell
npm run anchor keys sync
```

#### Build the program:

```shell
npm run anchor-build
```

#### Start the test validator with the program deployed:

```shell
npm run anchor-localnet
```

#### Run the tests

```shell
npm run anchor-test
```

#### Deploy to Devnet

```shell
npm run anchor deploy --provider.cluster devnet
```

### web

This is a React app that uses the Anchor generated client to interact with the Solana program.

#### Commands

Start the web app

```shell
npm run dev
```

Build the web app

```shell
npm run build
```
