import AuthCard from "@/components/AuthCard";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <AuthCard
      title="로그인"
      altText="계정이 없으신가요?"
      altLabel="회원가입"
      altHref="/signup"
      extraLink={{ label: "비밀번호를 잊으셨나요?", href: "/forgot-password" }}
    >
      <LoginForm />
    </AuthCard>
  );
}
