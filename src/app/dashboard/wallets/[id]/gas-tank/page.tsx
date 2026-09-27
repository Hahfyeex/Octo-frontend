"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/useAuth";
import { WalletPageShell } from "@/components/dashboard/WalletPageShell";
import { getWallet, type WalletView } from "@/lib/wallets";
import { GasTankProvision } from "@/components/gas/GasTankProvision";
import { PageSpinner } from "@/components/OctoSpinner";

export default function GasTankPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user, token, loading } = useAuth();
  const [wallet, setWallet] = useState<WalletView | null>(null);

  useEffect(() => {
    if (!token) return;
    getWallet(token, id).then(setWallet).catch(() => {});
  }, [token, id]);

  if (loading || !user || !token) return <PageSpinner />;

  return (
    <>
    <WalletPageShell
      walletId={id}
      walletName={wallet?.label ?? "Master wallet"}
      section="Gas tank"
    >

            <div className="mx-auto max-w-2xl space-y-6">
              <div>
                <h1 className="text-xl font-semibold text-foreground">Gas tank</h1>
                <p className="mt-1 text-sm text-muted">
                  Set up the tank that powers{" "}
                  <Link href={`/dashboard/wallets/${id}/sponsorship`} className="underline">
                    gas sponsorship
                  </Link>
                  .
                </p>
              </div>
              <GasTankProvision token={token} walletId={id} />
            </div>

    </WalletPageShell>
  </>
  );
}
