// Profile ops spec — same structural approach as prompt-ops-maker:
// scope definition → verification gates → output constraints → result-first format

export function buildProfileOpsSpec(profile, repos) {
  const topLanguages = detectTopLanguages(repos);
  const featuredRepos = repos
    .filter(r => r.name !== profile.login && r.name !== '.github')
    .sort((a, b) => b.stargazers_count - a.stargazers_count || b.updated_at.localeCompare(a.updated_at))
    .slice(0, 8)
    .map(r => ({ name: r.name, description: r.description, language: r.language, stars: r.stargazers_count, url: r.html_url }));

  return {
    scope: `Generate a GitHub profile README for ${profile.login}`,
    subject: {
      login: profile.login,
      name: profile.name || profile.login,
      bio: profile.bio || '',
      blog: profile.blog || '',
      email: profile.email || '',
      company: profile.company || '',
      location: profile.location || '',
      followers: profile.followers,
      public_repos: profile.public_repos,
      avatar_url: profile.avatar_url
    },
    context: { topLanguages, featuredRepos },
    gates: [
      'no_unverified_claims',   // only facts from GitHub API
      'no_marketing_hype',      // no "powerful", "innovative", "cutting-edge"
      'result_first',           // show projects prominently above bio details
      'no_secret_echo',         // no tokens or internal paths
      'verification_aware'      // output must reflect actual repo state
    ],
    output: {
      format: 'github_flavored_markdown',
      include: ['identity', 'projects', 'stack', 'connect'],
      style: 'verification-first'
    }
  };
}

function detectTopLanguages(repos) {
  const counts = {};
  for (const r of repos) {
    if (r.language) counts[r.language] = (counts[r.language] || 0) + 1;
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([lang]) => lang);
}
