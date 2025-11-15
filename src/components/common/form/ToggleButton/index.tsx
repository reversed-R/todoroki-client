import styles from "./index.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export function ToggleButton({ ...props }: Props) {
  return (
    <label className={styles.toggleWrapper}>
      <input type="checkbox" className={styles.toggleInput} {...props} />
      <span className={styles.slider}></span>
    </label>
  );
}
