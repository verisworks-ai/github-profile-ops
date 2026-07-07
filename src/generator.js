const LANG_COLORS = {
  Python:     { bg: '3776AB', logo: 'python',     text: 'white' },
  JavaScript: { bg: 'F7DF1E', logo: 'javascript', text: 'black' },
  TypeScript: { bg: '3178C6', logo: 'typescript',  text: 'white' },
  Go:         { bg: '00ADD8', logo: 'go',           text: 'white' },
  Rust:       { bg: 'CE422B', logo: 'rust',         text: 'white' },
  Ruby:       { bg: 'CC342D', logo: 'ruby',         text: 'white' },
  Java:       { bg: 'ED8B00', logo: 'java',         text: 'white' },
  'C++':      { bg: '00599C', logo: 'cplusplus',    text: 'white' },
  C:          { bg: 'A8B9CC', logo: 'c',            text: 'black' },
  Shell:      { bg: '4EAA25', logo: 'gnubash',      text: 'white' }
};

export function generateReadme(spec) {
  const { subject, context } = spec;
  const { featuredRepos, topLanguages } = context;

  const repoRows = featuredRepos.slice(0, 6).map(r => {
    const desc = r.description ? r.description.replace(/[|]/g, '\\|') : '—';
    const lang = r.language || '—';
    return `| [**${r.name}**](${r.url}) | ${desc} | ${lang} |`;
  }).join('\n');

  const langBadges = topLanguages.map(lang => {
    const c = LANG_COLORS[lang] || { bg: '555555', logo: lang.toLowerCase(), text: 'white' };
    const safeLang = lang.replace(/[+]/g, '%2B').replace(/ /g, '_');
    return `  <img src="https://img.shields.io/badge/${safeLang}-${c.bg}?style=for-the-badge&logo=${c.logo}&logoColor=${c.text}" alt="${lang}"/>`;
  }).join('\n');

  const blogBadge = subject.blog
    ? `  <a href="${subject.blog}"><img src="https://img.shields.io/badge/${encodeLabel(subject.blog)}-0EA5E9?style=flat-square&logoColor=white" alt="website"/></a>\n  `
    : '';
  const emailBadge = subject.email
    ? `<a href="mailto:${subject.email}"><img src="https://img.shields.io/badge/${encodeLabel(subject.email)}-64748B?style=flat-square" alt="email"/></a>\n  `
    : '';

  const typingLines = buildTypingLines(subject);
  const connectLines = buildConnectLines(subject, featuredRepos);

  return `<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0F172A,50:1E3A5F,100:0EA5E9&height=140&section=header" width="100%"/>
</p>

<p align="center">
  <a href="${subject.blog || `https://github.com/${subject.login}`}">
    <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=28&duration=4000&pause=2000&color=0EA5E9&center=true&vCenter=true&width=640&height=60&lines=${typingLines}" alt="${subject.login}"/>
  </a>
</p>

${subject.bio ? `<p align="center">\n  ${subject.bio}\n</p>\n` : ''}
<p align="center">
  ${blogBadge}${emailBadge}<img src="https://komarev.com/ghpvc/?username=${subject.login}&color=0EA5E9&style=flat-square" alt="profile views"/>
</p>

---

## What we build

| Repo | Description | Lang |
|------|-------------|------|
${repoRows}

---

## Stack

<p align="center">
${langBadges}
</p>

---

## Stats

<p align="center">
  <img src="https://github-profile-summary-cards.vercel.app/api/cards/stats?username=${subject.login}&theme=tokyonight" height="165" alt="GitHub stats"/>
  <img src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=${subject.login}&theme=tokyonight" height="165" alt="Top languages"/>
</p>

<p align="center">
  <img src="https://streak-stats.demolab.com/?user=${subject.login}&theme=tokyonight&hide_border=true&background=0F172A&ring=0EA5E9&fire=10B981&currStreakLabel=0EA5E9" alt="Streak stats"/>
</p>

---

## Connect

${connectLines}

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0EA5E9,50:1E3A5F,100:0F172A&height=100&section=footer" width="100%"/>
</p>
`;
}

function encodeLabel(s) {
  return encodeURIComponent(s.replace(/^https?:\/\//, '').replace(/\/$/, ''));
}

function buildTypingLines(subject) {
  const lines = [subject.login];
  if (subject.bio && subject.bio.length < 60) lines.push(subject.bio);
  else if (subject.name && subject.name !== subject.login) lines.push(subject.name);
  return lines.map(l => encodeURIComponent(l)).join(';');
}

function buildConnectLines(subject, repos) {
  const lines = [];
  if (subject.blog) lines.push(`- Web — [${subject.blog}](${subject.blog})`);
  if (subject.email) lines.push(`- Email — [${subject.email}](mailto:${subject.email})`);
  if (subject.company) lines.push(`- Company — ${subject.company}`);
  if (subject.location) lines.push(`- Location — ${subject.location}`);
  lines.push(`- Issues & ideas — open an issue on any repo above`);
  return lines.join('\n');
}
