

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600">Last updated: January 1, 2024</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using Go2Let&apos;s services, you accept and agree to be bound by the terms and provision 
              of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Service Description</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Go2Let is a platform that connects students with verified rental properties in Bangladesh. We provide:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Property listing and search services</li>
              <li>Verification of properties and landlords</li>
              <li>Secure communication between tenants and landlords</li>
              <li>Payment processing and management</li>
              <li>Customer support and dispute resolution</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">For Students/Tenants:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Provide accurate and complete information</li>
                  <li>Pay rent and fees on time</li>
                  <li>Respect property and house rules</li>
                  <li>Report any issues promptly</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">For Landlords:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Provide accurate property information</li>
                  <li>Maintain property in livable condition</li>
                  <li>Comply with local rental laws</li>
                  <li>Respond to tenant requests reasonably</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Payment Terms</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Service fees are clearly disclosed before payment</li>
              <li>Payments are processed through secure third-party providers</li>
              <li>Refunds are subject to our refund policy</li>
              <li>Late payment fees may apply as specified in rental agreements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Privacy and Data Protection</h2>
            <p className="text-gray-700 leading-relaxed">
              Your privacy is important to us. Please review our Privacy Policy to understand how we collect, 
              use, and protect your personal information. By using our services, you consent to the collection 
              and use of information as outlined in our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Prohibited Activities</h2>
            <p className="text-gray-700 leading-relaxed mb-2">Users may not:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Use the service for illegal activities</li>
              <li>Provide false or misleading information</li>
              <li>Harass or discriminate against other users</li>
              <li>Attempt to circumvent security measures</li>
              <li>Use automated systems to access the platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Liability and Disclaimers</h2>
            <p className="text-gray-700 leading-relaxed">
              Go2Let acts as a platform facilitating connections between landlords and tenants. We are not 
              responsible for the conduct of users or the condition of properties. Our liability is limited 
              to the maximum extent permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Termination</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to suspend or terminate accounts that violate these terms. Users may 
              terminate their accounts at any time by contacting our support team.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update these terms periodically. Users will be notified of significant changes, 
              and continued use of the service constitutes acceptance of updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              For questions about these Terms of Service, please contact us at:
              <br />
              Email: legal@go2let.com
              <br />
              Phone: +880 1700-123456
              <br />
              Address: House 123, Road 15, Dhanmondi, Dhaka 1209, Bangladesh
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
