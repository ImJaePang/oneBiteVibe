import AuthCard from "@/components/AuthCard";
import ResetPasswordForm from "@/components/ResetPasswordForm";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata("비밀번호 재설정", "새 비밀번호를 설정하세요.");

export default function ResetPasswordPage() {
  return (
    <AuthCard title="비밀번호 재설정" altText="비밀번호가 기억나셨나요?" altLabel="로그인" altHref="/login">
      <ResetPasswordForm />
    </AuthCard>
  );
}
