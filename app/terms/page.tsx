import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50/30">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-amber-800 mb-8">Terms of Service</h1>

        <div className="bg-white rounded-xl shadow-md p-8 space-y-6 text-gray-700">
          <section>
            <p className="text-sm text-gray-500 mb-6">Effective Date: September 30, 2025</p>

            <p className="mb-6">
              Welcome to Mindful Meal Plan. These Terms of Service ("Terms") govern your use of
              our website and services operated by Mocha's MindLab Inc. ("Company," "we," "us," or "our").
            </p>

            <p className="mb-6">
              By accessing or using our Service, you agree to be bound by these Terms. If you
              disagree with any part of these terms, then you may not access the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">1. Service Description</h2>
            <p className="mb-4">
              Mindful Meal Plan provides personalized meal planning services, including:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Curated monthly meal calendars</li>
              <li>Detailed recipes and cooking instructions</li>
              <li>Shopping lists and meal prep guides</li>
              <li>Access to our recipe library</li>
              <li>Digital downloads of meal plans</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">2. Account Registration</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>You must provide accurate and complete information</li>
              <li>You are responsible for maintaining account security</li>
              <li>You must be at least 18 years old to use our Service</li>
              <li>One person or entity may not maintain more than one account</li>
              <li>You are responsible for all activities under your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">3. Purchases and Payment</h2>

            <h3 className="text-lg font-medium text-teal-700 mb-2">Pricing</h3>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>All prices are in U.S. dollars</li>
              <li>Prices are subject to change with 30 days notice</li>
              <li>Changes will not affect active subscriptions until renewal</li>
            </ul>

            <h3 className="text-lg font-medium text-teal-700 mb-2">Payment Processing</h3>
            <p className="mb-4">
              Payments are processed securely through Stripe. By providing payment information,
              you authorize us to charge the applicable fees to your payment method.
            </p>

            <h3 className="text-lg font-medium text-teal-700 mb-2">Subscriptions</h3>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>Monthly subscriptions automatically renew until cancelled</li>
              <li>You can cancel anytime through your account portal</li>
              <li>Cancellation takes effect at the end of the current billing period</li>
              <li>No partial refunds for unused portions of subscription periods</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">4. Refund Policy</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>One-time purchases: 7-day money-back guarantee</li>
              <li>Subscriptions: Cancel anytime, no refunds for current period</li>
              <li>Digital downloads are final after download</li>
              <li>Refund requests must be submitted via email to support@mindfulmealplan.com</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">5. Intellectual Property</h2>

            <h3 className="text-lg font-medium text-teal-700 mb-2">Our Content</h3>
            <p className="mb-4">
              All content on Mindful Meal Plan, including recipes, meal plans, text, graphics,
              logos, and software, is owned by or licensed to Mocha's MindLab Inc. and is
              protected by copyright and intellectual property laws.
            </p>

            <h3 className="text-lg font-medium text-teal-700 mb-2">Your License</h3>
            <p className="mb-4">
              We grant you a limited, non-exclusive, non-transferable license to access and
              use our meal plans and recipes for personal, non-commercial use only.
            </p>

            <h3 className="text-lg font-medium text-teal-700 mb-2">Restrictions</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>No reselling or commercial use of our content</li>
              <li>No copying or distributing content to others</li>
              <li>No modification or creation of derivative works</li>
              <li>No use of automated systems or software to extract content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">6. User Content</h2>
            <p className="mb-4">
              By submitting feedback, suggestions, or other content to us, you grant us a
              worldwide, non-exclusive, royalty-free license to use, reproduce, and modify
              such content for improving our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">7. Disclaimers</h2>

            <h3 className="text-lg font-medium text-teal-700 mb-2">Health and Nutrition</h3>
            <p className="mb-4 font-medium">
              Our meal plans are for informational purposes only and are not medical advice.
              Always consult with a healthcare professional before making significant dietary changes,
              especially if you have health conditions or allergies.
            </p>

            <h3 className="text-lg font-medium text-teal-700 mb-2">Service Availability</h3>
            <p className="mb-4">
              We strive for 99.9% uptime but do not guarantee uninterrupted access. The Service
              is provided "as is" without warranties of any kind.
            </p>

            <h3 className="text-lg font-medium text-teal-700 mb-2">Third-Party Services</h3>
            <p className="mb-4">
              We use third-party services (Stripe, Vercel, Supabase, Anthropic) and are not
              responsible for their actions or service interruptions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">8. Limitation of Liability</h2>
            <p className="mb-4">
              To the maximum extent permitted by law, Mocha's MindLab Inc. shall not be liable for
              any indirect, incidental, special, consequential, or punitive damages resulting from
              your use or inability to use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">9. Indemnification</h2>
            <p className="mb-4">
              You agree to indemnify and hold harmless Mocha's MindLab Inc. from any claims,
              losses, or damages arising from your violation of these Terms or your use of
              the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">10. Termination</h2>
            <p className="mb-4">
              We may terminate or suspend your account immediately, without prior notice, for:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Breach of these Terms</li>
              <li>Fraudulent or illegal activity</li>
              <li>Sharing account credentials</li>
              <li>Abuse of the Service or other users</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">11. Governing Law</h2>
            <p className="mb-4">
              These Terms are governed by the laws of the State of California, United States,
              without regard to its conflict of law provisions. Any disputes shall be resolved
              in the courts of California.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">12. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these Terms at any time. We will notify users
              of any material changes via email or through the Service. Your continued use
              after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">13. Contact Information</h2>
            <p className="mb-2">For questions about these Terms, please contact us:</p>
            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="font-medium">Mocha's MindLab Inc.</p>
              <p>Email: support@mindfulmealplan.com</p>
              <p>Website: https://mindfulmealplan.com</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">14. Entire Agreement</h2>
            <p className="mb-4">
              These Terms, together with our Privacy Policy, constitute the entire agreement
              between you and Mocha's MindLab Inc. regarding the use of our Service.
            </p>
          </section>

          <section className="pt-6 border-t border-gray-200">
            <div className="flex justify-between">
              <Link href="/privacy" className="text-teal-600 hover:text-teal-700 font-medium">
                View Privacy Policy
              </Link>
              <Link href="/" className="text-teal-600 hover:text-teal-700 font-medium">
                Back to Home
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}