import { ChevronDownIcon } from "lucide-react";
import { memo } from "react";
import { MenuItemsRender } from "@/components/composite/render/menu-items-render.tsx";
import { SvgHtmlRender } from "@/components/composite/render/svg-html-render.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Menu, MenuContent, MenuLabel } from "@/components/ui/menu.tsx";
import {
  NavbarItem,
  NavbarLabel,
  NavbarSection,
  NavbarSeparator,
  NavbarSpacer,
  useNavbar,
} from "@/components/ui/navbar.tsx";
import type { NavItem } from "@/types";

export const NavbarItemsRender = memo(function NavbarItemRender({ item }: { item: NavItem }) {
  const { isMobile } = useNavbar();

  if (item.type === "separator") {
    return !isMobile ? <NavbarSeparator key={item.id} /> : null;
  }

  if (item.type === "spacer") {
    return !isMobile ? <NavbarSpacer key={item.id} /> : null;
  }

  if (item.type === "group") {
    return (
      <Menu key={item.id}>
        <Button variant="plain" className="justify-start p-0">
          {item.icon && <SvgHtmlRender svgHtml={item.icon} />} <MenuLabel>{item.label}</MenuLabel>
          <ChevronDownIcon className="size-4" />
        </Button>

        <MenuContent items={item.children}>{(child) => <MenuItemsRender key={child.id} item={child} />}</MenuContent>
      </Menu>
    );
  }

  if (item.type === "section") {
    return (
      <NavbarSection key={item.id}>
        {item.children.map((child) => (
          <NavbarItemRender key={child.id} item={child} />
        ))}
      </NavbarSection>
    );
  }

  return (
    <NavbarItem key={item.id} href={item.href} isCurrent={item.isActive} id={item.id} label={item.label}>
      {item.icon && <SvgHtmlRender svgHtml={item.icon} />} <NavbarLabel>{item.label}</NavbarLabel>
    </NavbarItem>
  );
});
