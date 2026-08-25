
function Footer() {
  return (
     <footer className="mt-16 border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="col-span-2 md:col-span-1">
              <h2 className="text-xl font-bold">Reneo</h2>

              <p className="mt-3 max-w-xs text-sm leading-6 text-gray-500">
                A marketplace connecting customers with independent
                entrepreneurs.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold">Shop</h3>

              <div className="mt-4 space-y-3 text-sm text-gray-500">
                <a href="#" className="block hover:text-gray-900">
                  All Products
                </a>
                <a href="#" className="block hover:text-gray-900">
                  Categories
                </a>
                <a href="#" className="block hover:text-gray-900">
                  New Arrivals
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold">For Sellers</h3>

              <div className="mt-4 space-y-3 text-sm text-gray-500">
                <a href="#" className="block hover:text-gray-900">
                  Become a Seller
                </a>
                <a href="#" className="block hover:text-gray-900">
                  Seller Dashboard
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold">Support</h3>

              <div className="mt-4 space-y-3 text-sm text-gray-500">
                <a href="#" className="block hover:text-gray-900">
                  Help Center
                </a>
                <a href="#" className="block hover:text-gray-900">
                  Contact Us
                </a>
                <a href="#" className="block hover:text-gray-900">
                  Privacy
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t pt-6 text-center text-xs text-gray-500">
            © 2026 Reneo. All rights reserved.
          </div>
        </div>
      </footer>
  )
}

export default Footer