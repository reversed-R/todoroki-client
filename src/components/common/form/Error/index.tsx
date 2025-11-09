import styles from "./index.module.scss";

export function Error({ children }: { children: React.ReactNode }) {
  return <p className={styles.error}>{children}</p>;
}
