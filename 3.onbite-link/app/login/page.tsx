import AuthCard from "@/components/AuthCard";

export default function LoginPage() {
  return (
    <AuthCard
      title="로그인"
      fields={[
        { label: "이메일", name: "email", type: "email", placeholder: "email@example.com", autoComplete: "email" },
        { label: "비밀번호", name: "password", type: "password", placeholder: "비밀번호", autoComplete: "current-password" },
      ]}
      submitLabel="로그인"
      altText="계정이 없으신가요?"
      altLabel="회원가입"
      altHref="/signup"
    />
  );
}
