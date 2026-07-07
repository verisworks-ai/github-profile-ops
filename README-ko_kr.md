<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0F172A,50:1E3A5F,100:0EA5E9&height=120&section=header" width="100%"/>
</p>

<p align="center">
  <strong style="font-size:1.4em;">github-profile-ops</strong>
</p>

<p align="center">
  GitHub 프로필 README를 한 줄로 생성합니다 — <a href="https://github.com/verisworks-ai/prompt-ops-maker">prompt-ops-maker</a> 검증 게이트 기반.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@veris.works/github-profile-ops"><img src="https://img.shields.io/npm/v/@veris.works/github-profile-ops?style=flat-square&color=0EA5E9" alt="npm version"/></a>
  <img src="https://img.shields.io/badge/node-%3E%3D18-green?style=flat-square" alt="Node 18+"/>
  <img src="https://img.shields.io/badge/deps-zero-10B981?style=flat-square" alt="zero deps"/>
  <img src="https://img.shields.io/badge/API%20key-not%20required-64748B?style=flat-square" alt="no API key"/>
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" alt="MIT"/>
</p>

<p align="center">
  <a href="README.md">English</a> ·
  <a href="#quick-start">Quick start</a> ·
  <a href="#동작-방식">동작 방식</a> ·
  <a href="#보안-경계">보안</a>
</p>

---

## 한 줄 결과

```text
GitHub username 입력 → 프로필 README.md 출력
```

`github-profile-ops`는 공개 GitHub 프로필 데이터를 읽고, profile ops spec을 만든 뒤, 애니메이션 헤더·레포 카드·스택 배지·통계 카드가 포함된 프로필 README를 생성합니다.

## 왜 만들었나

GitHub를 처음 쓰는 사람에게 프로필 README 설정은 단계가 많습니다.

```text
내 아이디와 같은 이름의 레포 생성 → Public 선택 → README.md 추가 → push/upload → 프로필 확인
```

이 도구는 위 과정을 질문형 CLI와 생성 후 안내문으로 줄입니다.

## Quick start

```bash
# 처음 쓰는 사람 추천: 질문형 설정
npx --yes --package=@veris.works/github-profile-ops github-profile-ops <username> --interactive

# 파일을 쓰기 전 미리보기
npx --yes --package=@veris.works/github-profile-ops github-profile-ops <username> --dry-run

# 현재 폴더에 README.md 생성
npx --yes --package=@veris.works/github-profile-ops github-profile-ops <username>
```

설치 없음. API 키 없음. Node.js 18+만 필요합니다.

## GitHub 초보자 설정 흐름

README 생성 후 CLI가 아래 절차를 출력합니다.

```text
1. https://github.com/new 접속
2. Repository name에 GitHub username과 같은 이름 입력
3. Public 선택
4. README.md 업로드 또는 commit/push
5. https://github.com/<username> 에서 프로필 표시 확인
```

## 생성되는 것

```text
애니메이션 typing header
자동 선택된 레포 카드
실제 레포 언어 기반 스택 배지
프로필 카운터
Stats / Streak 카드
선택형 contribution snake
테마 선택
연락처 섹션
```

## Interactive mode

```bash
npx --yes --package=@veris.works/github-profile-ops github-profile-ops <username> --interactive
```

질문 4개:

```text
1. 프로필 한 줄 소개
2. 테마: Ocean Blue / Forest Green / Sunset Purple / Minimal Gray
3. Stats & Streak 카드 포함 여부
4. Contribution snake 포함 여부
```

## 동작 방식

```text
fetchGitHubProfile(<username>)
  ↓
buildProfileOpsSpec()
  scope · verification gates · output constraints
  ↓
generateReadme(spec, opts)
  ↓
README.md
```

ops spec 확인:

```bash
npx --yes --package=@veris.works/github-profile-ops github-profile-ops <username> --show-spec
```

예시:

```json
{
  "scope": "Generate a GitHub profile README for <username>",
  "gates": ["no_unverified_claims", "no_marketing_hype", "result_first", "no_secret_echo"],
  "output": { "format": "github_flavored_markdown", "style": "verification-first" }
}
```

## 옵션

```text
Flag                 결과
────────────────────────────────────────────────────────────
--interactive, -i    질문형 설정
--dry-run            stdout 미리보기, 파일 저장 없음
--show-spec          profile ops spec JSON 출력
--output=FILE        README.md 대신 지정 파일에 저장
```

## 보안 경계

```text
GitHub 데이터        공개 API만 사용
API 키              불필요
LLM 호출            없음
파일 쓰기           --output 경로만, 기본 README.md
비밀값 처리          no_secret_echo gate; 토큰 요청 없음
CI baseline         verisworks-ai reusable security workflow
```

## verisworks-ai 파이프라인

```text
prompt-ops-maker (write) → github-profile-ops (profile) → vibecodecheck (audit)
        ↓
MCP servers (serve structured checks)
```

## 요구사항

```text
Node.js >= 18
GitHub public API 접근 가능한 인터넷 연결
```

## License

MIT — [verisworks-ai](https://github.com/verisworks-ai)

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0EA5E9,50:1E3A5F,100:0F172A&height=80&section=footer" width="100%"/>
</p>
