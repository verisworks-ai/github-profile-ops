#!/usr/bin/env node
import { fetchGitHubProfile } from './fetch.js';
import { buildProfileOpsSpec } from './prompt.js';
import { generateReadme } from './generator.js';
import { writeFileSync } from 'fs';

const args = process.argv.slice(2);
const username = args.find(a => !a.startsWith('--'));
const dryRun = args.includes('--dry-run');
const showSpec = args.includes('--show-spec');
const outputArg = args.find(a => a.startsWith('--output='));
const output = outputArg ? outputArg.split('=')[1] : 'README.md';

if (!username) {
  console.error('Usage: github-profile-ops <username> [--dry-run] [--show-spec] [--output=README.md]');
  process.exit(1);
}

try {
  process.stderr.write(`Fetching ${username} from GitHub API...\n`);
  const { profile, repos } = await fetchGitHubProfile(username);
  process.stderr.write(`Found ${repos.length} public repos. Building spec...\n`);

  const spec = buildProfileOpsSpec(profile, repos);

  if (showSpec) {
    console.log(JSON.stringify(spec, null, 2));
    process.exit(0);
  }

  const readme = generateReadme(spec);

  if (dryRun) {
    process.stderr.write('--- DRY RUN (stdout only, no file written) ---\n\n');
    process.stdout.write(readme);
  } else {
    writeFileSync(output, readme, 'utf8');
    process.stderr.write(`Written to ${output}\n`);
  }
} catch (err) {
  process.stderr.write(`Error: ${err.message}\n`);
  process.exit(1);
}
