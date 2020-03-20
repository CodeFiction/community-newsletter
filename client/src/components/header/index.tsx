import { h } from "preact";

import { Logo } from "../logo";
import { MenuItems } from "./menu-items";

export function Header() {
  return (
    <div className="header">
      <div className="brand">
        <Logo />
        <span className="brand--title">
          Gündem <small className="brand-title--small">(Beta)</small>
        </span>
      </div>
      <MenuItems />
    </div>
  );
}
