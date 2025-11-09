import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/signin/")({
  component: RouteComponent,
});

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/common/Button";

function RouteComponent() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate({ to: "/" });
  }

  const onClick = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);

        if (credential && credential.idToken) {
          const token = credential.idToken;

          const user = result.user;
          const refreshToken: string = user.refreshToken;
          const photoUrl = user.photoURL;

          login(token, refreshToken, photoUrl);

          // ログイン成功時には/にリダイレクト
          navigate({ to: "/" });
        } else {
          throw new Error("failed to sign in");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main>
      <section>
        <p>TodorokiはGoogleアカウントでサインインできます。</p>
        <Button onClick={onClick} variant="primary">
          Googleアカウントでsignin
        </Button>
      </section>

      <section>
        <p>新たにユーザー登録から行う場合はこちらから。</p>
        <Button
          onClick={() => {
            navigate({ to: "/signup" });
          }}
          variant="secondary"
        >
          signup
        </Button>
      </section>

      <section>
        <Button
          onClick={() => {
            navigate({ to: "/" });
          }}
          variant="secondary"
        >
          ホームに戻る
        </Button>
      </section>
    </main>
  );
}
