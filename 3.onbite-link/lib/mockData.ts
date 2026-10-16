export type Folder = { id: string; name: string };
export type LinkItem = {
  id: string;
  title: string;
  url: string;
  description: string;
  folderId: string;
};

export const folders: Folder[] = [
  { id: "dev", name: "개발" },
  { id: "design", name: "디자인" },
  { id: "read", name: "나중에 읽기" },
];

export const links: LinkItem[] = [
  { id: "1", title: "Next.js 공식 문서", url: "https://nextjs.org/docs", description: "App Router, 서버 컴포넌트 등 핵심 개념 문서", folderId: "dev" },
  { id: "2", title: "Tailwind CSS", url: "https://tailwindcss.com", description: "유틸리티 퍼스트 CSS 프레임워크", folderId: "dev" },
  { id: "3", title: "Figma", url: "https://www.figma.com", description: "협업 기반 디자인 도구", folderId: "design" },
  { id: "4", title: "Dribbble", url: "https://dribbble.com", description: "디자인 영감을 얻을 수 있는 커뮤니티", folderId: "design" },
  { id: "5", title: "React 블로그", url: "https://react.dev/blog", description: "React 팀의 최신 소식", folderId: "read" },
  { id: "6", title: "MDN Web Docs", url: "https://developer.mozilla.org", description: "웹 기술 레퍼런스", folderId: "dev" },
];
