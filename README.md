# Design Factory

> 여러 디자인 시스템의 템플릿을 탐색하고 다운로드하는 Next.js 15 플랫폼

## 프로젝트 개요

Design Factory는 Material Design, Ant Design, Bootstrap 등 다양한 디자인 시스템 템플릿을 제공하는 쇼케이스 플랫폼입니다. 각 템플릿은 완전히 독립적인 Next.js 프로젝트로 다운로드할 수 있습니다.

### 핵심 기능

- 🎨 **템플릿 갤러리**: 4+ 디자인 시스템 템플릿 탐색
- 📦 **템플릿 다운로드**: ZIP 파일로 완전한 프로젝트 다운로드
- 📋 **코드 복사**: 모든 컴포넌트 코드 원클릭 복사
- 🔄 **템플릿 비교**: 여러 디자인 시스템 나란히 비교
- 🔍 **토큰 탐색**: 모든 디자인 토큰 검색 및 필터링

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.0+
- **Styling**: Tailwind CSS 3.4+ + CSS Modules
- **Theme**: next-themes
- **Content**: MDX
- **Export**: jszip
- **Icons**: lucide-react

## 시작하기

### 필수 요구사항

- Node.js 18.18.0 이상
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 타입 체크
npm run type-check

# 린트
npm run lint
```

개발 서버는 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

## 프로젝트 구조

```
design-factory/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   ├── components/
│   │   ├── showcase/          # 쇼케이스 UI 컴포넌트
│   │   └── ui/                # 공유 UI 컴포넌트
│   ├── templates/             # 디자인 시스템 템플릿
│   │   ├── material/
│   │   ├── ant-design/
│   │   ├── bootstrap/
│   │   └── custom/
│   ├── lib/
│   │   ├── templates/         # 템플릿 로더/내보내기
│   │   └── design-tokens/     # 토큰 파서
│   └── styles/                # 글로벌 스타일
├── public/templates/          # 정적 에셋
└── scripts/                   # 빌드 스크립트
```

## 개발 현황

- [x] Phase 1: Foundation - Next.js 15 프로젝트 초기화
- [ ] Phase 2: First Template (Material Design)
- [ ] Phase 3: Showcase UI
- [ ] Phase 4: Download & Export
- [ ] Phase 5: Comparison Features
- [ ] Phase 6: Token Explorer
- [ ] Phase 7: Additional Templates
- [ ] Phase 8: Polish

자세한 개발 계획은 [PLANNING.md](./PLANNING.md)를 참고하세요.

## 기여하기

이 프로젝트는 현재 개발 초기 단계입니다. 기여 가이드라인은 추후 추가될 예정입니다.

## 라이선스

MIT

## 링크

- **Repository**: https://github.com/ByeongGi/design-factory
- **Issue Tracker**: https://github.com/ByeongGi/design-factory/issues
