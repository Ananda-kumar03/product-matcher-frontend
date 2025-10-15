import React, { useState, useCallback, useEffect, useMemo } from 'react';
import LandingPage from './LandingPage';
// Mock product data structure - replace with your actual import
import productsData from "./products_for_mongodb.json"; 
// const productsData: any[] = [];

// --- CONFIGURATION ---
const API_BASE_URL = 'https://visual-matcher-api-6qln.onrender.com/api';
const ROOT_URL = 'https://visual-matcher-api-6qln.onrender.com';
const ITEMS_PER_PAGE = 25;

interface Product {
    id: string; 
    name: string;
    category: string;
    price: number;
    similarityScore: number; 
    imageUrl: string;
    articleType: string;
}

const mapProductData = (item: any): Product => ({
    id: String(item.id),
    name: item.productDisplayName,
    category: item.articleType, 
    price: 1000.00,
    similarityScore: 1.0,
    imageUrl: item.image_url,
    articleType: item.articleType,
});

const allLocalProducts: Product[] = (productsData as any[]).map(mapProductData);
const AVAILABLE_CATEGORIES = [
    'All', 
    ...Array.from(new Set(allLocalProducts.map((item) => item.articleType)))
].sort((a, b) => a.localeCompare(b));

// --- UTILITY COMPONENTS ---
const LoadingSpinner: React.FC<{ size?: string, color?: string }> = ({ size = 'h-6 w-6', color = 'text-indigo-600' }) => (
    <svg className={`animate-spin ${size} ${color}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

// --- PRODUCT MODAL ---
interface ProductModalProps {
    product: Product;
    onClose: () => void;
    isSearchMode: boolean;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, isSearchMode }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-3xl">
                    <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition"
                    >
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="relative bg-gray-50 rounded-2xl overflow-hidden border-2 border-gray-200">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-96 object-contain"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/e5e7eb/6b7280?text=No+Image';
                                    }}
                                />
                                {isSearchMode && (
                                    <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-lg border border-gray-200">
                                        <span className="text-sm font-bold text-indigo-600">
                                            {Math.round(product.similarityScore * 100)}% Match
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h3>
                                <p className="text-lg text-indigo-600 font-semibold">{product.category}</p>
                            </div>

                            <div className="border-t border-b border-gray-200 py-4">
                                <p className="text-4xl font-bold text-gray-900">₹{product.price.toFixed(2)}</p>
                                <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
                            </div>

                            <div className="space-y-3">
                                <h4 className="font-semibold text-gray-900 text-lg">Product Information</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-600">Product ID</span>
                                        <span className="font-semibold text-gray-900">{product.id}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-600">Category</span>
                                        <span className="font-semibold text-gray-900">{product.articleType}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-600">Availability</span>
                                        <span className="font-semibold text-emerald-600">In Stock</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition font-bold text-lg shadow-lg">
                                    Add to Cart
                                </button>
                                <button className="w-full py-4 bg-gray-100 text-gray-900 rounded-xl hover:bg-gray-200 transition font-semibold text-lg">
                                    Add to Wishlist
                                </button>
                            </div>

                            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                                <h5 className="font-semibold text-indigo-900 mb-2 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
                                    </svg>
                                    Quick Info
                                </h5>
                                <ul className="text-sm text-indigo-800 space-y-1">
                                    <li>• Free shipping on orders above ₹999</li>
                                    <li>• 30-day easy returns</li>
                                    <li>• 100% authentic products</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- AUTH COMPONENTS ---
interface LoginViewProps {
    onLoginSuccess: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState(''); 
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState<'login' | 'signup'>('login');
    const isLogin = view === 'login';

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const apiPath = isLogin ? '/api/login' : '/api/signup';
        const payload = isLogin ? { email, password } : { username, email, password };
        
        try {
            const response = await fetch(`${ROOT_URL}${apiPath}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            
            if (response.ok) {
                if (isLogin) {
                    onLoginSuccess();
                } else {
                    alert('Account created successfully! Please log in.');
                    setView('login');
                }
            } else {
                const data = await response.json();
                throw new Error(data.error || 'Request failed');
            }
        } catch (err: any) {
            console.error(`${isLogin ? 'Login' : 'Signup'} Error:`, err);
            const errorMessage = err.message || `Could not connect to the server. ${isLogin ? 'Sign In' : 'Sign Up'} failed.`;
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-gray-600 mt-2 text-sm">
                        {isLogin ? 'Sign in to continue your shopping journey' : 'Join us to discover amazing products'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {!isLogin && (
                        <div>
                            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                            <input 
                                id="username" 
                                type="text" 
                                required 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-gray-900 bg-white" 
                                placeholder="johndoe" 
                            />
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        <input 
                            id="email" 
                            type="email" 
                            required 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-gray-900 bg-white" 
                            placeholder="you@example.com" 
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                        <input 
                            id="password" 
                            type="password" 
                            required 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-gray-900 bg-white" 
                            placeholder="••••••••" 
                        />
                    </div>

                    {error && (
                        <div className="p-3 text-sm text-red-700 bg-red-50 rounded-xl border border-red-200" role="alert">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center items-center py-3 px-4 rounded-xl shadow-lg text-base font-semibold text-white transition duration-300 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] active:scale-[0.98]'}`}
                    >
                        {loading ? <LoadingSpinner size="h-5 w-5" color="text-white" /> : (isLogin ? 'Sign In' : 'Create Account')}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                        <button
                            onClick={() => setView(isLogin ? 'signup' : 'login')}
                            className="font-semibold text-indigo-600 hover:text-indigo-700 transition duration-300 focus:outline-none"
                            type="button"
                        >
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

// --- PRODUCT CARD ---
interface ProductCardProps {
    product: Product;
    isSearchMode: boolean;
    onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isSearchMode, onViewDetails }) => {
    const similarityScore = isSearchMode ? product.similarityScore : 1.0; 

    let scoreColor = 'text-emerald-800 bg-emerald-100 border-emerald-300';
    if (similarityScore < 0.6) {
        scoreColor = 'text-red-800 bg-red-100 border-red-300';
    } else if (similarityScore < 0.8) {
        scoreColor = 'text-amber-800 bg-amber-100 border-amber-300';
    }

    return (
        <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 transform hover:-translate-y-1">
            <div className="relative h-48 sm:h-56 bg-gray-50 flex items-center justify-center overflow-hidden">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="object-cover w-full h-full transition duration-500 group-hover:scale-110"
                    onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null; 
                        (e.target as HTMLImageElement).src = `https://placehold.co/150x200/e5e7eb/6b7280?text=No+Image`;
                    }}
                />
                {isSearchMode && (
                    <span className={`absolute top-3 right-3 px-2.5 py-1 text-xs font-bold rounded-full border ${scoreColor} shadow-sm backdrop-blur-sm`}>
                        {Math.round(similarityScore * 100)}%
                    </span>
                )}
            </div>

            <div className="p-4 space-y-2">
                <h3 className="text-base font-semibold text-gray-800 line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
                <p className="text-sm text-indigo-600 font-medium">{product.category}</p>
                <div className="flex items-center justify-between pt-2">
                    <p className="text-xl font-bold text-gray-900">₹{product.price.toFixed(2)}</p>
                    <button 
                        onClick={() => onViewDetails(product)}
                        className="px-4 py-2 text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition font-semibold shadow-md active:shadow-sm transform active:scale-95"
                    >
                        View
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- FILTER PANEL ---
interface FilterPanelProps {
    filters: { category: string, minScore: number };
    setFilters: React.Dispatch<React.SetStateAction<{ category: string, minScore: number }>>;
    categories: string[];
    isSearchMode: boolean; 
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, setFilters, categories, isSearchMode }) => {
    return (
        <div className="p-5 bg-white rounded-2xl shadow-lg space-y-5 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
                </svg>
                Filters
            </h3>

            <div>
                <label htmlFor="category-filter" className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                </label>
                <select
                    id="category-filter"
                    value={filters.category}
                    onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                    className="block w-full py-2.5 px-3 border border-gray-300 bg-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 transition"
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {isSearchMode && (
                <div>
                    <label htmlFor="score-filter" className="block text-sm font-semibold text-gray-700 mb-2">
                        Min Match: <span className="font-bold text-indigo-600">{filters.minScore}%</span>
                    </label>
                    <input
                        id="score-filter"
                        type="range"
                        min="20" 
                        max="100" 
                        step="5"
                        value={filters.minScore}
                        onChange={(e) => setFilters(prev => ({ ...prev, minScore: Number(e.target.value) }))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>20%</span>
                        <span>100%</span>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- DASHBOARD ---
interface DashboardProps {
    onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
    const [inputImage, setInputImage] = useState<string | null>(null);
    const [imageURL, setImageURL] = useState('');
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [imageError, setImageError] = useState<string | null>(null);
    const [filters, setFilters] = useState({ category: 'All', minScore: 20 });
    
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState<Product[]>([]);
    const [isSearchMode, setIsSearchMode] = useState(false); 
    
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        setInputImage('https://placehold.co/300x300/e5e7eb/6b7280?text=Upload+Image');
    }, []);

    const runVisualSearch = useCallback(async (source: string | File) => {
        setIsSearching(true);
        setIsLoading(true); 
        setImageError(null);
        setResults([]);
        
        const isFile = source instanceof File;
        const endpoint = isFile ? `${API_BASE_URL}/upload_search` : `${API_BASE_URL}/search`;
        
        try {
            let response;
            if (isFile) {
                const formData = new FormData();
                formData.append('image', source);
                response = await fetch(endpoint, {
                    method: 'POST',
                    body: formData,
                });
            } else {
                response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ image_url: source }),
                });
            }
            
            if (!response.ok) throw new Error('Search failed');
            
            const data = await response.json();
            setResults(data.products);
            setIsSearchMode(true);
            setFilters({ category: 'All', minScore: 20 });
            setCurrentPage(1);
        } catch (err: any) {
            console.error("Visual search failed:", err);
            const defaultMsg = isFile 
                ? "File search failed. Ensure the uploaded file is a valid image." 
                : "URL search failed. Ensure the URL is public and valid.";
            setImageError(defaultMsg);
        } finally {
            setIsSearching(false);
            setIsLoading(false);
        }
    }, []);

    const handleURLSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setImageError(null);
        if (imageURL.trim()) {
            setInputImage(imageURL);
            setUploadedFile(null);
            runVisualSearch(imageURL);
        } else {
            setImageError("Please enter a valid image URL.");
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImageError(null);
        setImageURL('');

        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setInputImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
            setUploadedFile(file);
            runVisualSearch(file);
        }
    };

    const filteredResults = useMemo(() => {
        if (isSearchMode) {
            return results.filter(product => {
                if (filters.category !== 'All' && product.articleType !== filters.category) {
                    return false;
                }
                return product.similarityScore >= filters.minScore / 100;
            });
        }
        return allLocalProducts.filter(product => {
            if (filters.category === 'All') {
                return true;
            }
            return product.articleType === filters.category;
        });
    }, [filters, isSearchMode, results]);

    const paginatedResults = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredResults.slice(startIndex, endIndex);
    }, [filteredResults, currentPage]);

    const calculatedTotalPages = useMemo(() => {
        return Math.ceil(filteredResults.length / ITEMS_PER_PAGE);
    }, [filteredResults.length]);

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > calculatedTotalPages) return;
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const PaginationControls = useMemo(() => {
        if (calculatedTotalPages <= 1) return null;

        const pages = [];
        const start = Math.max(1, currentPage - 2);
        const end = Math.min(calculatedTotalPages, currentPage + 2);

        for (let i = start; i <= end; i++) {
            pages.push(
                <button
                    key={i}
                    className={`py-2 px-4 rounded-xl font-bold transition ${i === currentPage ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        return (
            <div className="flex justify-center items-center gap-2 sm:gap-4 mt-8 flex-wrap">
                <button 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1 || isLoading}
                    className="py-2 px-3 sm:px-4 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition disabled:bg-gray-100 disabled:cursor-not-allowed font-semibold text-sm sm:text-base"
                >
                    Previous
                </button>
                <div className="hidden sm:flex gap-2">
                    {pages}
                </div>
                <div className="sm:hidden bg-white px-4 py-2 rounded-xl border border-gray-300">
                    <span className="text-sm font-semibold text-gray-700">{currentPage} / {calculatedTotalPages}</span>
                </div>
                <button 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === calculatedTotalPages || isLoading}
                    className="py-2 px-3 sm:px-4 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition disabled:bg-gray-100 disabled:cursor-not-allowed font-semibold text-sm sm:text-base"
                >
                    Next
                </button>
            </div>
        );
    }, [currentPage, calculatedTotalPages, isLoading]);

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    isSearchMode={isSearchMode}
                />
            )}

            <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mr-2 sm:mr-3 flex items-center justify-center shadow-lg">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                            </div>
                            <span className="hidden sm:inline">Visual Product</span>
                            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent ml-2">Matcher</span>
                        </h1>
                        
                        <div className="flex items-center gap-2 sm:gap-3">
                            {isSearchMode && (
                                <button
                                    onClick={() => {
                                        setIsSearchMode(false);
                                        setResults([]);
                                        setFilters({ category: 'All', minScore: 20 });
                                        setCurrentPage(1);
                                        setImageError(null);
                                    }}
                                    disabled={isLoading}
                                    className="px-3 sm:px-4 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition text-sm flex items-center gap-1 sm:gap-2 shadow-sm"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                                    </svg>
                                    <span className="hidden sm:inline">Browse All</span>
                                </button>
                            )}
                            <button
                                onClick={onLogout}
                                className="px-3 sm:px-4 py-2 bg-white border border-red-300 text-red-600 font-semibold rounded-xl hover:bg-red-50 transition text-sm flex items-center gap-1 sm:gap-2 shadow-sm"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                                </svg>
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
                    
                    <div className="lg:col-span-1 space-y-6">
                        
                        <div className="p-5 bg-white rounded-2xl shadow-lg space-y-4 border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-800 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                </svg>
                                Search by Image
                            </h3>
                            
                            <form onSubmit={handleURLSearch} className="space-y-3">
                                <div>
                                    <label htmlFor="image-url-input" className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                                    <input
                                        id="image-url-input"
                                        type="url"
                                        value={imageURL}
                                        onChange={(e) => setImageURL(e.target.value)}
                                        placeholder="https://example.com/image.jpg"
                                        className="block w-full px-3 py-2.5 border border-gray-300 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 text-sm placeholder-gray-400"
                                        disabled={isSearching || isLoading}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={!imageURL.trim() || isSearching || isLoading}
                                    className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition font-semibold shadow-md disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {isSearching ? <LoadingSpinner size="h-5 w-5" color="text-white" /> : 'Search URL'}
                                </button>
                            </form>
                            
                            <div className="relative flex items-center">
                                <div className="flex-grow border-t border-gray-300"></div>
                                <span className="flex-shrink mx-3 text-gray-500 text-xs font-medium">OR</span>
                                <div className="flex-grow border-t border-gray-300"></div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Upload File</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                                    disabled={isSearching || isLoading}
                                />
                                {uploadedFile && <p className="mt-2 text-xs text-gray-500 truncate">Ready: {uploadedFile.name}</p>}
                            </div>

                            {imageError && (
                                <div className="p-3 text-xs text-red-700 bg-red-50 rounded-xl border border-red-200">
                                    {imageError}
                                </div>
                            )}
                        </div>

                        <div className="p-5 bg-white rounded-2xl shadow-lg border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-800 mb-3">Preview</h3>
                            <div className="w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300">
                                {inputImage ? (
                                    <img 
                                        src={inputImage} 
                                        alt="Query" 
                                        className="object-contain w-full h-full"
                                        onError={() => setInputImage('https://placehold.co/200x200/ef4444/ffffff?text=Load+Error')}
                                    />
                                ) : (
                                    <div className="text-center p-4">
                                        <svg className="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                        </svg>
                                        <span className="text-gray-400 text-sm">No image selected</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="hidden lg:block">
                            <FilterPanel 
                                filters={filters} 
                                setFilters={setFilters} 
                                categories={AVAILABLE_CATEGORIES}
                                isSearchMode={isSearchMode} 
                            />
                        </div>
                    </div>
                    
                    <div className="lg:col-span-3 space-y-6">
                        
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                    {isSearchMode ? "Search Results" : "Product Catalog"}
                                </h2>
                                <p className="text-sm text-gray-600 mt-1">
                                    Found {filteredResults.length} product{filteredResults.length !== 1 ? 's' : ''}
                                </p>
                            </div>
                        </div>

                        <div className="lg:hidden">
                            <FilterPanel 
                                filters={filters} 
                                setFilters={setFilters} 
                                categories={AVAILABLE_CATEGORIES}
                                isSearchMode={isSearchMode}
                            />
                        </div>

                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center p-16 bg-white rounded-2xl shadow-lg min-h-[400px]">
                                <LoadingSpinner size="h-12 w-12" />
                                <p className="mt-6 text-xl font-semibold text-indigo-600 animate-pulse">
                                    {isSearching ? "Running visual search..." : "Loading products..."}
                                </p>
                                <p className="mt-2 text-sm text-gray-500">Please wait</p>
                            </div>
                        ) : paginatedResults.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                                    {paginatedResults.map(product => (
                                        <ProductCard 
                                            key={product.id} 
                                            product={product} 
                                            isSearchMode={isSearchMode}
                                            onViewDetails={setSelectedProduct}
                                        />
                                    ))}
                                </div>
                                {PaginationControls}
                            </>
                        ) : (
                            <div className="p-12 text-center bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg border border-amber-200">
                                <svg className="w-20 h-20 text-amber-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <p className="text-2xl font-bold text-amber-900 mb-2">No Products Found</p>
                                <p className="text-md text-amber-700">
                                    {isSearchMode 
                                        ? "Try adjusting your filters or search with a different image."
                                        : "The catalog is currently empty. Check back soon!"
                                    }
                                </p>
                            </div>
                        )}
                        
                        {!isLoading && paginatedResults.length > 0 && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                                <p className="text-sm text-gray-600 text-center">
                                    Showing <span className="font-semibold text-gray-900">{paginatedResults.length}</span> of <span className="font-semibold text-gray-900">{filteredResults.length}</span> products
                                    {calculatedTotalPages > 1 && (
                                        <> • Page <span className="font-semibold text-indigo-600">{currentPage}</span> of <span className="font-semibold text-gray-900">{calculatedTotalPages}</span></>
                                    )}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <footer className="mt-12 bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center text-sm text-gray-600">
                        <p className="font-semibold text-gray-900 mb-2">Visual Product Matcher</p>
                        <p>Discover products with AI-powered visual search</p>
                        <p className="mt-4 text-xs text-gray-500">© 2025 All rights reserved</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showAuth, setShowAuth] = useState(false);

    useEffect(() => {
        const token = window.localStorage?.getItem('userToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLoginSuccess = useCallback(() => {
        if (window.localStorage) {
            window.localStorage.setItem('userToken', 'simulated_token_123');
        }
        setIsLoggedIn(true);
        setShowAuth(false);
    }, []);

    const handleLogout = useCallback(() => {
        if (window.localStorage) {
            window.localStorage.removeItem('userToken');
        }
        setIsLoggedIn(false);
        setShowAuth(false); 
    }, []);

    const handleGetStarted = useCallback(() => {
        setShowAuth(true); // Show login/signup page
    }, []);

    return (
        <>
            <style dangerouslySetInnerHTML={{__html: `
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
                * { 
                    box-sizing: border-box; 
                    margin: 0;
                    padding: 0;
                }
                html { 
                    scroll-behavior: smooth; 
                    width: 100%;
                    height: 100%;
                }
                body { 
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
                    margin: 0; 
                    padding: 0;
                    width: 100%;
                    min-height: 100vh;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }
                #root {
                    width: 100%;
                    min-height: 100vh;
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                input[type="url"]::-webkit-input-placeholder {
                    color: #9ca3af;
                }
                input[type="url"]::placeholder {
                    color: #9ca3af;
                }
            `}} />
            <div className="w-full min-h-screen">
                {isLoggedIn ? (
                    <Dashboard onLogout={handleLogout} />
                ) : showAuth ? (
                    <LoginView onLoginSuccess={handleLoginSuccess} />
                ) : (
                    <LandingPage onGetStarted={handleGetStarted} />
                )}
            </div>
        </>
    );
};

export default App;