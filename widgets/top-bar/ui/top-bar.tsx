import dynamic from 'next/dynamic';
import type { TopBarProps } from './top-bar.client';

export const TopBar = dynamic<TopBarProps>(
  () => import('./top-bar.client').then((mod) => mod.TopBarClient),
  { ssr: false }
);

export type { TopBarProps };
