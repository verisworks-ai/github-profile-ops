import test from 'node:test';
import assert from 'node:assert/strict';
import { buildProfileOpsSpec } from '../src/prompt.js';
import { generateReadme } from '../src/generator.js';

const profile = {
  login: 'verisworks-ai',
  name: 'verisworks-ai',
  bio: 'Ship with verification, not vibes.',
  blog: 'https://veris.kr',
  email: 'hello@veris.kr',
  company: 'veris',
  location: 'KR',
  followers: 10,
  public_repos: 4,
  avatar_url: 'https://example.com/avatar.png'
};

const repos = [
  { name: 'verisworks-ai', description: 'profile repo', language: 'Markdown', stargazers_count: 100, updated_at: '2026-01-01T00:00:00Z', html_url: 'https://github.com/verisworks-ai/verisworks-ai', fork: false },
  { name: '.github', description: 'baseline', language: 'YAML', stargazers_count: 90, updated_at: '2026-01-02T00:00:00Z', html_url: 'https://github.com/verisworks-ai/.github', fork: false },
  { name: 'prompt-ops-maker', description: 'Prompt ops CLI', language: 'Python', stargazers_count: 50, updated_at: '2026-01-03T00:00:00Z', html_url: 'https://github.com/verisworks-ai/prompt-ops-maker', fork: false },
  { name: 'vibecodecheck', description: 'Site audit CLI', language: 'JavaScript', stargazers_count: 40, updated_at: '2026-01-04T00:00:00Z', html_url: 'https://github.com/verisworks-ai/vibecodecheck', fork: false }
];

test('buildProfileOpsSpec filters meta repos and keeps verification gates', () => {
  const spec = buildProfileOpsSpec(profile, repos);
  assert.equal(spec.scope, 'Generate a GitHub profile README for verisworks-ai');
  assert.deepEqual(spec.context.featuredRepos.map(r => r.name), ['prompt-ops-maker', 'vibecodecheck']);
  assert.ok(spec.gates.includes('no_secret_echo'));
  assert.ok(spec.gates.includes('no_unverified_claims'));
});

test('generateReadme renders profile counter, repo rows, and optional snake', () => {
  const spec = buildProfileOpsSpec(profile, repos);
  const readme = generateReadme(spec, { includeSnake: true });
  assert.match(readme, /komarev\.com\/ghpvc/);
  assert.match(readme, /prompt-ops-maker/);
  assert.match(readme, /vibecodecheck/);
  assert.match(readme, /Contribution snake/);
  assert.doesNotMatch(readme, /ghp_|sk-|npm_/);
});
