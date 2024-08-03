import * as anchor from '@coral-xyz/anchor';
import { Program } from "@coral-xyz/anchor";
import { TrustChain } from '../target/types/trust_chain';
import * as assert from "assert";
import * as bs58 from "bs58";

describe('TrustChain', () => {
  it('should create a business and a review', async () => {
    // Configure the client to use the local cluster.
    // anchor.setProvider(anchor.AnchorProvider.env());

    // Configure the client to use the local cluster.
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);

    const program = anchor.workspace.TrustChain as Program<TrustChain>;

    console.log('should create a business and a review');

    // Generate PDA and bump for the business
    const [businessPda, businessBump] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("business"), provider.wallet.publicKey.toBuffer()],
      program.programId
    );

    // Create a new business
    await program.methods.createBusiness("My Business", "https://avatar.url", "Tech", "https://business.url", businessBump)
      .accounts({
        business: businessPda,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    console.log(`Business created with PDA: ${businessPda.toBase58()}`);

    // // Generate PDA and bump for the review
    // const [reviewPda, reviewBump] = await anchor.web3.PublicKey.findProgramAddress(
    //   [Buffer.from("review"), provider.wallet.publicKey.toBuffer()],
    //   program.programId
    // );
    //
    // // Create a new review for the business
    // await program.methods.createReview(5, "Great Business", "This business is amazing!", reviewBump)
    //   .accounts({
    //     review: reviewPda,
    //     business: businessPda,
    //     user: provider.wallet.publicKey,
    //     systemProgram: anchor.web3.SystemProgram.programId,
    //   })
    //   .rpc();
    //
    // console.log(`Review created with PDA: ${reviewPda.toBase58()}`);
  });
});
