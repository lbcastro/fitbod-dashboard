export function StructuredData() {
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Jacked",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "See which muscles aren't growing. Upload your Fitbod workout data and get instant muscle group-level analytics in 30 seconds. Know exactly which muscle groups are progressing, stuck, or declining with week-over-week strength trends.",
    "featureList": [
      "30-second muscle group analysis from Fitbod CSV",
      "Week-over-week strength trends for all muscle groups",
      "Identify non-progressing muscles immediately",
      "Training frequency tracking per muscle group",
      "Lagging body part detection",
      "Based entirely on your actual workout data",
      "Simple max weight progression tracking",
      "No account required - browser-based processing"
    ],
    "screenshot": "https://jacked.pro/og-image.png",
    "softwareVersion": "1.0",
    "author": {
      "@type": "Organization",
      "name": "Jacked"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Jacked",
    "url": "https://jacked.pro",
    "description": "Muscle group progress analytics for time-constrained lifters. See which muscles are growing and which are stuck."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
