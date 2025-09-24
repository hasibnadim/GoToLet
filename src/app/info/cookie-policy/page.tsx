
export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-gray-600">Last updated: January 1, 2024</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. What Are Cookies</h2>
            <p className="text-gray-700 leading-relaxed">
              Cookies are small text files that are placed on your device when you visit our website. 
              They help us provide you with a better experience by remembering your preferences, 
              analyzing how you use our site, and enabling certain functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Types of Cookies We Use</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Essential Cookies</h3>
                <p className="text-gray-700 mb-2">
                  These cookies are necessary for the website to function properly and cannot be disabled.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Authentication and login session management</li>
                  <li>Shopping cart and booking functionality</li>
                  <li>Security and fraud prevention</li>
                  <li>Website performance and stability</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Functional Cookies</h3>
                <p className="text-gray-700 mb-2">
                  These cookies enable enhanced functionality and personalization.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Language and region preferences</li>
                  <li>Search filters and sorting preferences</li>
                  <li>Accessibility settings</li>
                  <li>Recently viewed properties</li>
                </ul>
              </div>

              <div className="border-l-4 border-yellow-500 pl-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Cookies</h3>
                <p className="text-gray-700 mb-2">
                  These cookies help us understand how visitors use our website.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Google Analytics for usage statistics</li>
                  <li>Page views and user journey tracking</li>
                  <li>Error monitoring and performance metrics</li>
                  <li>A/B testing for feature improvements</li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Marketing Cookies</h3>
                <p className="text-gray-700 mb-2">
                  These cookies are used to deliver relevant advertisements and track marketing effectiveness.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Facebook Pixel for social media advertising</li>
                  <li>Google Ads conversion tracking</li>
                  <li>Retargeting and remarketing campaigns</li>
                  <li>Cross-platform user identification</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Third-Party Cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We work with trusted third-party services that may set their own cookies:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Google Services</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Google Analytics</li>
                  <li>• Google Maps</li>
                  <li>• Google OAuth</li>
                  <li>• Google Ads</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Social Media</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Facebook Login</li>
                  <li>• Facebook Pixel</li>
                  <li>• Social sharing widgets</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Payment Providers</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• bKash</li>
                  <li>• Nagad</li>
                  <li>• SSL Commerz</li>
                  <li>• Stripe</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Support & Communication</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Live chat services</li>
                  <li>• Email tracking</li>
                  <li>• Customer support tools</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. How We Use Cookies</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">To Improve Your Experience:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Remember your login status</li>
                  <li>Save your search preferences</li>
                  <li>Provide personalized recommendations</li>
                  <li>Enable faster navigation</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">To Analyze and Improve:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Understand user behavior patterns</li>
                  <li>Optimize website performance</li>
                  <li>Identify and fix technical issues</li>
                  <li>Develop new features</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Managing Your Cookie Preferences</h2>
            
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-blue-900 mb-3">Browser Settings</h3>
                <p className="text-blue-800 mb-3">
                  You can control cookies through your browser settings:
                </p>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <strong>Chrome:</strong> Settings → Privacy and Security → Cookies
                  </div>
                  <div>
                    <strong>Firefox:</strong> Options → Privacy & Security
                  </div>
                  <div>
                    <strong>Safari:</strong> Preferences → Privacy
                  </div>
                  <div>
                    <strong>Edge:</strong> Settings → Cookies and Site Permissions
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-green-900 mb-3">Cookie Consent Manager</h3>
                <p className="text-green-800 mb-3">
                  Use our cookie consent banner to:
                </p>
                <ul className="list-disc list-inside text-green-800 space-y-1 ml-4">
                  <li>Accept or reject non-essential cookies</li>
                  <li>Customize your cookie preferences</li>
                  <li>Update your choices anytime</li>
                  <li>Learn more about each cookie category</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Impact of Disabling Cookies</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-yellow-900 mb-3">Please Note:</h3>
              <p className="text-yellow-800 mb-3">
                Disabling certain cookies may affect your experience:
              </p>
              <ul className="list-disc list-inside text-yellow-800 space-y-1 ml-4">
                <li>You may need to log in repeatedly</li>
                <li>Your preferences won&apos;st be saved</li>
                <li>Some features may not work properly</li>
                <li>You may see less relevant content</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cookie Retention</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Session Cookies:</h3>
                <p className="text-gray-700">Deleted when you close your browser</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Persistent Cookies:</h3>
                <p className="text-gray-700">Remain on your device for a specified period:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mt-2">
                  <li>Authentication cookies: 30 days</li>
                  <li>Preference cookies: 1 year</li>
                  <li>Analytics cookies: 2 years</li>
                  <li>Marketing cookies: 90 days</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Updates to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in our practices 
              or for other operational, legal, or regulatory reasons. We will notify you of any 
              material changes by posting the updated policy on our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions about our use of cookies:
              <br />
              Email: privacy@go2let.com
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
