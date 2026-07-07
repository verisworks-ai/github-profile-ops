<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0F172A,50:1E3A5F,100:0EA5E9&height=120&section=header" width="100%"/>
</p>

<p align="center">
  <strong style="font-size:1.4em;">github-profile-ops</strong>
</p>

<p align="center">
  Make a GitHub profile README in one command — powered by <a href="https://github.com/verisworks-ai/prompt-ops-maker">prompt-ops-maker</a> verification gates.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@veris.works/github-profile-ops"><img src="https://img.shields.io/npm/v/@veris.works/github-profile-ops?style=flat-square&color=0EA5E9" alt="npm version"/></a>
  <img src="https://img.shields.io/badge/node-%3E%3D18-green?style=flat-square" alt="Node 18+"/>
  <img src="https://img.shields.io/badge/deps-zero-10B981?style=flat-square" alt="zero deps"/>
  <img src="https://img.shields.io/badge/API%20key-not%20required-64748B?style=flat-square" alt="no API key"/>
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" alt="MIT"/>
</p>

<p align="center">
  <a href="README-ko_kr.md">한국어</a> ·
  <a href="#quick-start">Quick start</a> ·
  <a href="#how-it-works">How it works</a> ·
  <a href="#security-boundary">Security</a>
</p>

---

## One-line result

```text
GitHub username in → profile README.md out
```

`github-profile-ops` fetches public GitHub profile data, builds a small profile ops spec, then renders a profile README with interactive sections, stats cards, badges, and setup guidance.

## Why this exists

GitHub profile README setup is confusing for first-time users:

```text
create a repo with the exact username → make it public → add README.md → push/upload → verify profile page
```

This tool turns that into a guided flow.

## Quick start

```bash
# Interactive setup — recommended for first-time users
npx --yes --package=@veris.works/github-profile-ops github-profile-ops <username> --interactive

# Preview before writing
npx --yes --package=@veris.works/github-profile-ops github-profile-ops <username> --dry-run

# Write README.md in the current directory
npx --yes --package=@veris.works/github-profile-ops github-profile-ops <username>
```

No install. No API key. Node.js 18+ only.

## First-time GitHub setup

After the README is generated, the CLI prints the exact setup guide:

```text
1. Go to https://github.com/new
2. Repository name must exactly match your GitHub username
3. Choose Public
4. Upload or commit README.md
5. Open https://github.com/<username> and verify the profile page
```

## What it produces

Generated README includes:

```text
Animated typing header
Auto-selected repository cards
Stack badges from real repo languages
Profile counter
Stats and streak cards
Optional contribution snake
Theme selector
Contact section
```

## Interactive mode

```bash
npx --yes --package=@veris.works/github-profile-ops github-profile-ops <username> --interactive
```

Questions:

```text
1. One-line tagline
2. Theme: Ocean Blue / Forest Green / Sunset Purple / Minimal Gray
3. Include Stats & Streak cards?
4. Include Contribution snake?
```

## How it works

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

Inspect the generated ops spec:

```bash
npx --yes --package=@veris.works/github-profile-ops github-profile-ops <username> --show-spec
```

Example spec:

```json
{
  "scope": "Generate a GitHub profile README for <username>",
  "gates": ["no_unverified_claims", "no_marketing_hype", "result_first", "no_secret_echo"],
  "output": { "format": "github_flavored_markdown", "style": "verification-first" }
}
```

## Options

```text
Flag                 Result
────────────────────────────────────────────────────────────
--interactive, -i    Guided setup with questions
--dry-run            Preview to stdout, no file written
--show-spec          Print the profile ops spec as JSON
--output=FILE        Write to FILE instead of README.md
```

## Security boundary

```text
GitHub data          Public API only
API key              Not required
LLM call             None
File write           Only --output path, default README.md
Secret handling      no_secret_echo gate; tokens are not requested
CI baseline          verisworks-ai reusable security workflow
```

## Part of the verisworks-ai pipeline

```text
prompt-ops-maker (write) → github-profile-ops (profile) → vibecodecheck (audit)
        ↓
MCP servers (serve structured checks)
```

## Requirements

```text
Node.js >= 18
Internet connection for GitHub public API
```

## License

MIT — [verisworks-ai](https://github.com/verisworks-ai)

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0EA5E9,50:1E3A5F,100:0F172A&height=80&section=footer" width="100%"/>
</p>
