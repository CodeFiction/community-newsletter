import { h } from "preact";

export function MenuItems() {
  return (
    <div class={"header--menu-items"}>
      <ul>
        <li>
          <a href="/general">#general</a>
        </li>
        <li>
          <a href="/siber-guvenlik">#siber-guvenlik</a>
        </li>
        <li>
          <a href="/random">#random</a>
        </li>
        <li>
          <a href="/gaming">#gaming</a>
        </li>
      </ul>
    </div>
  );
}
