import AuthCard from "@/components/AuthCard";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";

export default async function ForgotPasswordPage({
  searchParams,
}: PageProps<"/forgot-password">) {
  const { error } = await searchParams;

  return (
    <AuthCard title="비밀번호 찾기" altText="비밀번호가 기억나셨나요?" altLabel="로그인" altHref="/login">
      <ForgotPasswordForm
        initialError={
          error ? "재설정 링크가 만료되었거나 올바르지 않습니다. 다시 요청해주세요." : null
        }
      />
    </AuthCard>
  );
}
