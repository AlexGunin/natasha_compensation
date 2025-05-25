import { SignUpForm } from "../components/auth/sign-up-form";
import { useRedirect } from "../hooks/use-redirect";

export default function SignUpPage() {
  useRedirect();

  return <SignUpForm />;
}
