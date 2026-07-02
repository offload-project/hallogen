import { memo } from "react";
import { SvgHtmlRender } from "@/components/composite/render/svg-html-render.tsx";
import { Link } from "@/components/ui/link.tsx";
import { MenuContent, MenuItem, MenuLabel, MenuSection, MenuSeparator, MenuSubMenu } from "@/components/ui/menu.tsx";
import type { NavItem } from "@/types";

export const MenuItemsRender = memo(function MenuItemRender({ item }: { item: NavItem }) {
  if (item.type === "separator" || item.type === "spacer") {
    return <MenuSeparator key={item.id} id={item.id} />;
  }

  if (item.type === "section" || item.type === "group") {
    if (item.collapsible) {
      return (
        <MenuSubMenu key={item.id} id={item.id}>
          <MenuItem>
            {item.icon && <SvgHtmlRender svgHtml={item.icon} />} <MenuLabel>{item.label}</MenuLabel>
          </MenuItem>
          <MenuContent items={item.children}>{(child) => <MenuItemRender key={child.id} item={child} />}</MenuContent>
        </MenuSubMenu>
      );
    }

    return (
      <MenuSection key={item.id} id={item.id} label={item.label} items={item.children}>
        {(child) => <MenuItemRender key={child.id} item={child} />}
      </MenuSection>
    );
  }

  return (
    <MenuItem key={item.id} id={item.id}>
      <Link href={item.href} isCurrent={item.isActive}>
        {item.icon && <SvgHtmlRender svgHtml={item.icon} />} <MenuLabel>{item.label}</MenuLabel>
      </Link>
    </MenuItem>
  );
});
