import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50/30">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-amber-800 mb-8">Privacy Policy</h1>

        <div className="bg-white rounded-xl shadow-md p-8 space-y-6 text-gray-700">
          <section>
            <p className="text-sm text-gray-500 mb-6">Effective Date: September 30, 2025</p>

            <p className="mb-6">
              Mocha's MindLab Inc. ("we," "our," or "us") operates Mindful Meal Plan
              (the "Service"). This Privacy Policy explains how we collect, use, and protect
              your information when you use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">1. Information We Collect</h2>

            <h3 className="text-lg font-medium text-teal-700 mb-2">Personal Information</h3>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>Name and email address</li>
              <li>Billing address (processed by Stripe)</li>
              <li>Dietary preferences and restrictions</li>
              <li>Account credentials</li>
            </ul>

            <h3 className="text-lg font-medium text-teal-700 mb-2">Payment Information</h3>
            <p className="mb-4">
              Payment processing is handled by Stripe. We do not store credit card numbers
              or payment details on our servers. Stripe's privacy policy governs their
              collection and use of your payment information.
            </p>

            <h3 className="text-lg font-medium text-teal-700 mb-2">Usage Data</h3>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>Pages visited and features used</li>
              <li>Time and date of visits</li>
              <li>Browser type and device information</li>
              <li>IP address (anonymized)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>To provide and deliver your meal plans</li>
              <li>To process payments and manage subscriptions</li>
              <li>To personalize meal recommendations based on your preferences</li>
              <li>To send order confirmations and service updates</li>
              <li>To improve our Service and develop new features</li>
              <li>To respond to customer support requests</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">3. Information Sharing</h2>
            <p className="mb-4">We do not sell, trade, or rent your personal information. We may share your information with:</p>

            <ul className="list-disc list-inside space-y-2">
              <li><strong>Service Providers:</strong> Stripe for payment processing, Vercel for hosting,
                Supabase for database services, and Anthropic for AI-powered recipe generation</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">4. Data Security</h2>
            <p className="mb-4">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>SSL/TLS encryption for data in transit</li>
              <li>Encrypted database storage</li>
              <li>Regular security audits</li>
              <li>Limited access to personal information</li>
              <li>Secure authentication with JWT tokens</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">5. Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your account and data</li>
              <li>Opt-out of marketing communications</li>
              <li>Export your meal plans and recipes</li>
              <li>Cancel your subscription at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">6. Cookies and Analytics</h2>
            <p className="mb-4">
              We use cookies and similar technologies to improve your experience. We use
              Vercel Analytics to understand usage patterns. This data is anonymized and
              helps us improve our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">7. Children's Privacy</h2>
            <p className="mb-4">
              Our Service is not directed to children under 13. We do not knowingly collect
              personal information from children under 13. If you are a parent and believe
              your child has provided us with personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">8. International Data Transfers</h2>
            <p className="mb-4">
              Your information may be transferred to and processed in the United States.
              By using our Service, you consent to this transfer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">9. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will notify you of
              any changes by posting the new Privacy Policy on this page and updating the
              "Effective Date."
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-800 mb-4">10. Contact Us</h2>
            <p className="mb-2">If you have questions about this Privacy Policy, please contact us:</p>
            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="font-medium">Mocha's MindLab Inc.</p>
              <p>Email: support@mindfulmealplan.com</p>
              <p>Website: https://mindfulmealplan.com</p>
            </div>
          </section>

          <section className="pt-6 border-t border-gray-200">
            <Link href="/" className="text-teal-600 hover:text-teal-700 font-medium">
              ← Back to Home
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}