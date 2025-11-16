import styles from "./index.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
}

export function Checkbox({ children, ...props }: Props) {
  return (
    <div className={styles.checkbox}>
      <label className={styles.label}>
        <input type="checkbox" className={styles.input} {...props} />
        {children}
      </label>
    </div>
  );
}
