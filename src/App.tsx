import { useEffect, useState } from 'react';
import { api } from '@appdeploy/client';
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Compass,
  Copy,
  Film,
  Globe2,
  Layers,
  LoaderCircle,
  Megaphone,
  Music2,
  Radio,
  Sparkles,
  WandSparkles,
  Zap,
} from 'lucide-react';

type Campaign = {
  title: string;
  hook: string;
  channel: string;
  execution: string;
  culturalLink: string;
  testPlan?: string;
  creativeRationale?: string;
  evidenceIds?: string[];
};
type Evidence = { id: string; name: string; type?: string; affinity?: number };
type Result = {
  mode: string;
  business: string;
  audience: string;
  seed: { name: string };
  evidence: Evidence[];
  campaigns: Campaign[];
  disclaimer: string;
};

const example = (
  business: string,
  audience: string,
  seed: string,
  goal: string
): Result => ({
  mode: 'illustrative-preview',
  business,
  audience,
  seed: { name: seed || 'Your cultural starting point' },
  evidence: [
    { id: 'sample-1', name: 'Indie music discoveries', type: 'artist' },
    { id: 'sample-2', name: 'Neighborhood film nights', type: 'movie' },
    { id: 'sample-3', name: 'Local maker culture', type: 'brand' },
  ],
  campaigns: [
    {
      title: 'The cultural crossover',
      hook: 'More than a purchase. Make it a moment.',
      channel: 'Instagram · Reels',
      execution:
        'Create a 20-second visual story connecting ' +
        business +
        ' with a cultural atmosphere the community recognizes. End with one specific call to action.',
      culturalLink:
        'Example theme only. Replace with validated Qloo affinity evidence after connecting.',
    },
    {
      title: 'A shared discovery',
      hook: 'Your next favorite thing starts here.',
      channel: 'TikTok · Short-form',
      execution:
        'Develop a locally relevant discovery series for ' +
        audience +
        '. Highlight what makes the experience memorable, then test the first two hooks.',
      culturalLink:
        'Example concept; no live Qloo audience correlation has been measured.',
    },
    {
      title: 'The neighborhood signal',
      hook: 'Something worth talking about.',
      channel: 'Social · Email',
      execution:
        'Pair a collaboration or event with a ' +
        goal.toLowerCase() +
        ' objective. Invite sign-ups and use an offer code to measure real conversions.',
      culturalLink: 'Illustrative planning advice, not an API-derived trend.',
    },
  ],
  disclaimer:
    'PREVIEW ONLY — sample concepts are illustrative and NOT based on Qloo data. Connect the official Qloo API key to run live discovery.',
});

const initial = {
  business: 'Blue Ridge Coffee',
  audience: 'Young professionals who love local experiences',
  seed: 'Taylor Swift',
  category: 'artist',
  goal: 'Bring in new customers',
};

export default function App() {
  const [form, setForm] = useState(initial);
  const [connected, setConnected] = useState(false);
  const [checking, setChecking] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [baselineResult, setBaselineResult] = useState<Result | null>(null);
  const [comparisonError, setComparisonError] = useState('');
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    api
      .get('/api/status')
      .then(({ data }) => setConnected(!!data.connected))
      .catch(() =>
        setError('Could not verify Qloo connection. Preview remains available.')
      )
      .finally(() => setChecking(false));
  }, []);
  const update = (key: keyof typeof initial, value: string) => {
    setForm(f => ({ ...f, [key]: value }));
    setError('');
  };
  const valid =
    form.business.trim().length > 1 &&
    form.audience.trim().length > 1 &&
    form.seed.trim().length > 1;
  const preview = () => {
    if (!valid) {
      setError(
        'Please complete the business, audience, and cultural inspiration fields.'
      );
      return;
    }
    setError('');
    setBaselineResult(null);
    setComparisonError('');
    setResult(
      example(
        form.business.trim(),
        form.audience.trim(),
        form.seed.trim(),
        form.goal
      )
    );
  };
  const run = async (compare = false) => {
    if (!valid) {
      setError(
        'Please complete the business, audience, and cultural inspiration fields.'
      );
      return;
    }
    setBusy(true);
    setResult(null);
    setBaselineResult(null);
    setComparisonError('');
    setError('');
    try {
      const response = await api.post('/api/campaign', form);
      setResult(response.data as Result);
      if (compare) {
        try {
          const baseline = await api.post('/api/campaign', { ...form, mode: 'llm-only' });
          setBaselineResult(baseline.data as Result);
        } catch { setComparisonError('Qloo succeeded, but the LLM-only comparison failed. Retry the comparison.'); }
      }
    } catch (cause: unknown) {
      const detail = cause as {
        response?: { data?: { error?: string } };
        message?: string;
      };
      setError(
        detail?.response?.data?.error ||
          (connected
            ? 'Live analysis failed. Please try again.'
            : 'Qloo API key not connected. Live campaigns are not available yet.')
      );
    } finally {
      setBusy(false);
    }
  };
  const copy = async () => {
    if (!result) return;
    const text = [
      'JakeAI CulturePilot — ' +
        (result.mode === 'live-qloo' ? 'Qloo-powered report' : 'Example only'),
      result.business + ' | ' + result.audience,
      ...result.campaigns.map(
        (c, i) =>
          i +
          1 +
          '. ' +
          c.title +
          '\n' +
          c.hook +
          '\n' +
          c.channel +
          '\n' +
          c.execution +
          '\n' +
          c.culturalLink + '\n' + (c.creativeRationale ? 'Creative interpretation: ' + c.creativeRationale + '\n' : '') + (c.testPlan ? 'Test before scaling: ' + c.testPlan : '')
      ),
      result.disclaimer,
    ].join('\n\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setError('Clipboard is unavailable in this browser.');
    }
  };
  return (
    <div className="shell">
      <div className="glow-a" />
      <div className="glow-b" />
      <header className="topbar">
        <div className="wordmark">
          <div className="brand-icon">
            <Compass size={21} strokeWidth={2.2} />
          </div>
          <span>
            JakeAI <b>CulturePilot</b>
          </span>
        </div>
        <div className="top-right">
          <span className="tiny-label">QLOO AGENTIC HACKATHON · 2026</span>
          <span className={connected ? 'status live' : 'status'}>
            <i />
            {checking
              ? 'Checking API…'
              : connected
                ? 'API key configured'
                : 'API key needed'}
          </span>
        </div>
      </header>
      <main className="container">
        <section className="hero">
          <div className="eyebrow">
            <Sparkles size={15} /> THE CULTURAL INTELLIGENCE STUDIO{' '}
            <span className="mini-rule" />
          </div>
          <h1>
            Know what <em>moves</em> them.
          </h1>
          <p>
            From cultural signals to campaigns people actually connect with.
            Shape marketing around music, movies, and brands—not guesswork.
          </p>
          <div className="feature-line">
            <span>
              <Globe2 size={16} /> Qloo taste graph
            </span>
            <span>
              <WandSparkles size={16} /> AI campaign planning
            </span>
            <span>
              <Layers size={16} /> Evidence-first ideas
            </span>
          </div>
        </section>
        <div className="workspace">
          <section className="panel form-panel">
            <div className="panel-head">
              <span className="step-num">01</span>
              <div>
                <h2>Set your direction</h2>
                <p>Tell us who you're trying to reach.</p>
              </div>
            </div>
            <div className="field">
              <label htmlFor="business">Business name</label>
              <input
                id="business"
                placeholder="e.g. Blue Ridge Coffee"
                value={form.business}
                onChange={e => update('business', e.target.value)}
                maxLength={100}
              />
            </div>
            <div className="field">
              <label htmlFor="audience">Target audience</label>
              <textarea
                id="audience"
                rows={3}
                placeholder="Who do you want to reach?"
                value={form.audience}
                onChange={e => update('audience', e.target.value)}
                maxLength={120}
              />
            </div>
            <div className="field">
              <label htmlFor="seed">
                Cultural inspiration{' '}
                <span className="optional">(real name, not a demographic)</span>
              </label>
              <input
                id="seed"
                placeholder="Artist, film, or brand"
                value={form.seed}
                onChange={e => update('seed', e.target.value)}
                maxLength={80}
              />
            </div>
            <div className="field">
              <label htmlFor="category">Inspiration type</label>
              <div className="select-wrap">
                <select
                  id="category"
                  value={form.category}
                  onChange={e => update('category', e.target.value)}
                >
                  <option value="artist">Music artist</option>
                  <option value="movie">Movie</option>
                  <option value="brand">Brand</option>
                </select>
                <ChevronDown size={17} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="goal">Primary goal</label>
              <div className="select-wrap">
                <select
                  id="goal"
                  value={form.goal}
                  onChange={e => update('goal', e.target.value)}
                >
                  <option>Bring in new customers</option>
                  <option>Grow social engagement</option>
                  <option>Increase repeat visits</option>
                  <option>Launch a product</option>
                </select>
                <ChevronDown size={17} />
              </div>
            </div>
            {error && (
              <div role="alert" className="error-banner">
                {error}
              </div>
            )}
            <button className="primary-action" onClick={() => run()} disabled={busy}>
              {busy ? (
                <LoaderCircle size={18} className="spin" />
              ) : (
                <Zap size={18} fill="currentColor" />
              )}
              {busy ? 'Connecting the dots…' : 'Generate with live Qloo'}
              <ArrowUpRight size={18} />
            </button>
            <button
              className="secondary-action"
              onClick={preview}
              disabled={busy}
            >
              <Film size={16} /> Explore layout with example ideas
            </button>
            <button className="secondary-action" onClick={() => run(true)} disabled={busy}>Compare with LLM-only</button>
            <p className="hint">
              No campaigns are published or sent. You control every decision.
            </p>
          </section>
          <section className="panel results-panel">
            <div className="panel-head results-header">
              <span className="step-num">02</span>
              <div>
                <h2>Your culture-to-campaign brief</h2>
                <p>Discover connections. Make them useful.</p>
              </div>
              {result && (
                <button className="copy-button" onClick={copy}>
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  <span>{copied ? 'Copied' : 'Copy brief'}</span>
                </button>
              )}
            </div>
            {!result ? (
              <div className="empty-state">
                <div className="orbit">
                  <div className="orbit-ring orbit-outer" />
                  <div className="orbit-ring orbit-mid" />
                  <div className="orbit-center">
                    <Sparkles size={27} />
                  </div>
                  <span className="orbit-node one">
                    <Music2 size={19} />
                  </span>
                  <span className="orbit-node two">
                    <Film size={18} />
                  </span>
                  <span className="orbit-node three">
                    <Radio size={18} />
                  </span>
                </div>
                <h3>Your next big idea is out there.</h3>
                <p>
                  Complete the brief on the left, then preview the experience or
                  run a live Qloo analysis once your API key is connected.
                </p>
                <div className="empty-chips">
                  <span>Culture</span>
                  <span>→</span>
                  <span>Connection</span>
                  <span>→</span>
                  <span>Campaign</span>
                </div>
              </div>
            ) : (
              <div className="campaign-content">
                {comparisonError && <p role="alert" className="error-banner">{comparisonError}</p>}
                {baselineResult && <section className="comparison">
                  <h3>Same brief. Different evidence.</h3>
                  <p>Both runs use the same model service, brief, temperature, output structure, and planning constraints. Only the Qloo run receives retrieved cultural evidence. This is a qualitative comparison, not proof of conversion lift.</p>
                  <h4>LLM-only · no verified cultural signals</h4>
                  {baselineResult.campaigns.map((c, i) => <article className="campaign-card" key={i}>
                    <h4>{c.title}</h4><blockquote>{c.hook}</blockquote><p>{c.execution}</p>
                      {c.creativeRationale && <p><strong>Creative interpretation: </strong>{c.creativeRationale}</p>}<p><strong>Test before scaling: </strong>{c.testPlan}</p>
                    <p>{c.culturalLink}</p>
                  </article>)}
                  <h4>Qloo-grounded · {result.evidence.length} retrieved cultural signals</h4>
                </section>}
                <div
                  className={
                    result.mode === 'live-qloo'
                      ? 'source-banner live-banner'
                      : 'source-banner preview-banner'
                  }
                >
                  <span className="source-circle">
                    <Sparkles size={16} />
                  </span>
                  <div>
                    <strong>
                      {result.mode === 'live-qloo'
                        ? 'Live Qloo analysis'
                        : 'ILLUSTRATIVE EXAMPLE · NOT QLOO DATA'}
                    </strong>
                    <span>Starting point: {result.seed.name}</span>
                  </div>
                </div>
                <div className="insight-heading">
                  <div>
                    <span className="section-number">DISCOVERY / 01</span>
                    <h3>Cultural connections</h3>
                  </div>
                  <span className="count">
                    {result.evidence.length} signals
                  </span>
                </div>
                <div className="signals">
                  {result.evidence.map(s => (
                    <div className="signal" key={s.id}>
                      <span className="signal-dot" />
                      <div className="signal-content">
                        <strong>{s.name}</strong>
                        <small>
                          {s.type || 'culture'}
                          {typeof s.affinity === 'number'
                            ? ' · affinity ' + s.affinity.toFixed(2)
                            : ''}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="insight-heading campaign-heading">
                  <div>
                    <span className="section-number">ACTION / 02</span>
                    <h3>Three campaign directions</h3>
                  </div>
                </div>
                <div className="campaigns">
                  {result.campaigns.map((c, i) => (
                    <article className="campaign-card" key={i}>
                      <div className="campaign-top">
                        <span className="campaign-index">0{i + 1}</span>
                        <span className="campaign-channel">
                          <Megaphone size={13} />
                          {c.channel}
                        </span>
                      </div>
                      <h4>{c.title}</h4>
                      <blockquote>“{c.hook}”</blockquote>
                      <p>{c.execution}</p>
                      {c.testPlan && <p><strong>Test before scaling: </strong>{c.testPlan}</p>}
                      <div className="evidence-note">
                        <Sparkles size={13} />
                        <span>{c.culturalLink}</span>
                      </div>
                    </article>
                  ))}
                </div>
                <p className="disclaimer">{result.disclaimer}</p>
              </div>
            )}
          </section>
        </div>
        <footer>
          <span>
            <span className="footer-mark">✳</span> JakeAI CulturePilot
          </span>
          <span>
            Built for the Qloo Agentic Hackathon · Independent demo · No
            customer data required
          </span>
          <a href="https://qloo.devpost.com/" target="_blank" rel="noreferrer">
            About the challenge <ArrowUpRight size={13} />
          </a>
        </footer>
      </main>
    </div>
  );
}
