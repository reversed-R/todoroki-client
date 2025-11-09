import { useAuth } from "@/context/auth";
import { Button } from "../common/Button";
import { useNavigate } from "@tanstack/react-router";

export function Header() {
  const { isAuthenticated, photoUrl, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header>
      <h1>Todoroki</h1>
      {isAuthenticated ? (
        <>
          <Button onClick={logout} variant="secondary">
            signout
          </Button>
          <img src={photoUrl ? photoUrl : undefined} />
        </>
      ) : (
        <>
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
        </>
      )}
    </header>
  );
}
