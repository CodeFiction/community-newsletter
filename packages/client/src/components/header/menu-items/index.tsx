import { h } from "preact";
import { Link } from 'preact-router/match';

export function MenuItems() {
  return (
    <div class={"header--menu-items"}>
      <ul>
        <li>
          <Link activeClassName="header--menu-items--active" href="/general">#general</Link>
        </li>
        <li>
          <Link activeClassName="header--menu-items--active" href="/siber-guvenlik">#siber-guvenlik</Link>
        </li>
        <li>
          <Link activeClassName="header--menu-items--active" href="/uzaktan-calisanlar">#uzaktan-calisanlar</Link>
        </li>
        <li>
          <Link activeClassName="header--menu-items--active" href="/random">#random</Link>
        </li>
        <li>
          <Link activeClassName="header--menu-items--active" href="/gaming">#gaming</Link>
        </li>
        <li>
          <Link activeClassName="header--menu-items--active" href="/covid19-haberleri">#covid19-haberleri</Link>
        </li>
      </ul>
    </div>
  );
}
