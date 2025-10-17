'use client'

import React from 'react';
import { DashboardOverview } from '../../components';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  const handleNavigate = (tab: string) => {
    router.push(`/dashboard/${tab}`);
  };

  return <DashboardOverview onNavigate={handleNavigate} />;
}