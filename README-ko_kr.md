<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0F172A,50:1E3A5F,100:0EA5E9&height=120&section=header" width="100%"/>
</p>

<p align="center">
  <strong style="font-size:1.4em;">github-profile-ops</strong>
</p>

<p align="center">
  GitHub 프로필 README 생성기 — <a href="https://github.com/verisworks-ai/prompt-ops-maker">prompt-ops-maker</a> 원칙 적용.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@veris.works/github-profile-ops"><img src="https://img.shields.io/npm/v/@veris.works/github-profile-ops?style=flat-square&color=0EA5E9" alt="npm version"/></a>
  <img src="https://img.shields.io/badge/node-%3E%3D18-green?style=flat-square" alt="Node 18+"/>
  <img src="https://img.shields.io/badge/의존성-없음-10B981?style=flat-square" alt="zero deps"/>
  <img src="https://img.shields.io/badge/API%20키-불필요-64748B?style=flat-square" alt="no API key"/>
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" alt="MIT"/>
</p>

<p align="center">
  <a href="#빠른-시작">빠른 시작</a> ·
  <a href="#작동-방식">작동 방식</a> ·
  <a href="#옵션">옵션</a> ·
  <a href="#보안-경계">보안</a> ·
  <a href="README.md">English</a>
</p>

---

## 한 줄 요약

```
GitHub API 데이터 + profile ops spec → README.md
```

## 빠른 시작

```bash
# 인터랙티브 설정 (처음 사용자 추천)
npx --yes --package=@veris.works/github-profile-ops github-profile-ops <GitHub유저명> --interactive

# 파일 쓰기 전 미리보기
npx --yes --package=@veris.works/github-profile-ops github-profile-ops <GitHub유저명> --dry-run

# 바로 README.md 생성
npx --yes --package=@veris.works/github-profile-ops github-profile-ops <GitHub유저명>
```

설치 불필요. API 키 불필요. 공개 GitHub 계정이면 누구든 사용 가능.

## 생성 결과

- 애니메이션 타이핑 헤더 (capsule-render + readme-typing-svg)
- GitHub API에서 가져온 실제 레포 테이블 (meta 레포 자동 제외)
- 실제 언어 분포에서 감지한 스택 배지
- Stats & streak 카드 (선택)
- Contribution snake (선택)
- 4가지 색상 테마 선택

## 작동 방식

```
fetchGitHubProfile(<username>)
  ↓
buildProfileOpsSpec()     ← prompt-ops-maker와 동일 구조
  scope · 검증 게이트 · 출력 제약
  ↓
generateReadme(spec, opts)
  ↓
README.md
```

`--show-spec` 플래그로 생성된 ops spec 확인:

```json
{
  "scope": "Generate a GitHub profile README for <username>",
  "gates": ["no_unverified_claims", "no_marketing_hype", "result_first", "no_secret_echo"],
  "output": { "format": "github_flavored_markdown", "style": "verification-first" }
}
```

## 인터랙티브 모드

```bash
npx ... github-profile-ops <유저명> --interactive
```

4가지 질문으로 커스터마이징:
1. 프로필 한 줄 소개 (기존 bio 사용 또는 직접 입력)
2. 색상 테마 — Ocean Blue / Forest Green / Sunset Purple / Minimal Gray
3. Stats & Streak 카드 포함 여부
4. Contribution snake 포함 여부

생성 완료 후 GitHub에 적용하는 단계별 안내 출력.

## 옵션

| 플래그 | 설명 |
|--------|------|
| `--interactive`, `-i` | 질문 기반 대화형 설정 |
| `--dry-run` | stdout 미리보기 (파일 미생성) |
| `--show-spec` | profile ops spec JSON 출력 |
| `--output=FILE` | 저장 파일 지정 (기본값: `README.md`) |

## 보안 경계

- GitHub 공개 API만 사용. 인증 불필요.
- 외부 LLM 호출 없음. 모든 처리는 로컬.
- 파일 쓰기: `--output` 지정 경로 한 개만.
- `no_secret_echo` 게이트: 토큰·내부 경로 출력 차단.

## verisworks-ai 파이프라인

```
prompt-ops-maker (작성) → vibecodecheck (감사) → MCP 서버 (배포)
        ↑
github-profile-ops — 프로필 README, 동일 ops-spec 구조
```

## 요구사항

- Node.js 18+
- 인터넷 연결 (GitHub API)

## 라이선스

MIT — [verisworks-ai](https://github.com/verisworks-ai)

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0EA5E9,50:1E3A5F,100:0F172A&height=80&section=footer" width="100%"/>
</p>
