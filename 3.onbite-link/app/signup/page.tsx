import AuthCard from "@/components/AuthCard";
import SignupForm from "@/components/SignupForm";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata("회원가입", "한입 링크 계정을 만들어보세요.");

export default function SignupPage() {
  return (
    <AuthCard title="회원가입" altText="이미 계정이 있으신가요?" altLabel="로그인" altHref="/login">
      <SignupForm />
    </AuthCard>
  );
}
