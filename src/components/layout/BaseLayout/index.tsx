import styles from "./index.module.scss";

export function BaseLayout({ children }: { children: React.ReactNode }) {
  return <main className={styles.main}>{children}</main>;
}
