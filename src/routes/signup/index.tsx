import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/signup/")({
  component: RouteComponent,
});

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuth } from "@/context/auth";
import { SignupForm } from "@/components/user/SignupForm";
import { Button } from "@/components/common/Button";
import type { IUserFormInput } from "@/types/user";
import { client } from "@/lib/openapi";

function RouteComponent() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

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
      });
  };

  const postUser = client.useMutation("post", "/users", {
    onSuccess: () => {
      console.log("create user succeeded");
      navigate({ to: "/" });
    },
    onError: () => {
      console.log("create user failed");
    },
  });

  const onSubmit = (data: IUserFormInput) => {
    if (isAuthenticated) {
      postUser.mutate({
        body: {
          name: data.name,
        },
      });
    } else {
      console.log("user not verified");
    }
  };

  // TODO: ユーザー登録を
  // 1. Google アカウント認証
  // 2. 情報登録
  // というように段階化する

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
          onSubmit={onSubmit}
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
