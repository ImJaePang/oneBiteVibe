import AuthCard from "@/components/AuthCard";
import ResetPasswordForm from "@/components/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <AuthCard title="비밀번호 재설정" altText="비밀번호가 기억나셨나요?" altLabel="로그인" altHref="/login">
      <ResetPasswordForm />
    </AuthCard>
  );
}
