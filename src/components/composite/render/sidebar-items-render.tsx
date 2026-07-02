import { EllipsisIcon } from "lucide-react";
import { memo } from "react";
import { MenuItemsRender } from "@/components/composite/render/menu-items-render.tsx";
import { SvgHtmlRender } from "@/components/composite/render/svg-html-render.tsx";
import { Menu, MenuContent } from "@/components/ui/menu.tsx";
import {
  SidebarDisclosure,
  SidebarDisclosureGroup,
  SidebarDisclosurePanel,
  SidebarDisclosureTrigger,
  SidebarItem,
  SidebarLabel,
  SidebarLink,
  SidebarMenuTrigger,
  SidebarSection,
  SidebarSeparator,
} from "@/components/ui/sidebar.tsx";
import type { NavItem } from "@/types";

export const SidebarItemsRender = memo(function SidebarItemRender({ item }: { item: NavItem }) {
  if (item.type === "separator" || item.type === "spacer") {
    return <SidebarSeparator key={item.id} />;
  }

  if (item.type === "group" || item.type === "section") {
    if (item.collapsible) {
      return (
        <SidebarDisclosureGroup key={item.id} defaultExpandedKeys={item.isActive ? [item.id] : undefined}>
          <SidebarDisclosure id={item.id}>
            <SidebarDisclosureTrigger>
              <EllipsisIcon />
              <SidebarLabel>{item.label}</SidebarLabel>
            </SidebarDisclosureTrigger>
            <SidebarDisclosurePanel>
              {item.children.map((child) => (
                <SidebarItemRender key={child.id} item={child} />
              ))}
            </SidebarDisclosurePanel>
          </SidebarDisclosure>
        </SidebarDisclosureGroup>
      );
    }

    if (item.type === "section") {
      return (
        <SidebarSection key={item.id} label={item.label}>
          {item.children.map((child) => (
            <SidebarItemRender key={child.id} item={child} />
          ))}
        </SidebarSection>
      );
    }

    if (item.type === "group") {
      return (
        <SidebarItem key={item.id} id={item.id} tooltip={item.label} label={item.label}>
          {({ isCollapsed, isFocused }) => (
            <>
              <SidebarLink href="#">
                {item.icon && <SvgHtmlRender svgHtml={item.icon} />} <SidebarLabel>{item.label}</SidebarLabel>
              </SidebarLink>
              {(!isCollapsed || isFocused) && (
                <Menu>
                  <SidebarMenuTrigger aria-label="Manage">
                    <EllipsisIcon />
                  </SidebarMenuTrigger>
                  <MenuContent popover={{ offset: 0, placement: "right top" }}>
                    {item.children.map((child) => (
                      <MenuItemsRender key={child.id} item={child} />
                    ))}
                  </MenuContent>
                </Menu>
              )}
            </>
          )}
        </SidebarItem>
      );
    }
  }

  return (
    <SidebarItem key={item.id} href={item.href} tooltip={item.label} isCurrent={item.isActive}>
      {item.icon && <SvgHtmlRender svgHtml={item.icon} />} <SidebarLabel>{item.label}</SidebarLabel>
    </SidebarItem>
  );
});
