
export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Refund Policy</h1>
          <p className="text-gray-600">Last updated: January 1, 2024</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              Go2Let is committed to fair and transparent refund practices. This policy outlines the 
              circumstances under which refunds may be issued for various services and fees paid 
              through our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Service Fees</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Platform Service Fee:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Non-refundable once property viewing is completed</li>
                  <li>Refundable if property information was significantly misrepresented</li>
                  <li>Refundable if technical issues prevent service delivery</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Verification Fee:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Non-refundable once verification process is initiated</li>
                  <li>Refundable if verification cannot be completed due to platform error</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Rental Payments</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Security Deposit:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Fully refundable upon successful tenancy completion</li>
                  <li>Deductions may apply for property damage or outstanding dues</li>
                  <li>Refund processed within 30 days of lease termination</li>
                  <li>Detailed damage assessment provided if deductions are made</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Advance Rent:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Refundable if booking is cancelled before move-in date</li>
                  <li>Cancellation must be made at least 7 days before move-in</li>
                  <li>Partial refund may apply based on cancellation timing</li>
                  <li>No refund for cancellations within 48 hours of move-in</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Cancellation Policy</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-blue-900 mb-3">Cancellation Timeline:</h3>
              <div className="space-y-3 text-blue-800">
                <div className="flex justify-between">
                  <span>More than 30 days before move-in:</span>
                  <span className="font-semibold">100% refund</span>
                </div>
                <div className="flex justify-between">
                  <span>15-30 days before move-in:</span>
                  <span className="font-semibold">75% refund</span>
                </div>
                <div className="flex justify-between">
                  <span>7-14 days before move-in:</span>
                  <span className="font-semibold">50% refund</span>
                </div>
                <div className="flex justify-between">
                  <span>3-6 days before move-in:</span>
                  <span className="font-semibold">25% refund</span>
                </div>
                <div className="flex justify-between">
                  <span>Less than 48 hours:</span>
                  <span className="font-semibold">No refund</span>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Special Circumstances</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Emergency Situations:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Medical emergencies with proper documentation</li>
                  <li>Natural disasters or force majeure events</li>
                  <li>University closure or course cancellation</li>
                  <li>Visa rejection for international students</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Property Issues:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Significant differences from advertised description</li>
                  <li>Health and safety concerns</li>
                  <li>Landlord failure to provide agreed amenities</li>
                  <li>Illegal eviction or harassment</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Refund Process</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">How to Request a Refund:</h3>
                <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
                  <li>Submit refund request through your Go2Let dashboard</li>
                  <li>Provide detailed reason and supporting documentation</li>
                  <li>Our team will review within 5-7 business days</li>
                  <li>You&apos;sll receive email notification of the decision</li>
                  <li>Approved refunds processed within 10-15 business days</li>
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Required Documentation:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Booking confirmation and payment receipts</li>
                  <li>Photos or evidence supporting the refund claim</li>
                  <li>Communication records with landlord (if applicable)</li>
                  <li>Medical certificates or official documents (for emergencies)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Payment Method Refunds</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Credit/Debit Cards:</strong> Refunded to original payment method within 5-10 business days</li>
              <li><strong>Mobile Banking:</strong> Processed within 3-5 business days</li>
              <li><strong>Bank Transfer:</strong> Requires account verification, 7-10 business days</li>
              <li><strong>Digital Wallets:</strong> Instant to 2 business days depending on provider</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Disputes and Appeals</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you disagree with a refund decision:
            </p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
              <li>Submit an appeal within 30 days of the decision</li>
              <li>Provide additional evidence or clarification</li>
              <li>Senior management will review the appeal</li>
              <li>Final decision communicated within 10 business days</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Exclusions</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Refunds are not available for:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Change of mind after successful property viewing</li>
              <li>Personal financial difficulties</li>
              <li>Third-party service failures (utilities, internet, etc.)</li>
              <li>Normal wear and tear of property</li>
              <li>Charges incurred due to violation of house rules</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              For refund requests and questions:
              <br />
              Email: refunds@go2let.com
              <br />
              Phone: +880 1700-123456 (Business hours: 9 AM - 6 PM)
              <br />
              Refund Portal: Available in your Go2Let dashboard
              <br />
              Address: House 123, Road 15, Dhanmondi, Dhaka 1209, Bangladesh
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
