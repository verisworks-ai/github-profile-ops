<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0F172A,50:1E3A5F,100:0EA5E9&height=120&section=header" width="100%"/>
</p>

<p align="center">
  <strong style="font-size:1.4em;">github-profile-ops</strong>
</p>

<p align="center">
  GitHub profile README generator — powered by <a href="https://github.com/verisworks-ai/prompt-ops-maker">prompt-ops-maker</a> principles.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@veris.works/github-profile-ops"><img src="https://img.shields.io/npm/v/@veris.works/github-profile-ops?style=flat-square&color=0EA5E9" alt="npm version"/></a>
  <img src="https://img.shields.io/badge/node-%3E%3D18-green?style=flat-square" alt="Node 18+"/>
  <img src="https://img.shields.io/badge/deps-zero-10B981?style=flat-square" alt="zero deps"/>
  <img src="https://img.shields.io/badge/API%20key-not%20required-64748B?style=flat-square" alt="no API key"/>
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" alt="MIT"/>
</p>

<p align="center">
  <a href="#quick-start">Quick start</a> ·
  <a href="#how-it-works">How it works</a> ·
  <a href="#options">Options</a> ·
  <a href="#security-boundary">Security</a>
</p>

---

## One-line result

```
GitHub API data + profile ops spec → README.md
```

## Quick start

```bash
# Interactive setup (recommended for first-timers)
npx --yes --package=@veris.works/github-profile-ops github-profile-ops <username> --interactive

# Preview before writing
npx --yes --package=@veris.works/github-profile-ops github-profile-ops <username> --dry-run

# Write directly
npx --yes --package=@veris.works/github-profile-ops github-profile-ops <username>
```

No install required. No API key. Works with any public GitHub account.

## What it produces

<!-- TODO: add terminal screenshot .github/assets/github-profile-ops-demo.png
<p align="center">
  <img src=".github/assets/github-profile-ops-demo.png" width="720" alt="demo output"/>
</p>
-->

Generated README includes:
- Animated typing header (capsule-render + readme-typing-svg)
- Auto-detected repo table (description, language — meta repos filtered)
- Stack badges from actual repo languages
- Stats & streak cards (toggleable)
- Contribution snake (optional)
- Color theme of your choice

## How it works

```
fetchGitHubProfile(<username>)
  ↓
buildProfileOpsSpec()     ← same structure as prompt-ops-maker
  scope · verification gates · output constraints
  ↓
generateReadme(spec, opts)
  ↓
README.md
```

`--show-spec` to inspect the generated ops spec:

```bash
npx ... github-profile-ops <username> --show-spec
```

```json
{
  "scope": "Generate a GitHub profile README for <username>",
  "gates": ["no_unverified_claims", "no_marketing_hype", "result_first", "no_secret_echo"],
  "output": { "format": "github_flavored_markdown", "style": "verification-first" }
}
```

## Interactive mode

```bash
npx ... github-profile-ops <username> --interactive
```

Asks 4 questions:
1. Custom tagline (or use existing bio)
2. Color theme — Ocean Blue / Forest Green / Sunset Purple / Minimal Gray
3. Include Stats & Streak cards?
4. Include Contribution snake?

After generating, prints a step-by-step guide to activate the profile README on GitHub.

## Options

| Flag | Description |
|------|-------------|
| `--interactive`, `-i` | Guided setup with questions |
| `--dry-run` | Preview to stdout, no file written |
| `--show-spec` | Print the profile ops spec as JSON |
| `--output=FILE` | Write to FILE (default: `README.md`) |

## Security boundary

- GitHub public API only. No authentication needed.
- No external LLM calls. All processing is local.
- File write: only the `--output` path. Default: `README.md` in current directory.
- `no_secret_echo` gate: tokens and internal paths are excluded from output.

## Part of the verisworks-ai pipeline

```
prompt-ops-maker (write) → vibecodecheck (audit) → MCP servers (serve)
        ↑
github-profile-ops — profile README, same ops-spec structure
```

## Requirements

- Node.js 18+
- Internet connection (GitHub API)

## License

MIT — [verisworks-ai](https://github.com/verisworks-ai)

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0EA5E9,50:1E3A5F,100:0F172A&height=80&section=footer" width="100%"/>
</p>
