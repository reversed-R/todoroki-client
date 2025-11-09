import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/signup/")({
  component: RouteComponent,
});

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuth } from "@/context/auth";
import { SignupForm } from "@/components/user/SignupForm";
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

          // // ログイン成功時には/にリダイレクト
          // navigate({ to: "/" });
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
        <p>
          Todorokiはsuggestionの追加などを行うためにユーザー登録が必要です。
        </p>
        <p>ユーザー登録にはGoogleアカウントでのログインが必要です。</p>
        <p>
          パブリックインターネットに公開しても良く、しかしownerには誰だかわかってもらえるくらいの、かわいらしいおなまえをつけましょう。
        </p>
      </section>

      <section>
        <Button onClick={onClick} variant="primary">
          Googleアカウントでsignin
        </Button>
      </section>

      <section>
        <SignupForm
          onSubmit={() => {
            console.log("onSubmit");
          }}
          onCancel={() => {
            navigate({ to: "/" });
          }}
        />
      </section>

      <section>
        <p>すでにユーザー登録がお済みの方はこちらからサインイン。</p>

        <Button
          onClick={() => {
            navigate({ to: "/signin" });
          }}
          variant="secondary"
        >
          signin
        </Button>
      </section>
    </main>
  );
}
