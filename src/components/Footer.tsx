import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Go2Let
            </h3>
            <p className="text-gray-400">
              Your trusted partner for student housing in Bangladesh.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">For Students</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Find Housing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Safety Tips</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Student Guide</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">For Landlords</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">List Property</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Resources</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/info/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/info/contact-us" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/info/terms-of-service" className="hover:text-white transition-colors">Terms</Link></li>
              <li><Link href="/info/privacy-policy" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="/info/refund-policy" className="hover:text-white transition-colors">Refunds</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-400">
              <Link href="/info/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
              <Link href="/info/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
            </div>
            <p className="text-center text-gray-400 text-sm">
              &copy; 2025 Go2Let. All rights reserved. Made with ❤️ for students in Bangladesh.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
