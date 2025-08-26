import dynamic from 'next/dynamic';
import { ChartSkeleton } from './loading-skeleton';

export const DataCharts = dynamic(() => import('./data-charts').then(mod => ({ default: mod.DataCharts })), {
  ssr: false,
  loading: () => <ChartSkeleton />
});

export const SmartInsights = dynamic(() => import('./smart-insights').then(mod => ({ default: mod.SmartInsights })), {
  ssr: false,
  loading: () => (
    <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-xl">
      <div className="animate-pulse bg-neutral-200 dark:bg-neutral-800 rounded-2xl h-64" />
    </div>
  )
});

export const RecentActivity = dynamic(() => import('./recent-activity').then(mod => ({ default: mod.RecentActivity })), {
  ssr: false,
  loading: () => (
    <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-xl">
      <div className="animate-pulse bg-neutral-200 dark:bg-neutral-800 rounded-2xl h-64" />
    </div>
  )
});

export const FinancialGoals = dynamic(() => import('./financial-goals').then(mod => ({ default: mod.FinancialGoals })), {
  ssr: false,
  loading: () => (
    <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-xl">
      <div className="animate-pulse bg-neutral-200 dark:bg-neutral-800 rounded-2xl h-48" />
    </div>
  )
});