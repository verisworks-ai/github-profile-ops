import { createInterface } from 'readline';

const C = {
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
  cyan: '\x1b[36m', green: '\x1b[32m', yellow: '\x1b[33m',
  blue: '\x1b[34m', magenta: '\x1b[35m', gray: '\x1b[90m'
};

const THEMES = {
  '1': { name: 'Ocean Blue',    header: '0:0F172A,50:1E3A5F,100:0EA5E9', accent: '0EA5E9', fire: '10B981', ring: '0EA5E9' },
  '2': { name: 'Forest Green',  header: '0:0F2A0F,50:1A4A1A,100:22C55E', accent: '22C55E', fire: '16A34A', ring: '22C55E' },
  '3': { name: 'Sunset Purple', header: '0:1A0F2A,50:3B1A5F,100:A855F7', accent: 'A855F7', fire: 'EC4899', ring: 'A855F7' },
  '4': { name: 'Minimal Gray',  header: '0:0F0F0F,50:1F1F1F,100:6B7280', accent: '6B7280', fire: '9CA3AF', ring: '6B7280' }
};

function ask(rl, question) {
  return new Promise(resolve => rl.question(question, resolve));
}

function print(msg) { process.stderr.write(msg + '\n'); }
function bold(s) { return C.bold + s + C.reset; }
function dim(s) { return C.dim + s + C.reset; }
function cyan(s) { return C.cyan + s + C.reset; }
function green(s) { return C.green + s + C.reset; }

export async function runInteractive(username, profile, repos) {
  const rl = createInterface({ input: process.stdin, output: process.stderr });

  print('');
  print(bold(cyan('  github-profile-ops — interactive setup')));
  print(dim(`  GitHub에서 ${username} 프로필을 가져왔어. 몇 가지 질문에 답해줘.`));
  print('');

  // Q1: tagline
  const bioDefault = profile.bio ? dim(` [Enter = "${profile.bio}"]`) : dim(' [Enter = skip]');
  const taglineInput = await ask(rl, `  ${bold('1.')} 프로필 한 줄 소개${bioDefault}\n  > `);
  const tagline = taglineInput.trim() || profile.bio || '';

  // Q2: theme
  print('');
  print(`  ${bold('2.')} 색상 테마를 선택해줘:`);
  for (const [k, t] of Object.entries(THEMES)) print(`     ${bold(k)}) ${t.name}`);
  const themeInput = (await ask(rl, `  > `)).trim();
  const theme = THEMES[themeInput] || THEMES['1'];
  print(green(`  ✔ ${theme.name} 선택됨`));

  // Q3: stats
  print('');
  const statsInput = await ask(rl, `  ${bold('3.')} Stats & Streak 카드 포함할까? ${dim('[Y/n]')}\n  > `);
  const includeStats = statsInput.trim().toLowerCase() !== 'n';

  // Q4: snake
  let includeSnake = false;
  if (includeStats) {
    const snakeInput = await ask(rl, `  ${bold('4.')} Contribution snake 포함할까? ${dim('[y/N]')}\n  > `);
    includeSnake = snakeInput.trim().toLowerCase() === 'y';
  }

  rl.close();
  print('');

  return { tagline, theme, includeStats, includeSnake };
}

export function printSetupGuide(username, outputFile) {
  const lines = [
    '',
    C.bold + C.green + '  ✅ README.md 생성 완료!' + C.reset,
    '',
    C.bold + '  📋 GitHub 프로필에 적용하는 방법:' + C.reset,
    '',
    C.cyan + '  1단계' + C.reset + ' — 레포 생성',
    `     ${C.blue}https://github.com/new${C.reset} 접속`,
    `     Repository name 에 정확히 ${C.bold + C.yellow + username + C.reset} 입력 (내 아이디와 동일해야 함)`,
    '     Public 선택 → Create repository 클릭',
    '',
    C.cyan + '  2단계' + C.reset + ' — 파일 업로드',
    `     방금 생성된 ${C.bold}${outputFile}${C.reset} 파일을 해당 레포에 업로드`,
    `     (또는 git push: ${C.dim}git init && git add README.md && git commit -m "init" && git push${C.reset})`,
    '',
    C.cyan + '  3단계' + C.reset + ' — 확인',
    `     ${C.blue}https://github.com/${username}${C.reset} 접속 → 프로필에 README 표시됨`,
    '',
    C.dim + `  ℹ️  재생성: npx ... github-profile-ops ${username} --dry-run` + C.reset,
    ''
  ];
  for (const l of lines) process.stderr.write(l + '\n');
}

export { THEMES };
