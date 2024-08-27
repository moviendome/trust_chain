import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { TrustChain } from '../target/types/trust_chain';
import * as assert from 'assert';
// import * as bs58 from 'bs58';

describe('TrustChain', () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.TrustChain as Program<TrustChain>;

  it('should create a business and a review', async () => {
    const businessData = {
      name: 'Pala Pizza Romana & Bistrot',
      address: 'Room 1 BTS/MRT Soi Sukhumvit 23',
      profile: 'https://images.deliveryhero.io/image/fd-th/th-logos/ct3mi-logo.jpg',
      latitude: 10.0,
      longitude: 10.0,
      cover: 'https://d2sj0xby2hzqoy.cloudfront.net/cinque_stagioni/attachments/data/000/000/882/original/la-pizza-in-pala-alla-romana-header.jpg',
      category: 'Pizza',
    }

    const [businessEntryState] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from(businessData.name), provider.wallet.publicKey.toBuffer()],
      program.programId
    );

    await program.methods.createBusiness(
      businessData.name,
      businessData.address,
      businessData.profile,
      businessData.cover,
      new anchor.BN(businessData.latitude),
      new anchor.BN(businessData.longitude),
      businessData.category
    ).accounts({ businessEntry: businessEntryState}).rpc();

    const businessEntry = await program.account.businessEntryState.fetch(businessEntryState);
    assert.equal(businessEntry.name, businessData.name);
    assert.equal(businessEntry.address, businessData.address);
    assert.equal(businessEntry.profile, businessData.profile);
    assert.equal(businessEntry.latitude, businessData.latitude);
    assert.equal(businessEntry.longitude, businessData.longitude);
    assert.equal(businessEntry.category, businessData.category);
    assert.ok(businessEntry.createdAt);
    assert.equal(businessEntry.owner.toBase58(), program.provider.wallet.publicKey.toBase58());

    const reviewData = {
      title: 'Best Pizza in Bangkok',
      rating: 5,
      comment: 'I love the pizza here, it is so delicious!',
    }

    const [reviewEntryState] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from(reviewData.title), provider.wallet.publicKey.toBuffer()],
      program.programId
    );

    await program.methods.createReview(
      reviewData.title,
      new anchor.BN(reviewData.rating),
      reviewData.comment,
    ).accounts({ reviewEntry: reviewEntryState, business: businessEntryState}).rpc();

    const reviewEntry = await program.account.reviewEntryState.fetch(reviewEntryState);
    assert.equal(reviewEntry.title, reviewData.title);
    assert.equal(reviewEntry.rating, reviewData.rating);
    assert.equal(reviewEntry.comment, reviewData.comment);
    assert.equal(reviewEntry.business.toBase58(), businessEntryState.toBase58());
  });
});
