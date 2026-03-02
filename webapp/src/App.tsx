import React, { useState, useMemo } from "react";
import "./App.css";

const ParticleBackground: React.FC = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 200 }).map((_) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`, // Distributed across the whole screen
      size: `${Math.random() * 2 + 1}px`,
      duration: `${Math.random() * 20 + 20}s`, // Slower, more elegant drift
      delay: `${Math.random() * -40}s`, // Negative delay so they start at different points in their animation
      opacity: Math.random() * 0.4 + 0.1,
    }));
  }, []);

  return (
    <div className="bg-container">
      <div className="blob blob-primary"></div>
      <div className="blob blob-secondary"></div>
      <div className="particles">
        {particles.map((p, i) => (
          <div
            key={i}
            className="particle"
            style={
              {
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                opacity: p.opacity,
                "--duration": p.duration,
                animationDelay: p.delay,
              } as any
            }
          />
        ))}
      </div>
    </div>
  );
};

import versionsData from './data/versions.json';

const VersionsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src="/logo.svg" alt="FailFanfare" style={{ width: '32px' }} />
            <h2>Version History</h2>
          </div>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {versionsData.map((v, idx) => (
            <div key={v.version} className="version-entry">
              <div className="version-meta">
                <span className="version-number">v{v.version}</span>
                <span className="version-date">{v.date}</span>
              </div>
              {Object.entries(v.changes).map(([type, items]) => (
                <div key={type} className="change-group">
                  <h4>{type}</h4>
                  <ul>
                    {items.map((item: string, i: number) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              ))}
              {idx !== versionsData.length - 1 && <hr className="version-divider" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("react");
  const [isVersionsOpen, setIsVersionsOpen] = useState(false);

  return (
    <div className="app-wrapper">
      <ParticleBackground />

      {/* Hero */}
      <section className="hero container">
        <h1 className="hero-title">FailFanfare</h1>
        <p className="hero-subtitle">
          Turn your dev errors into a party. A fun auditory feedback engine for
          your terminal and browser because debugging shouldn't be boring.
        </p>
        <div className="landing-btns">
          <a href="#specification" className="btn-main">Get Started</a>
          <a
            href="https://github.com/Lancerhawk/FailFanfare-SDK"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-second"
          >
            Github
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="container">
        <div className="features">
          <div className="feature-card">
            <span className="feature-tag">Humor First</span>
            <h3>CLI Integration</h3>
            <p>Wraps your dev tools with sound. Hear a celebration when it works and a "Bruh" when it crashes.</p>
          </div>
          <div className="feature-card">
            <span className="feature-tag">Synced Chaos</span>
            <h3>Single Config</h3>
            <p>One config file to rule them all. Keep your terminal and browser sounds perfectly in sync.</p>
          </div>
          <div className="feature-card">
            <span className="feature-tag">Lightweight</span>
            <h3>Zero Lag</h3>
            <p>Fast as lightning. Uses native OS audio and CDN assets so your dev loop stays snappy.</p>
          </div>
        </div>
      </section>

      {/* Specification Section */}
      <section id="specification" className="container">
        <div className="section-header">
          <h2 className="section-title">SDK Specification</h2>
          <p className="section-desc">
            Exhaustive reference for configuration, sound event mapping, and
            environmental behavior.
          </p>
        </div>

        {/* Integration */}
        <div className="tabs">
          {["react", "vue", "angular", "vanilla"].map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="code-container">
          <pre>
            {activeTab === "react" && (
              <>
                <span className="kw">import</span> {" {"}{" "}
                <span className="fn">useFailFanfare</span> {"} "}{" "}
                <span className="kw">from</span>{" "}
                <span className="st">"failfanfare/react"</span>;<br />
                <br />
                <span className="kw">function</span>{" "}
                <span className="fn">App</span>() {"{"}
                <br />
                &nbsp;&nbsp;<span className="fn">useFailFanfare</span>({"{"}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;watchConsole:{" "}
                <span className="kw">true</span>,<br />
                &nbsp;&nbsp;&nbsp;&nbsp;enableSuccessSound:{" "}
                <span className="kw">true</span>
                <br />
                &nbsp;&nbsp;{"}"});
                <br />
                &nbsp;&nbsp;<span className="kw">return</span> &lt;
                <span className="fn">main</span>&gt;Application Core&lt;/
                <span className="fn">main</span>&gt;;
                <br />
                {"}"}
              </>
            )}
            {activeTab === "vue" && (
              <>
                &lt;<span className="kw">script</span>{" "}
                <span className="kw">setup</span>{" "}
                <span className="kw">lang</span>=
                <span className="st">"ts"</span>&gt;
                <br />
                &nbsp;&nbsp;<span className="kw">import</span> {" {"}{" "}
                <span className="fn">useFailFanfare</span> {"} "}{" "}
                <span className="kw">from</span>{" "}
                <span className="st">"failfanfare/vue"</span>;<br />
                &nbsp;&nbsp;<span className="fn">useFailFanfare</span>();
                <br />
                &lt;/<span className="kw">script</span>&gt;
              </>
            )}
            {activeTab === "angular" && (
              <>
                <span className="kw">import</span> {" {"}{" "}
                <span className="fn">FailFanfareService</span> {"} "}{" "}
                <span className="kw">from</span>{" "}
                <span className="st">"failfanfare/angular"</span>;<br />
                <br />
                &nbsp;&nbsp;<span className="kw">constructor</span>(
                <span className="kw">private</span>{" "}
                <span className="fn">fanfare</span>:{" "}
                <span className="fn">FailFanfareService</span>) {"{}"}
                <br />
                &nbsp;&nbsp;<span className="kw">ngOnInit</span>() {"{"}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">this</span>.
                <span className="fn">fanfare</span>.
                <span className="fn">init</span>();
                <br />
                &nbsp;&nbsp;{"}"}
              </>
            )}
            {activeTab === "vanilla" && (
              <>
                <span className="kw">import</span> {" {"}{" "}
                <span className="fn">initFailFanfare</span> {"} "}{" "}
                <span className="kw">from</span>{" "}
                <span className="st">"failfanfare"</span>;<br />
                <br />
                <span className="fn">initFailFanfare</span>({"{"} volume:{" "}
                <span className="st">0.8</span> {"}"});
              </>
            )}
          </pre>
        </div>

        {/* Configuration Ref */}
        <h3
          style={{ fontSize: "2rem", marginBottom: "2rem", marginTop: "6rem" }}
        >
          Configuration Reference
        </h3>
        <div className="table-wrapper">
          <div className="table-container">
            <table className="config-table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Implementation Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>enabled</code>
                  </td>
                  <td>boolean</td>
                  <td>
                    <code>true</code>
                  </td>
                  <td>
                    Global toggle. CLI uses <code>process.env.NODE_ENV</code>{" "}
                    check to auto-disable in CI.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>volume</code>
                  </td>
                  <td>number</td>
                  <td>
                    <code>0.7</code>
                  </td>
                  <td>
                    Output gain. Normalized via{" "}
                    <code>Math.min(1, Math.max(0, vol))</code> internal clamp.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>throttleMs</code>
                  </td>
                  <td>number</td>
                  <td>
                    <code>2000</code>
                  </td>
                  <td>
                    Cooldown window. Implemented via{" "}
                    <code>Date.now() - lastTrigger</code> timestamp diff.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>watchConsole</code>
                  </td>
                  <td>boolean</td>
                  <td>
                    <code>false</code>
                  </td>
                  <td>
                    Wraps <code>window.console.error</code> using a proxy-style
                    function interposer.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>enableSuccessSound</code>
                  </td>
                  <td>boolean</td>
                  <td>
                    <code>false</code>
                  </td>
                  <td>
                    Initialization signature. Plays once per full page
                    lifecycle.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>sounds</code>
                  </td>
                  <td>object</td>
                  <td>-</td>
                  <td>
                    Dynamic URI mapping. Supports local paths for CLI and remote
                    URLs for Browser.
                    <br />
                    <em>
                      Supports circular fallbacks between CLI/Browser contexts.
                    </em>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="section-header" style={{ marginTop: "8rem" }}>
          <h2 className="section-title">Sound Event Mapping</h2>
          <p className="section-desc">
            Technical triggers for auditory feedback across CLI and Browser
            environments.
          </p>
        </div>

        <div className="table-wrapper">
          <div className="table-container">
            <table className="config-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Domain</th>
                  <th>Technical Trigger & Fallback</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>success</code>
                  </td>
                  <td>Build / Runtime</td>
                  <td>
                    <strong>CLI:</strong> Triggered by regex match for{" "}
                    <code>compiled successfully</code> or <code>done</code>.
                    <br />
                    <strong>Browser:</strong> Fires on{" "}
                    <code>window.onload</code> if{" "}
                    <code>enableSuccessSound</code> is true.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>error</code>
                  </td>
                  <td>Terminal / Console</td>
                  <td>
                    <strong>CLI:</strong> Captured via <code>stderr</code> regex
                    matching <code>error</code> or <code>failed</code>.<br />
                    <strong>Browser:</strong> Triggered via intercepted{" "}
                    <code>console.error</code> calls.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>runtime</code>
                  </td>
                  <td>Browser Engine</td>
                  <td>
                    Fires on uncaught <code>window.onerror</code> events.
                    <br />
                    <em>
                      Fallback: Uses <code>error</code> URI if{" "}
                      <code>runtime</code> is undefined.
                    </em>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>promise</code>
                  </td>
                  <td>Async Flux</td>
                  <td>
                    Monitors <code>unhandledrejection</code> events at the
                    global scope.
                    <br />
                    <em>
                      Fallback: Uses <code>error</code> URI if{" "}
                      <code>promise</code> is undefined.
                    </em>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>console</code>
                  </td>
                  <td>Log Monitoring</td>
                  <td>
                    Opt-in trigger via <code>watchConsole: true</code>{" "}
                    configuration.
                    <br />
                    <em>
                      Fallback: Uses <code>error</code> URI if{" "}
                      <code>console</code> is undefined.
                    </em>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>critical</code>
                  </td>
                  <td>Infrastructure</td>
                  <td>
                    <strong>CLI:</strong> Non-zero process exit or{" "}
                    <code>EADDRINUSE</code> errors.
                    <br />
                    <strong>Browser:</strong> Triggered after 5 successive
                    errors within 10 seconds.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Custom Audio Guide */}
        <div className="section-header" style={{ marginTop: "10rem" }}>
          <h2 className="section-title">Custom Audio Implementation</h2>
          <p className="section-desc">
            Learn how to inject your own sound identity across all development
            layers.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            marginBottom: "4rem",
          }}
        >
          <div className="feature-card">
            <span className="feature-tag">Global Configuration</span>
            <h3>via package.json</h3>
            <p>
              The most powerful way to define sounds. This configuration is
              automatically discovered and used by both the CLI and the Browser
              SDK.
            </p>
            <div
              className="code-container"
              style={{
                padding: "1.5rem",
                marginTop: "1.5rem",
                marginBottom: 0,
              }}
            >
              <pre style={{ fontSize: "0.85rem" }}>
                {"{"}
                <br />
                &nbsp;&nbsp;<span className="st">"failfanfare"</span>: {"{"}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="st">
                  "sounds"
                </span>: {"{"}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="st">"success"</span>:{" "}
                <span className="st">"./sounds/win.mp3"</span>,<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="st">"error"</span>:{" "}
                <span className="st">"./sounds/fail.mp3"</span>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;{"}"}
                <br />
                &nbsp;&nbsp;{"}"}
                <br />
                {"}"}
              </pre>
            </div>
          </div>
          <div className="feature-card">
            <span className="feature-tag">Runtime Override</span>
            <h3>via Browser SDK</h3>
            <p>
              Perfect for temporary overrides or specific page feedback. Pass a
              sounds object directly into the initialization hook.
            </p>
            <div
              className="code-container"
              style={{
                padding: "1.5rem",
                marginTop: "1.5rem",
                marginBottom: 0,
              }}
            >
              <pre style={{ fontSize: "0.85rem" }}>
                <span className="fn">useFailFanfare</span>({"{"}
                <br />
                &nbsp;&nbsp;sounds: {"{"}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;runtime:{" "}
                <span className="st">"/assets/oops.mp3"</span>,<br />
                &nbsp;&nbsp;&nbsp;&nbsp;critical:{" "}
                <span className="st">"/assets/boom.mp3"</span>
                <br />
                &nbsp;&nbsp;{"}"}
                <br />
                {"}"});
              </pre>
            </div>
          </div>
        </div>

        <div className="feature-card" style={{ marginBottom: "8rem" }}>
          <span className="feature-tag">One-off Mode</span>
          <h3>via CLI Flags</h3>
          <p>
            Ideal for quick testing or CI/CD pipelines where you want specific
            auditory alerts without changing code.
          </p>
          <div
            className="code-container"
            style={{ padding: "2rem", marginTop: "1.5rem", marginBottom: 0 }}
          >
            <pre>
              failfanfare --success ./yay.mp3 --error ./nooo.mp3 npm run build
            </pre>
          </div>
        </div>

        {/* CLI Interface */}
        <div className="section-header" style={{ marginTop: "10rem" }}>
          <h2 className="section-title">Command Line Interface</h2>
          <p className="section-desc">
            The CLI provides a transparent wrapper for your development
            toolchain.
          </p>
        </div>

        <div className="code-container">
          <pre>
            <span className="cm"># Standard execution</span>
            <br />
            failfanfare npm run dev
            <br />
            <br />
            <span className="cm"># Explicit overrides</span>
            <br />
            failfanfare --success ./win.mp3 --error ./fail.mp3 vite
            <br />
            <br />
            <span className="cm"># Help & Documentation</span>
            <br />
            failfanfare --help
          </pre>
        </div>

        <div className="table-wrapper">
          <div className="table-container">
            <table className="config-table">
              <thead>
                <tr>
                  <th>Flag</th>
                  <th>Argument</th>
                  <th>Functionality</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>--success</code>
                  </td>
                  <td>path</td>
                  <td>
                    Define a custom audio file for successful build events.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>--error</code>
                  </td>
                  <td>path</td>
                  <td>
                    Define a custom audio file for terminal-detected errors.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>--critical</code>
                  </td>
                  <td>path</td>
                  <td>
                    Define a custom audio file for process crashes and exits.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>--help</code>
                  </td>
                  <td>-</td>
                  <td>Display the internal CLI manifest and usage guide.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Testing & Validation */}
        <div className="section-header" style={{ marginTop: "10rem" }}>
          <h2 className="section-title">Testing & Validation</h2>
          <p className="section-desc">
            Verify your integration using the local test suite provided in the
            repository.
          </p>
        </div>

        <div
          className="feature-card"
          style={{ padding: "3rem", marginBottom: "8rem" }}
        >
          <h3 style={{ marginBottom: "1.5rem" }}>
            Step 1: Install Dependencies
          </h3>
          <p style={{ marginBottom: "2rem" }}>
            Navigate to the test project and install the SDK from the local
            package.
          </p>
          <div className="code-container" style={{ marginBottom: "4rem" }}>
            <pre>
              cd examples/react-test
              <br />
              npm install
            </pre>
          </div>

          <h3 style={{ marginBottom: "1.5rem" }}>
            Step 2: Test CLI Integration
          </h3>
          <p style={{ marginBottom: "2rem" }}>
            Run the dev server through the FailFanfare CLI to monitor terminal
            events.
          </p>
          <div className="code-container" style={{ marginBottom: "4rem" }}>
            <pre>node ../../failfanfare_sdk/dist/index.js npm run dev</pre>
          </div>

          <h3 style={{ marginBottom: "1.5rem" }}>
            Step 3: Test Browser Integration
          </h3>
          <p style={{ marginBottom: "2rem" }}>
            Open the provided React app and check the console. The SDK will play
            sounds for compilation success, page load, and any runtime
            exceptions you trigger.
          </p>
          <div
            className="landing-btns"
            style={{ justifyContent: "flex-start" }}
          >
            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-main"
              style={{ fontSize: "0.9rem", padding: "0.8rem 2rem" }}
            >
              Open Local Test App
            </a>
          </div>
        </div>
      </section>

      <VersionsModal isOpen={isVersionsOpen} onClose={() => setIsVersionsOpen(false)} />
      <button className="version-badge" onClick={() => setIsVersionsOpen(true)}>
        <img src="/logo.svg" alt="" style={{ width: '22px' }} />
        v0.4.0
      </button>

      <footer
        className="container"
        style={{
          padding: "8rem 0 4rem",
          textAlign: "center",
          color: "var(--text-dim)",
        }}
      >
        <p style={{ fontSize: "0.9rem", opacity: 0.6 }}>
          Technical Documentation Website for FailFanfare SDK
        </p>
        <p style={{ marginTop: "1rem" }}>
          Developed by Lancerhawk • Open Source MIT License
        </p>
      </footer>
    </div>
  );
};

export default App;
