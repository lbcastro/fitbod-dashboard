import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How it works - Jacked',
  description: 'Step-by-step guide to tracking muscle group progress with Jacked. Export from Fitbod, upload your CSV, and see which muscles are growing in 30 seconds.',
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to track muscle group progress with Jacked",
  "description": "Step-by-step guide to analyzing your Fitbod workout data for muscle-level insights and identifying which muscles are progressing or stuck",
  "image": "https://jacked.pro/og-image.png",
  "totalTime": "PT1M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": "0"
  },
  "tool": [
    {
      "@type": "HowToTool",
      "name": "Fitbod app"
    },
    {
      "@type": "HowToTool",
      "name": "Fitbod CSV export file"
    }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "name": "Export your Fitbod data",
      "text": "Open the Fitbod app, go to the Log tab, then Settings, and tap Export Workout Data. This creates a CSV file with your complete workout history including all exercises, sets, reps, and weights.",
      "url": "https://jacked.pro/how-it-works#step-1",
      "image": "https://jacked.pro/og-image.png"
    },
    {
      "@type": "HowToStep",
      "name": "Upload to Jacked",
      "text": "Visit jacked.pro and drag-and-drop your CSV file into the upload zone, or click to browse. Your data is processed instantly in your browser - nothing is uploaded to a server. Processing typically takes 5-10 seconds for most workout histories.",
      "url": "https://jacked.pro/how-it-works#step-2",
      "image": "https://jacked.pro/og-image.png"
    },
    {
      "@type": "HowToStep",
      "name": "Review your dashboard",
      "text": "See all muscle groups with status indicators showing which are Progressing (green), Stable (yellow), or Needs Attention (red). The overview shows training frequency and week-over-week trends at a glance.",
      "url": "https://jacked.pro/how-it-works#step-3",
      "image": "https://jacked.pro/og-image.png"
    },
    {
      "@type": "HowToStep",
      "name": "Drill into specific muscles",
      "text": "Click any muscle group to see exercise-level charts with max weight trends over time. Identify which exercises are progressing and which are stuck, then adjust your training frequency, weight progression, or exercise selection accordingly.",
      "url": "https://jacked.pro/how-it-works#step-4",
      "image": "https://jacked.pro/og-image.png"
    }
  ]
};

export default function HowItWorks() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <div className="min-h-screen bg-black text-white">
        <div className="dashboard-container" style={{ maxWidth: '800px' }}>
          <header style={{ marginBottom: '48px', paddingBottom: '24px' }}>
            <a href="/" style={{ textDecoration: 'none' }}>
              <h1 className="text-4xl font-extrabold tracking-[0.15em] uppercase relative inline-block pb-2" style={{ marginBottom: '12px' }}>
                Jacked
                <span className="absolute bottom-0 left-0 w-10 h-[3px] bg-[#4ade80] rounded"></span>
              </h1>
            </a>
            <div className="text-[#a3a3a3] text-base">How it works</div>
          </header>

          <main>
            <section style={{ marginBottom: 'var(--space-3xl)' }}>
              <h2 style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: 'var(--space-xl)'
              }}>
                Track muscle group progress in 30 seconds
              </h2>

              <p style={{
                fontSize: 'var(--text-base)',
                color: '#d4d4d4',
                lineHeight: 1.7,
                marginBottom: 'var(--space-2xl)'
              }}>
                Jacked analyzes your Fitbod workout history to show which muscles are progressing, stuck, or declining. No manual tracking required - just upload your CSV and see the insights immediately.
              </p>
            </section>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2xl)'
            }}>
              {/* Step 1 */}
              <div id="step-1" style={{
                padding: 'var(--space-xl)',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 'var(--radius-md)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-md)',
                  marginBottom: 'var(--space-lg)'
                }}>
                  <span style={{
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 700,
                    color: '#4ade80',
                    minWidth: '40px'
                  }}>
                    1
                  </span>
                  <h3 style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: 600,
                    color: '#ffffff'
                  }}>
                    Export your Fitbod data
                  </h3>
                </div>
                <p style={{
                  fontSize: 'var(--text-base)',
                  color: '#d4d4d4',
                  lineHeight: 1.7,
                  marginLeft: 'calc(40px + var(--space-md))'
                }}>
                  Open the Fitbod app → Log tab → Settings → Export Workout Data. This creates a CSV file with your complete workout history including all exercises, sets, reps, and weights.
                </p>
              </div>

              {/* Step 2 */}
              <div id="step-2" style={{
                padding: 'var(--space-xl)',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 'var(--radius-md)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-md)',
                  marginBottom: 'var(--space-lg)'
                }}>
                  <span style={{
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 700,
                    color: '#4ade80',
                    minWidth: '40px'
                  }}>
                    2
                  </span>
                  <h3 style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: 600,
                    color: '#ffffff'
                  }}>
                    Upload to Jacked
                  </h3>
                </div>
                <p style={{
                  fontSize: 'var(--text-base)',
                  color: '#d4d4d4',
                  lineHeight: 1.7,
                  marginLeft: 'calc(40px + var(--space-md))',
                  marginBottom: 'var(--space-md)'
                }}>
                  Visit <a href="/" style={{ color: '#4ade80', textDecoration: 'underline' }}>jacked.pro</a> and drag-and-drop your CSV file, or click to browse. Your data is processed instantly in your browser - nothing is uploaded to a server.
                </p>
                <p style={{
                  fontSize: 'var(--text-sm)',
                  color: '#a3a3a3',
                  lineHeight: 1.7,
                  marginLeft: 'calc(40px + var(--space-md))'
                }}>
                  Processing typically takes 5-10 seconds for most workout histories.
                </p>
              </div>

              {/* Step 3 */}
              <div id="step-3" style={{
                padding: 'var(--space-xl)',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 'var(--radius-md)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-md)',
                  marginBottom: 'var(--space-lg)'
                }}>
                  <span style={{
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 700,
                    color: '#4ade80',
                    minWidth: '40px'
                  }}>
                    3
                  </span>
                  <h3 style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: 600,
                    color: '#ffffff'
                  }}>
                    Review your dashboard
                  </h3>
                </div>
                <p style={{
                  fontSize: 'var(--text-base)',
                  color: '#d4d4d4',
                  lineHeight: 1.7,
                  marginLeft: 'calc(40px + var(--space-md))'
                }}>
                  See all muscle groups with status indicators showing which are <span style={{ color: '#4ade80' }}>Progressing</span> (green), <span style={{ color: '#fbbf24' }}>Stable</span> (yellow), or <span style={{ color: '#ef4444' }}>Needs Attention</span> (red). The overview shows training frequency and week-over-week trends at a glance.
                </p>
              </div>

              {/* Step 4 */}
              <div id="step-4" style={{
                padding: 'var(--space-xl)',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 'var(--radius-md)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-md)',
                  marginBottom: 'var(--space-lg)'
                }}>
                  <span style={{
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 700,
                    color: '#4ade80',
                    minWidth: '40px'
                  }}>
                    4
                  </span>
                  <h3 style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: 600,
                    color: '#ffffff'
                  }}>
                    Drill into specific muscles
                  </h3>
                </div>
                <p style={{
                  fontSize: 'var(--text-base)',
                  color: '#d4d4d4',
                  lineHeight: 1.7,
                  marginLeft: 'calc(40px + var(--space-md))'
                }}>
                  Click any muscle group to see exercise-level charts with max weight trends over time. Identify which exercises are progressing and which are stuck, then adjust your training frequency, weight progression, or exercise selection accordingly.
                </p>
              </div>
            </div>

            <div style={{
              marginTop: 'var(--space-3xl)',
              padding: 'var(--space-xl)',
              background: 'rgba(74, 222, 128, 0.05)',
              border: '1px solid rgba(74, 222, 128, 0.2)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 600,
                color: '#4ade80',
                marginBottom: 'var(--space-md)'
              }}>
                Ready to see which muscles are growing?
              </h3>
              <a
                href="/"
                className="cta-button"
                style={{
                  display: 'inline-block',
                  padding: 'var(--space-md) var(--space-xl)',
                  background: '#4ade80',
                  color: '#000000',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-sm)',
                  textDecoration: 'none'
                }}
              >
                Upload your Fitbod data
              </a>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
