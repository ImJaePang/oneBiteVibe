import AuthCard from "@/components/AuthCard";
import LoginForm from "@/components/LoginForm";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata("로그인", "한입 링크에 로그인하세요.");

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { error } = await searchParams;

  return (
    <AuthCard
      title="로그인"
      altText="계정이 없으신가요?"
      altLabel="회원가입"
      altHref="/signup"
      extraLink={{ label: "비밀번호를 잊으셨나요?", href: "/forgot-password" }}
    >
      <LoginForm
        initialError={error ? "카카오 로그인에 실패했습니다. 다시 시도해주세요." : null}
      />
    </AuthCard>
  );
}
