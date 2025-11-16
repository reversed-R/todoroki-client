import { useRouterState } from "@tanstack/react-router";
import styles from "./index.module.scss";

type Props = {
  links: { label: string; link: string }[];
};

export function NavigationBar({ links }: Props) {
  const routeState = useRouterState();
  const curretnPath = routeState.location.pathname;

  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        {links.map((l) => (
          <li
            className={l.link === curretnPath ? styles.selectedLi : styles.li}
          >
            <a href={l.link} className={styles.a}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
