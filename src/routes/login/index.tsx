import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/login/")({
  component: RouteComponent,
});

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuth } from "@/context/auth";

function RouteComponent() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const { login } = useAuth();
  const navigate = useNavigate();

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
      <button onClick={onClick}>login</button>
      <div>Hello "/login/"!</div>
    </main>
  );
}
