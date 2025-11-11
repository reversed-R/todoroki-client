import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/signin/")({
  component: RouteComponent,
});

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/common/Button";
import { $api } from "@/lib/openapi";

function RouteComponent() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <UserVerifier />;
  }

  const onClick = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);

        if (credential) {
          const user = result.user;
          const token: string = await user.getIdToken();
          const refreshToken: string = user.refreshToken;
          const photoUrl = user.photoURL;

          login(token, refreshToken, photoUrl);
        } else {
          throw new Error("failed to sign in");
        }
      })
      .catch((error) => {
        console.log(error);
        return;
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

function UserVerifier() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const { data, isError } = $api
    .client({ token: token || "" })
    .useSuspenseQuery("get", "/users/me");

  if (isError) {
    return (
      <main>
        <section>
          <p>認証に失敗しました</p>
        </section>
      </main>
    );
  }

  if (data) {
    console.log("succeeded to verified", data);
    navigate({ to: "/" });
  }

  return (
    <main>
      <section>
        <p>認証中...</p>
      </section>
    </main>
  );
}
