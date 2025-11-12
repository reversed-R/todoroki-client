import { useAuth } from "@/context/auth";
import { Button } from "../common/Button";
import { useNavigate } from "@tanstack/react-router";
import styles from "./index.module.scss";

export function Header() {
  const { isAuthenticated, photoUrl, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <h1 className={styles.appTitle}>Todoroki</h1>
      {isAuthenticated ? (
        <div className={styles.accountContainer}>
          <Button onClick={logout} variant="secondary">
            signout
          </Button>
          <img
            src={photoUrl ? photoUrl : undefined}
            className={styles.accountIcon}
          />
        </div>
      ) : (
        <div className={styles.accountContainer}>
          <Button
            onClick={() => {
              navigate({ to: "/signin" });
            }}
            variant="primary"
          >
            signin
          </Button>

          <Button
            onClick={() => {
              navigate({ to: "/signup" });
            }}
            variant="secondary"
          >
            signup
          </Button>
        </div>
      )}
    </header>
  );
}
