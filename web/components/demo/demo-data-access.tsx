'use client';

import { useState, useMemo } from 'react';
import {
  getTrustProgram,
  getTrustProgramId,
} from '@trust-chain/anchor';
import { useConnection } from '@solana/wallet-adapter-react';
import { Cluster, PublicKey } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useCluster } from '../cluster/cluster-data-access';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';
import bs58 from 'bs58';

interface EntryArgs {
  name: string;
  address: string;
  profile: string;
  cover: string;
  latitude: bigint,
  longitude: bigint,
  category: string;
  owner: PublicKey;
}

export function useTrustProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const programId = useMemo(
    () => getTrustProgramId(cluster.network as Cluster),
    [cluster]
  );
  const program = getTrustProgram(provider);

  const [categoryFilter, setCategoryFilter] = useState('');
  const [businessFilter, setBusinessFilter] = useState('');

  const accounts = useQuery({
    queryKey: ['trust', 'all', { cluster, categoryFilter }],
    queryFn: () => {
      if (categoryFilter === 'All') {
        return program.account.businessEntryState.all();
      }
      return program.account.businessEntryState.all([
        {
          memcmp: {
            offset: 8 + 32 + 4, // Adjust the offset if necessary
            bytes: bs58.encode(Buffer.from(categoryFilter)),
          },
        },
      ]);
    },
    // enabled: !!categoryFilter, // Ensure the query only runs if a category is provided
  });

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  const createBusiness = useMutation<string, error, EntryArgs>({
    mutationKey: ['businessEntry', 'create', { cluster }],
    mutationFn: async ({name, address, profile, cover, latitude, longitude, category, owner}) => {
      const [businessEntryState] = await PublicKey.findProgramAddress(
        [Buffer.from(name), owner.toBuffer()],
        programId,
      )

      return program.methods.createBusiness(name, address, profile, cover, latitude, longitude, category).accounts({ businessEntry: businessEntryState}).rpc();
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      return accounts.refetch();
    },
    onError: (error) => {
      toast.error(`Failed to create business entry: ${error.message}`);
    },
  });

  const reviewAccounts = useQuery({
    queryKey: ['trust', 'all', { cluster, businessFilter }],
    queryFn: () => {
      return program.account.reviewEntryState.all([
        {
          memcmp: {
            offset: 8, // Discriminator.
            bytes: businessFilter,
          }
        },
      ]);
    },
  });

  const createReview = useMutation<string, error, ReviewArgs>({
    mutationKey: ['reviewEntry', 'create', { cluster }],
    mutationFn: async ({title, rating, comment, business, owner}) => {
      const [reviewEntryState] = await PublicKey.findProgramAddress(
        [Buffer.from(title), owner.toBuffer()],
        programId,
      )

      return program.methods.createReview(title, rating, comment).accounts({ reviewEntry: reviewEntryState, business: business}).rpc();
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      return accounts.refetch();
    },
    onError: (error) => {
      toast.error(`Failed to create review entry: ${error.message}`);
    },
  });

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    createBusiness,
    reviewAccounts,
    createReview,
    setBusinessFilter,
    setCategoryFilter,
    categoryFilter,
  };
}

export function useTrustProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const { program, accounts } = useTrustProgram();

  const accountQuery = useQuery({
    queryKey: ['business', 'fetch', { cluster, account }],
    queryFn: () => program.account.businessEntryState.fetch(account),
  });

  const deleteBusiness = useMutation({
    mutationKey: ['business', 'delete', { cluster, account }],
    mutationFn: (name: string) =>
      program.methods.deleteBusiness(name).accounts({ businessEntry: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accounts.refetch();
    },
  });

  return {
    accountQuery,
    deleteBusiness,
  };
}
