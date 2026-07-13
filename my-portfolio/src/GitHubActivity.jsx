import { useEffect, useState } from 'react';
import { FaGithub, FaCodeBranch, FaStar, FaCodePullRequest } from 'react-icons/fa6';
import { HiExternalLink } from 'react-icons/hi';
import './GitHubActivity.css';

const USERNAME = 'sd12354';
const MAX_EVENTS = 5;

function timeAgo(iso) {
  const sec = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (sec < 60) return `${sec}s ago`;
  if (sec < 3600) return `${Math.floor(sec / 60)}m ago`;
  if (sec < 86400) return `${Math.floor(sec / 3600)}h ago`;
  if (sec < 604800) return `${Math.floor(sec / 86400)}d ago`;
  return `${Math.floor(sec / 604800)}w ago`;
}

function describe(event) {
  const repo = event.repo?.name ?? '';
  const repoUrl = `https://github.com/${repo}`;
  switch (event.type) {
    case 'PushEvent': {
      const commits = event.payload?.commits ?? [];
      const last = commits[commits.length - 1];
      return {
        Icon: FaCodeBranch,
        verb: `Pushed ${commits.length} commit${commits.length === 1 ? '' : 's'} to`,
        repo,
        repoUrl,
        detail: last?.message?.split('\n')[0] ?? null,
        link: last?.sha ? `${repoUrl}/commit/${last.sha}` : repoUrl,
      };
    }
    case 'PullRequestEvent':
      return {
        Icon: FaCodePullRequest,
        verb: `${event.payload?.action === 'closed' ? 'Closed' : 'Opened'} PR in`,
        repo,
        repoUrl,
        detail: event.payload?.pull_request?.title,
        link: event.payload?.pull_request?.html_url ?? repoUrl,
      };
    case 'CreateEvent':
      return {
        Icon: FaCodeBranch,
        verb: `Created ${event.payload?.ref_type ?? 'ref'} in`,
        repo,
        repoUrl,
        detail: event.payload?.ref ?? null,
        link: repoUrl,
      };
    case 'WatchEvent':
      return {
        Icon: FaStar,
        verb: 'Starred',
        repo,
        repoUrl,
        detail: null,
        link: repoUrl,
      };
    case 'IssuesEvent':
      return {
        Icon: FaGithub,
        verb: `${event.payload?.action === 'closed' ? 'Closed' : 'Opened'} issue in`,
        repo,
        repoUrl,
        detail: event.payload?.issue?.title,
        link: event.payload?.issue?.html_url ?? repoUrl,
      };
    default:
      return {
        Icon: FaGithub,
        verb: `${event.type.replace(/Event$/, '')} on`,
        repo,
        repoUrl,
        detail: null,
        link: repoUrl,
      };
  }
}

export default function GitHubActivity() {
  const [events, setEvents] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/users/${USERNAME}/events/public?per_page=20`)
      .then((r) => {
        if (!r.ok) throw new Error(`GitHub API ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (cancelled) return;
        const filtered = data
          .filter((e) =>
            ['PushEvent', 'PullRequestEvent', 'CreateEvent', 'WatchEvent', 'IssuesEvent'].includes(
              e.type,
            ),
          )
          .slice(0, MAX_EVENTS);
        setEvents(filtered);
      })
      .catch((err) => !cancelled && setError(err.message));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="gh-activity">
      <div className="gh-activity__header">
        <FaGithub className="gh-activity__icon" aria-hidden />
        <h3 className="gh-activity__title">Recent GitHub Activity</h3>
        <a
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="gh-activity__profile-link"
        >
          @{USERNAME}
          <HiExternalLink aria-hidden />
        </a>
      </div>

      <div className="gh-activity__heatmap" aria-label="Contribution heatmap">
        <img
          src={`https://ghchart.rshah.org/4ade80/${USERNAME}`}
          alt={`${USERNAME} GitHub contributions over the last year`}
          loading="lazy"
        />
      </div>

      <ul className="gh-activity__list">
        {events === null && !error && (
          <li className="gh-activity__placeholder">Loading recent activity…</li>
        )}
        {error && (
          <li className="gh-activity__placeholder gh-activity__placeholder--error">
            Couldn&apos;t load activity right now.{' '}
            <a
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub →
            </a>
          </li>
        )}
        {events?.length === 0 && (
          <li className="gh-activity__placeholder">No recent public activity.</li>
        )}
        {events?.map((event) => {
          const { Icon, verb, repo, repoUrl, detail, link } = describe(event);
          return (
            <li key={event.id} className="gh-activity__item">
              <Icon className="gh-activity__item-icon" aria-hidden />
              <div className="gh-activity__item-body">
                <div className="gh-activity__item-line">
                  <span className="gh-activity__verb">{verb}</span>{' '}
                  <a
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gh-activity__repo"
                  >
                    {repo}
                  </a>
                </div>
                {detail && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gh-activity__detail"
                  >
                    {detail}
                  </a>
                )}
              </div>
              <span className="gh-activity__time">{timeAgo(event.created_at)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
