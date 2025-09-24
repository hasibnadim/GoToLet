
export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Disclaimer</h1>
          <p className="text-gray-600">Last updated: January 1, 2024</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. General Information</h2>
            <p className="text-gray-700 leading-relaxed">
              The information contained on Go2Let website and mobile application is for general 
              information purposes only. The information is provided by Go2Let and while we 
              endeavor to keep the information up to date and correct, we make no representations 
              or warranties of any kind, express or implied, about the completeness, accuracy, 
              reliability, suitability or availability with respect to the website or the 
              information, products, services, or related graphics contained on the website 
              for any purpose.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Platform Role and Limitations</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-yellow-900 mb-3">Important Notice:</h3>
              <p className="text-yellow-800">
                Go2Let acts as an intermediary platform connecting property owners/landlords with 
                potential tenants. We are not a real estate agent, property manager, or landlord. 
                We do not own, operate, or control any of the properties listed on our platform.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Our Services Include:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Property listing and search functionality</li>
                  <li>Basic property verification and screening</li>
                  <li>Communication facilitation between parties</li>
                  <li>Payment processing and transaction management</li>
                  <li>Customer support and dispute mediation</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Our Services Do NOT Include:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Guaranteeing property condition or suitability</li>
                  <li>Providing legal or financial advice</li>
                  <li>Acting as tenant representatives or advocates</li>
                  <li>Ensuring landlord compliance with local laws</li>
                  <li>Providing insurance or warranty coverage</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Property Information Accuracy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              While we strive to ensure property information is accurate and up-to-date:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Property descriptions are provided by landlords/property owners</li>
              <li>Photos may not reflect current property condition</li>
              <li>Amenities and facilities are subject to change</li>
              <li>Pricing information may vary and should be confirmed directly</li>
              <li>Availability status may not be real-time</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              We strongly recommend conducting personal inspections before making any commitments.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User-Generated Content</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our platform contains user-generated content including reviews, ratings, and comments:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Reviews reflect individual user experiences and opinions</li>
              <li>We do not verify the accuracy of user reviews</li>
              <li>Ratings may not represent current property conditions</li>
              <li>Users are responsible for the content they post</li>
              <li>We reserve the right to moderate or remove inappropriate content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Financial and Legal Disclaimers</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Financial Advice:</h3>
                <p className="text-gray-700">
                  Go2Let does not provide financial, investment, or tax advice. Users should 
                  consult qualified professionals for financial guidance related to property 
                  rental decisions.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Legal Compliance:</h3>
                <p className="text-gray-700">
                  Users are responsible for ensuring compliance with local laws, regulations, 
                  and university policies regarding housing and rental agreements. We recommend 
                  consulting legal professionals when needed.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Tax Obligations:</h3>
                <p className="text-gray-700">
                  Users are responsible for understanding and fulfilling their tax obligations 
                  related to rental income or expenses.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Third-Party Services and Links</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our platform integrates with various third-party services:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Payment gateways (bKash, Nagad, SSL Commerz, etc.)</li>
              <li>Map services (Google Maps)</li>
              <li>Social media platforms (Facebook, Google)</li>
              <li>Analytics and advertising services</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              We are not responsible for the availability, content, or practices of these 
              third-party services. Users should review their respective terms and policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-red-900 mb-3">Important Limitation:</h3>
              <p className="text-red-800 mb-3">
                In no event shall Go2Let be liable for any direct, indirect, incidental, 
                special, consequential, or punitive damages arising out of or relating to:
              </p>
              <ul className="list-disc list-inside text-red-800 space-y-1 ml-4">
                <li>Use of our platform or services</li>
                <li>Property conditions or landlord behavior</li>
                <li>Financial losses or disputes</li>
                <li>Data breaches or technical failures</li>
                <li>Third-party actions or services</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Verification and Security</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Property Verification:</h3>
                <p className="text-gray-700">
                  While we conduct basic verification of properties and landlords, this does not 
                  guarantee property condition, legal status, or landlord reliability. Users 
                  should conduct their own due diligence.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Identity Verification:</h3>
                <p className="text-gray-700">
                  Our identity verification process helps improve platform security but does not 
                  eliminate all risks. Users should exercise caution when sharing personal 
                  information.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Platform Availability</h2>
            <p className="text-gray-700 leading-relaxed">
              We strive to maintain platform availability but cannot guarantee uninterrupted 
              service. Scheduled maintenance, technical issues, or external factors may cause 
              temporary service disruptions. We will endeavor to provide advance notice when possible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Geographic Limitations</h2>
            <p className="text-gray-700 leading-relaxed">
              Go2Let primarily serves the Bangladesh market, with focus on student accommodation 
              near major universities. Information and services may not be applicable or available 
              in all geographic regions or for all property types.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Updates and Modifications</h2>
            <p className="text-gray-700 leading-relaxed">
              This disclaimer may be updated periodically to reflect changes in our services, 
              legal requirements, or business practices. Continued use of our platform after 
              updates constitutes acceptance of the revised disclaimer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              For questions about this disclaimer or our services:
              <br />
              Email: legal@go2let.com
              <br />
              Phone: +880 1700-123456
              <br />
              Address: House 123, Road 15, Dhanmondi, Dhaka 1209, Bangladesh
              <br />
              Business Hours: Sunday to Thursday, 9:00 AM - 6:00 PM (GMT+6)
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
