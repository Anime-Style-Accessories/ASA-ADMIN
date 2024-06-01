import { LucideIcon } from 'lucide-react';

type TSidebarMeta = {
  icon?: LucideIcon;
  title: string;
  href?: string;
};

type TSidebar = TSidebarMeta & {
  items?: TSidebarMeta[];
};

type TSidebarGroup = {
  title: string;
  items: TSidebar[];
  hasSeparator?: boolean;
};

export type { TSidebar, TSidebarGroup, TSidebarMeta };
