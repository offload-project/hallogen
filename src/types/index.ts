import type { InertiaLinkProps } from "@inertiajs/react";
import type { ComponentPropsWithoutRef, HTMLAttributes } from "react";

export interface PaginatedData<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
    page: number | null;
  }>;
}

export interface BreadcrumbItem {
  id: string;
  label: string;
  href?: string;
  isActive?: boolean;
}

export interface NavElementBase {
  id: string;
  type: string;
}

export interface NavItemBase {
  label: string;
  isActive: boolean;
  icon?: string | null;
}

export interface NavCollectionBase {
  collapsible: boolean;
  collapsed: boolean;
  children: NavItem[];
}

export interface NavLink extends NavElementBase, NavItemBase {
  type: "link";
  href: NonNullable<InertiaLinkProps["href"]>;
}

export interface NavGroup extends NavElementBase, NavItemBase, NavCollectionBase {
  type: "group";
}

export interface NavSection extends NavElementBase, NavItemBase, NavCollectionBase {
  type: "section";
}

export interface NavSeparator extends NavElementBase {
  type: "separator";
}

export interface NavSpacer extends NavElementBase {
  type: "spacer";
}

export type NavItem = NavSeparator | NavSpacer | NavGroup | NavLink | NavSection;

export interface ColumnDef {
  id: string;
  label: string;
}

export type HeadingType = { level?: 1 | 2 | 3 | 4 | 5 } & ComponentPropsWithoutRef<"h1" | "h2" | "h3" | "h4" | "h5">;

export interface HeaderProps extends HTMLAttributes<HTMLDivElement>, HeadingType {
  title?: string;
  description?: string;
}
