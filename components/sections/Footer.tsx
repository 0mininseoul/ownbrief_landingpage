import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="text-white py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-6">
          {/* Logo */}
          <div>
            <h3 className="text-xl font-bold">OwnBrief</h3>
            <p className="text-gray-400 mt-2">창업가를 위한 AI 브리핑 솔루션</p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm">
            <a
              href="mailto:contact@ownbrief.com"
              className="text-gray-300 hover:text-white transition-colors"
            >
              문의하기
            </a>
            <Link
              href="/privacy"
              className="text-gray-300 hover:text-white transition-colors"
            >
              개인정보처리방침
            </Link>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-gray-800">
            <p className="text-sm text-gray-500">
              © 2025 OwnBrief. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
