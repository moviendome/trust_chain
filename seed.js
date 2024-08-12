const anchor = require('@coral-xyz/anchor');
const { Connection, Keypair, PublicKey, SystemProgram } = require('@solana/web3.js');
const bs58 = require('bs58');
const fs = require('fs');

// Configuration
const RPC_URL = 'http://localhost:8899';

// Load Wallet Keypair
const walletKeypair = Keypair.generate();

// Initialize connection and provider
const connection = new Connection(RPC_URL, 'confirmed');
const wallet = new anchor.Wallet(walletKeypair);
const provider = new anchor.AnchorProvider(connection, wallet, { commitment: 'confirmed' });
anchor.setProvider(provider);

// Load the program
const idl = JSON.parse(require('fs').readFileSync('./anchor/target/idl/trust_chain.json', 'utf8'));

const keypairPath = './anchor/target/deploy/trust-keypair.json'; // Replace with your path
const keypair = JSON.parse(fs.readFileSync(keypairPath));
const programId = new PublicKey(keypair.slice(0, 32)); // The program ID is derived from the keypair

// console.log(idl);
const program = new anchor.Program(idl, new PublicKey(idl.address), provider);

// Seed data
const businesses = [
  { category: 'Coffee', name: 'Solana Cafe', address: '123 Blockchain St', profile: 'solana_cafe_profile', cover: 'solana_cafe_cover', latitude: 37.7749, longitude: -122.4194 },
  { category: 'Pizza', name: 'Pizzeria Solana', address: '456 Pizza Ln', profile: 'pizzeria_solana_profile', cover: 'pizzeria_solana_cover', latitude: 40.7128, longitude: -74.0060 },
  { category: 'Sushi', name: 'Sushi Chain', address: '789 Sashimi Ave', profile: 'sushi_chain_profile', cover: 'sushi_chain_cover', latitude: 34.0522, longitude: -118.2437 },
];

// Helper function to derive PDA and create business
async function createBusiness(business) {
  // const [businessPda] = await PublicKey.findProgramAddress(
  //   // [
  //   //   Buffer.from('business'),
  //   //   Buffer.from(business.name),
  //   //   wallet.publicKey.toBuffer(),
  //   // ],
  //   [Buffer.from(business.name), owner.toBuffer()],
  //   PROGRAM_ID
  // );

  // const [businessEntryState] = await PublicKey.findProgramAddress(
  //   [Buffer.from(name), owner.toBuffer()],
  //   programId,
  // )

  // console.log(`Creating business: ${business.name} with PDA: ${businessPda.toBase58()}`);

  // const tx = await program.rpc.createBusiness(
  //   business.category,
  //   business.name,
  //   business.address,
  //   business.profile,
  //   business.cover,
  //   new anchor.BN(business.latitude * 1e6),
  //   new anchor.BN(business.longitude * 1e6),
  //   new anchor.BN(Date.now()),
  //   {
  //     accounts: {
  //       businessEntry: businessPda,
  //       owner: wallet.publicKey,
  //       systemProgram: SystemProgram.programId,
  //     },
  //     signers: [],
  //   }
  // );
  //
  // console.log(`Transaction signature: ${tx}`);
}

(async () => {
  for (const business of businesses) {
    await createBusiness(business);
  }

  console.log('Finished populating businesses.');
})();

