import React from 'react';

interface LandingPageProps {
    onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            {/* HEADER / NAVIGATION */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mr-3 flex items-center justify-center shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                            </div>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                                Visual Product <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Matcher</span>
                            </h1>
                        </div>
                        
                        <button
                            onClick={onGetStarted}
                            className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition shadow-md text-sm sm:text-base"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </header>

            {/* HERO SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 sm:space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                                Find Products
                                <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    With Just an Image
                                </span>
                            </h2>
                            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                                Revolutionary AI-powered visual search technology that helps you discover similar products instantly. Upload any image and let our smart algorithm do the magic.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={onGetStarted}
                                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition shadow-lg text-lg transform hover:scale-105"
                            >
                                Start Searching Now
                            </button>
                            <button
                                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-50 transition border-2 border-gray-300 text-lg"
                            >
                                Learn More
                            </button>
                        </div>

                        <div className="flex items-center gap-8 pt-4">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-indigo-600">500+</p>
                                <p className="text-sm text-gray-600">Products</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-purple-600">99%</p>
                                <p className="text-sm text-gray-600">Accuracy</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-indigo-600">Fast</p>
                                <p className="text-sm text-gray-600">Results</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl p-8 shadow-2xl border-4 border-white">
                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                                        <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                        </svg>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg"></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full opacity-20 blur-xl"></div>
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full opacity-20 blur-xl"></div>
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section id="features" className="bg-white py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Powerful Features
                        </h3>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Experience the next generation of product discovery with our cutting-edge technology
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border-2 border-indigo-100 hover:border-indigo-300 transition hover:shadow-lg">
                            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                </svg>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">Visual Search</h4>
                            <p className="text-gray-600 leading-relaxed">
                                Upload any product image and instantly find similar items from our extensive catalog using advanced AI algorithms.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-100 hover:border-purple-300 transition hover:shadow-lg">
                            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                </svg>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h4>
                            <p className="text-gray-600 leading-relaxed">
                                Get instant results in seconds. Our optimized search engine processes images at incredible speeds.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-100 hover:border-blue-300 transition hover:shadow-lg">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">High Accuracy</h4>
                            <p className="text-gray-600 leading-relaxed">
                                Our AI model delivers 99% accuracy in matching products, ensuring you find exactly what you're looking for.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border-2 border-emerald-100 hover:border-emerald-300 transition hover:shadow-lg">
                            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
                                </svg>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">Smart Filters</h4>
                            <p className="text-gray-600 leading-relaxed">
                                Refine your search with category filters and similarity scores to find the perfect match.
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-100 hover:border-orange-300 transition hover:shadow-lg">
                            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                                </svg>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">Mobile Friendly</h4>
                            <p className="text-gray-600 leading-relaxed">
                                Seamlessly search products on any device. Our responsive design works perfectly everywhere.
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-8 border-2 border-violet-100 hover:border-violet-300 transition hover:shadow-lg">
                            <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">Huge Catalog</h4>
                            <p className="text-gray-600 leading-relaxed">
                                Browse through hundreds of products across multiple categories with our comprehensive database.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            How It Works
                        </h3>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Get started in three simple steps
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-1 bg-gradient-to-r from-indigo-300 to-purple-300 transform -translate-y-1/2"></div>
                        <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-1 bg-gradient-to-r from-purple-300 to-indigo-300 transform -translate-y-1/2"></div>

                        <div className="relative bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:border-indigo-300 transition text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white shadow-lg">
                                1
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">Upload Image</h4>
                            <p className="text-gray-600">
                                Upload a product image from your device or paste an image URL to start the search.
                            </p>
                        </div>

                        <div className="relative bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:border-purple-300 transition text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white shadow-lg">
                                2
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">AI Processing</h4>
                            <p className="text-gray-600">
                                Our advanced AI analyzes the image and searches through our catalog for similar products.
                            </p>
                        </div>

                        <div className="relative bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:border-indigo-300 transition text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white shadow-lg">
                                3
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">Get Results</h4>
                            <p className="text-gray-600">
                                Browse matching products instantly with similarity scores and detailed information.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-16 sm:py-20 bg-gradient-to-br from-indigo-600 to-purple-700">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                        Ready to Discover Amazing Products?
                    </h3>
                    <p className="text-lg sm:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of users who are already finding their perfect products with our visual search technology.
                    </p>
                    <button
                        onClick={onGetStarted}
                        className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-gray-100 transition shadow-xl text-lg transform hover:scale-105"
                    >
                        Get Started for Free
                    </button>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div className="md:col-span-2">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mr-3 flex items-center justify-center shadow-lg">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                    </svg>
                                </div>
                                <span className="text-xl font-bold text-gray-900">Visual Product Matcher</span>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Discover products with AI-powered visual search technology. Find exactly what you're looking for with just an image.
                            </p>
                        </div>

                        <div>
                            <h5 className="font-semibold text-gray-900 mb-4">Quick Links</h5>
                            <ul className="space-y-2 text-gray-600">
                                <li><a href="#features" className="hover:text-indigo-600 transition">Features</a></li>
                                <li><a href="#" className="hover:text-indigo-600 transition">How It Works</a></li>
                                <li><a href="#" className="hover:text-indigo-600 transition">About Us</a></li>
                                <li><a href="#" className="hover:text-indigo-600 transition">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-semibold text-gray-900 mb-4">Support</h5>
                            <ul className="space-y-2 text-gray-600">
                                <li><a href="#" className="hover:text-indigo-600 transition">Help Center</a></li>
                                <li><a href="#" className="hover:text-indigo-600 transition">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-indigo-600 transition">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-indigo-600 transition">FAQ</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-8">
                        <div className="text-center text-sm text-gray-600">
                            <p className="font-semibold text-gray-900 mb-2">Visual Product Matcher</p>
                            <p>Discover products with AI-powered visual search</p>
                            <p className="mt-4 text-xs text-gray-500">© 2025 All rights reserved</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;