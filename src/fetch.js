export async function fetchGitHubProfile(username) {
  const headers = { 'User-Agent': 'github-profile-ops/0.1.0', 'Accept': 'application/vnd.github.v3+json' };
  // GitHub API works for both users and orgs via /users/:username
  const [profileRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, { headers }),
    fetch(`https://api.github.com/users/${username}/repos?per_page=30&sort=updated&type=public`, { headers })
  ]);

  if (!profileRes.ok) {
    const err = await profileRes.json().catch(() => ({}));
    throw new Error(`GitHub API ${profileRes.status}: ${err.message || username + ' not found'}`);
  }

  const profile = await profileRes.json();
  const repos = reposRes.ok ? await reposRes.json() : [];

  return { profile, repos: repos.filter(r => !r.fork) };
}
