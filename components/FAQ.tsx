'use client';

import { useState } from 'react';

const faqData = [
  // Category 1: Failed Alternatives (addressing program hopping, manual tracking)
  {
    question: "I've tried 5 different programs and nothing works. How is this different?",
    answer: "Because every program promises results, but none of them show you which muscles are ACTUALLY responding to your training. You've probably been making progress in some muscles (chest, shoulders) while others stayed completely flat (back, hamstrings). Jacked shows you in 30 seconds which muscles are responding and which aren't, so you know exactly what to change instead of switching your entire program.",
    category: "alternatives"
  },
  {
    question: "I track all my PRs in a spreadsheet. Why do I need this?",
    answer: "Because tracking individual exercise PRs doesn't tell you if a MUSCLE GROUP is progressing. You might hit a PR on bench press but your chest could still be stuck if your dumbbell work is declining. Jacked combines all exercises for each muscle group to show the full picture. Plus, it's 30 seconds instead of hours of spreadsheet work.",
    category: "alternatives"
  },
  {
    question: "I've been trusting the process for 6 months. Should I keep waiting?",
    answer: "Not if muscles aren't progressing. Upload your Fitbod data and see in 30 seconds if your process is actually working. If chest is up 15% but back is flat or declining, you don't need a new program - you need to adjust frequency or exercise selection for back specifically. Stop waiting, start knowing.",
    category: "alternatives"
  },

  // Category 2: Results-Focused (why no results, which muscles holding back)
  {
    question: "Why am I not seeing results even though I'm training consistently?",
    answer: "Usually because some muscle groups ARE progressing (you might be up 20% in chest over 3 months) but others are completely flat (back might be at the exact same weight as 3 months ago). Your body looks the same because the imbalances aren't visible workout-to-workout. Jacked shows you which muscles are actually growing and which are stuck.",
    category: "results"
  },
  {
    question: "How do I know which muscles are holding back my results?",
    answer: "Upload your Fitbod CSV. Look at the overview grid. Muscles marked 'Needs attention' (red) or 'Stable' (yellow) are the bottlenecks. If your chest and shoulders are green (progressing) but your back is red, that's why you look unbalanced. Fix the red/yellow muscles first.",
    category: "results"
  },
  {
    question: "What if I see that a muscle isn't progressing? What do I do?",
    answer: "Drill into that muscle group and see which exercises are declining. Usually it's one of three fixes: (1) Train it more frequently (1x/week → 2x/week), (2) Add weight more aggressively, or (3) Switch to exercises that work better for you. Jacked shows you the problem, you make the simple fix.",
    category: "results"
  },
  {
    question: "I feel like I work hard but don't see results. Can Jacked help?",
    answer: "Yes - this is exactly what it's for. Most people discover they're progressing in some muscles (chest, shoulders) but completely stagnant in others (back, hamstrings). You're working hard, but not distributing effort evenly. Jacked shows you which muscles are actually responding to your training.",
    category: "results"
  },

  // Category 3: Trust/Transparency (how it calculates, verify yourself)
  {
    question: "How does Jacked calculate if I'm progressing?",
    answer: "Simple: it looks at your max weight for each muscle group week-over-week. If you benched 60kg max in Week 1 and 62.5kg max in Week 4, your chest is progressing. If it's still 60kg in Week 4, you're stuck. That's it - no complex algorithms, just straightforward trend analysis on YOUR actual workout data.",
    category: "trust"
  },
  {
    question: "Is this based on my data or generic recommendations?",
    answer: "100% your data. Jacked doesn't give generic advice like 'train chest 2x/week.' It shows you what's happening in YOUR training. If your chest is progressing at 1x/week, great - keep it up. If it's stuck at 2x/week, the problem isn't frequency, it's something else (weight progression, exercise selection, recovery).",
    category: "trust"
  },
  {
    question: "Can I verify the numbers myself?",
    answer: "Yes - click into any muscle group and you'll see the exact exercises, weeks, and weights used for the trend calculation. It's all your Fitbod data, just organized by muscle group instead of by workout date. You can check the math yourself.",
    category: "trust"
  },

  // Category 4: Time-Constrained Efficiency
  {
    question: "I only train 3-4 times per week. Is that enough to see progress?",
    answer: "Depends on the muscle group. Jacked's frequency tracker shows you if you're hitting each muscle group 1-2x per week (optimal for most people). If a muscle isn't progressing, you'll see if it's because you're only training it once every 10 days, or if you need more weight/volume.",
    category: "efficiency"
  },
  {
    question: "Can Jacked help me make the most of limited gym time?",
    answer: "Yes. If you only have 3 hours/week to train, you can't afford to waste it on exercises that aren't building strength. Jacked shows you which muscle groups are responding well (keep doing what you're doing) and which aren't (need more frequency, weight, or different exercises).",
    category: "efficiency"
  },

  // Category 5: Fitbod Integration
  {
    question: "Does Jacked replace Fitbod?",
    answer: "No - keep using Fitbod for workouts. Jacked is just a dashboard for your Fitbod data. Think of it this way: Fitbod is your workout tracker (what you did today), Jacked is your progress dashboard (are you getting stronger over weeks/months?).",
    category: "fitbod"
  },
  {
    question: "How often should I check Jacked?",
    answer: "Every 2-4 weeks. Upload your latest Fitbod export, see if your muscle groups are trending up, make adjustments if needed. It's not a daily-use app - it's a periodic reality check to make sure your training is on track.",
    category: "fitbod"
  },

  // Category 6: Technical/Privacy
  {
    question: "Is my workout data private?",
    answer: "Yes - your Fitbod CSV never leaves your device. Jacked processes everything in your browser and stores it locally. No account, no cloud storage, no data transmission. Your workout history stays on your device.",
    category: "technical"
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqData.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div style={{
        maxWidth: '800px',
        width: '100%',
        margin: '0 auto'
      }}>
        <h3 style={{
          fontSize: 'var(--text-xl)',
          fontWeight: 600,
          color: '#ffffff',
          marginBottom: 'var(--space-2xl)',
          textAlign: 'center'
        }}>
          Common questions
        </h3>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-md)'
        }}>
          {faqData.map((faq, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                transition: 'border-color 0.2s ease'
              }}
            >
              <button
                onClick={() => toggleQuestion(index)}
                style={{
                  width: '100%',
                  padding: 'var(--space-lg)',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 'var(--space-md)',
                  color: '#ffffff'
                }}
              >
                <span style={{
                  fontSize: 'var(--text-base)',
                  fontWeight: 500,
                  lineHeight: 1.5
                }}>
                  {faq.question}
                </span>
                <span style={{
                  fontSize: 'var(--text-lg)',
                  flexShrink: 0,
                  transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease'
                }}>
                  ↓
                </span>
              </button>

              {openIndex === index && (
                <div style={{
                  padding: '0 var(--space-lg) var(--space-lg)',
                  color: '#d4d4d4',
                  fontSize: 'var(--text-sm)',
                  lineHeight: 1.7
                }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
