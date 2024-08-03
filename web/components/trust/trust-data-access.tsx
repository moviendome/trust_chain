'use client';

import {
  getTrustProgram,
  getTrustProgramId,
} from '@trust-chain/anchor';
import { Program } from '@coral-xyz/anchor';
import { useConnection } from '@solana/wallet-adapter-react';
import { Cluster, PublicKey } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useCluster } from '../cluster/cluster-data-access';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';

interface EntryArgs {
  name: string;
  avatar: string;
  category: string;
  url: string;
  owner: PublicKey;
};

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

  const accounts = useQuery({
    queryKey: ['trust', 'all', { cluster }],
    queryFn: () => program.account.businessEntryState.all(),
  });

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  // Use publicKey of the wallet connected to the Frontend
  const createBusiness = useMutation<string, error, EntryArgs>({
    mutationKey: ['businessEntry', 'create', { cluster }],
    mutationFn: async ({name, avatar, category, url, owner}) => {
      const [businessEntryState] = await PublicKey.findProgramAddress(
        [Buffer.from(name), owner.toBuffer()],
        programId,
      )

      return program.methods.createBusiness(name, avatar, category, url).accounts({ businessEntry: businessEntryState}).rpc();
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      return accounts.refetch();
    },
    onError: (error) => {
      toast.error(`Failed to create business entry: ${error.message}`);
    },
  });

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    createBusiness,
  };
}

export function useTrustProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const { programId, program, accounts } = useTrustProgram();

  const accountQuery = useQuery({
    queryKey: ['business', 'fetch', { cluster, account }],
    queryFn: () => program.account.businessEntryState.fetch(account),
  });

  const updateEntry = useMutation<string, error, EntryArgs>({
    mutationKey: ['businessEntry', 'update', { cluster }],
    mutationFn: async ({name, avatar, category, url, owner}) => {
      const [journalEntryState] = await PublicKey.findProgramAddress(
        [Buffer.from(name), owner.toBuffer()],
        programId,
      )

      return program.methods.updateBusiness(name, avatar, category, url).accounts({ businessEntry: businessEntryState }).rpc();
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      return accounts.refetch();
    },
    onError: () => toast.error('Failed to initialize account'),
  });

  const deleteEntry = useMutation({
    mutationKey: ['business', 'delete', { cluster, account }],
    mutationFn: (name: string) =>
      program.methods.deleteEntry(name).accounts({ businessEntry: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accounts.refetch();
    },
  });

  return {
    accountQuery,
    updateEntry,
    deleteEntry,
  };
}
