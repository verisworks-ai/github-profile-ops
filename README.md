# github-profile-ops

GitHub 프로필 README 생성기 — [prompt-ops-maker](https://github.com/verisworks-ai/prompt-ops-maker) 원칙 적용.

GitHub API에서 실제 데이터를 가져와 **profile ops spec** (scope + verification gates + output constraints)을 생성하고, 그 스펙으로 README를 렌더링한다. API 키 없이 동작.

## One-line result

```
github-profile-ops = GitHub API data + profile ops spec → README.md
```

## Quick start

```bash
# npx (no install)
npx --yes --package=@veris.works/github-profile-ops github-profile-ops <username>

# dry-run (stdout only)
npx --yes --package=@veris.works/github-profile-ops github-profile-ops <username> --dry-run

# show the generated ops spec
npx --yes --package=@veris.works/github-profile-ops github-profile-ops <username> --show-spec

# write to file
npx --yes --package=@veris.works/github-profile-ops github-profile-ops <username> --output=README.md
```

## How it works

```
GitHub API (/users/:username + /repos)
  ↓
profile ops spec (scope · verification gates · output constraints)
  ↓
README.md
```

`--show-spec` 플래그로 spec을 직접 확인할 수 있다:

```json
{
  "scope": "Generate a GitHub profile README for verisworks-ai",
  "gates": [
    "no_unverified_claims",
    "no_marketing_hype",
    "result_first",
    "no_secret_echo",
    "verification_aware"
  ],
  "output": { "format": "github_flavored_markdown", "style": "verification-first" }
}
```

이 구조는 [prompt-ops-maker](https://github.com/verisworks-ai/prompt-ops-maker)가 AI 에이전트 운영 프롬프트를 생성하는 방식과 동일하다. prompt to production 파이프라인의 첫 단계.

## Requirements

- Node.js 18+
- 인터넷 연결 (GitHub API 호출)
- API 키 불필요

## Security boundary

- GitHub 공개 API만 사용. 인증 불필요.
- 파일 쓰기: `--output` 지정 경로 한 개만. 기본값 `README.md` (현재 디렉토리).
- 외부 LLM 호출 없음. 분석은 로컬에서만.
- 민감 정보(토큰·내부 경로)는 spec `no_secret_echo` 게이트로 차단.

## Part of the verisworks-ai pipeline

```
prompt-ops-maker (write) → vibecodecheck (audit) → MCP servers (serve)
        ↑
github-profile-ops — profile README generation with ops-spec structure
```

## License

MIT
