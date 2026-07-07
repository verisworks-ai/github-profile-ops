#!/usr/bin/env node
import { fetchGitHubProfile } from './fetch.js';
import { buildProfileOpsSpec } from './prompt.js';
import { generateReadme } from './generator.js';
import { runInteractive, printSetupGuide } from './interactive.js';
import { writeFileSync } from 'fs';

const args = process.argv.slice(2);
const username = args.find(a => !a.startsWith('--'));
const dryRun = args.includes('--dry-run');
const showSpec = args.includes('--show-spec');
const interactive = args.includes('--interactive') || args.includes('-i');
const outputArg = args.find(a => a.startsWith('--output='));
const output = outputArg ? outputArg.split('=')[1] : 'README.md';

if (!username) {
  process.stderr.write([
    '',
    '  Usage: github-profile-ops <username> [options]',
    '',
    '  Options:',
    '    --interactive, -i   Ask questions to customize your README',
    '    --dry-run           Preview output without writing file',
    '    --show-spec         Show the generated profile ops spec',
    '    --output=FILE       Write to FILE instead of README.md',
    '',
    '  Examples:',
    '    github-profile-ops verisworks-ai --interactive',
    '    github-profile-ops verisworks-ai --dry-run',
    '    github-profile-ops verisworks-ai --output=PROFILE.md',
    ''
  ].join('\n'));
  process.exit(1);
}

try {
  process.stderr.write(`\n  Fetching ${username} from GitHub...\n`);
  const { profile, repos } = await fetchGitHubProfile(username);
  process.stderr.write(`  Found ${repos.length} public repos.\n`);

  const spec = buildProfileOpsSpec(profile, repos);

  if (showSpec) {
    process.stdout.write(JSON.stringify(spec, null, 2) + '\n');
    process.exit(0);
  }

  let opts = {};
  if (interactive) {
    opts = await runInteractive(username, profile, repos);
  }

  const readme = generateReadme(spec, opts);

  if (dryRun) {
    process.stderr.write('\n  --- DRY RUN (no file written) ---\n\n');
    process.stdout.write(readme);
  } else {
    writeFileSync(output, readme, 'utf8');
    process.stderr.write(`\n  Written to ${output}\n`);
    printSetupGuide(username, output);
  }
} catch (err) {
  process.stderr.write(`\n  Error: ${err.message}\n`);
  process.exit(1);
}
