import { SignInForm } from "../components/auth/sign-in-form";
import { useRedirect } from "../hooks/use-redirect";

export default function SignInPage() {
  useRedirect();

  return <SignInForm />;
}
