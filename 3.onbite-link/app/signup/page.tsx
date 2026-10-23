import AuthCard from "@/components/AuthCard";

export default function SignupPage() {
  return (
    <AuthCard
      title="회원가입"
      fields={[
        { label: "이메일", name: "email", type: "email", placeholder: "email@example.com", autoComplete: "email" },
        { label: "비밀번호", name: "password", type: "password", placeholder: "비밀번호", autoComplete: "new-password" },
        { label: "비밀번호 확인", name: "passwordConfirm", type: "password", placeholder: "비밀번호 확인", autoComplete: "new-password" },
      ]}
      submitLabel="회원가입"
      altText="이미 계정이 있으신가요?"
      altLabel="로그인"
      altHref="/login"
    />
  );
}
