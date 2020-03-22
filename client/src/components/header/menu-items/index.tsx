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
          <a href="/uzaktan-calisanlar">#uzaktan-calisanlar</a>
        </li>
        <li>
          <a href="/random">#random</a>
        </li>
        <li>
          <a href="/gaming">#gaming</a>
        </li>
        <li>
          <a href="/covid19-haberleri">#covid19-haberleri</a>
        </li>
      </ul>
    </div>
  );
}
