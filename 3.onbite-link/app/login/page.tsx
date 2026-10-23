import AuthCard from "@/components/AuthCard";
import AuthField from "@/components/AuthField";

export default function LoginPage() {
  return (
    <AuthCard title="로그인" altText="계정이 없으신가요?" altLabel="회원가입" altHref="/signup">
      <AuthField label="이메일" name="email" type="email" placeholder="email@example.com" autoComplete="email" />
      <AuthField label="비밀번호" name="password" type="password" placeholder="비밀번호" autoComplete="current-password" />
      <button
        type="button"
        className="btn-primary mt-2 cursor-pointer rounded-md bg-[var(--accent)] px-4 py-2 text-sm text-white"
      >
        로그인
      </button>
    </AuthCard>
  );
}
