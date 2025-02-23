import React, { useState, useRef, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Button } from "../UI/Button";
import { SearchButton } from "../UI/SearchButton";

export const NavMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const { url } = usePage();
    const isLoggedIn = usePage().props.auth?.user ?? false; // TODO: Replace with actual auth state
    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const menuItems = [
        { href: "/products", label: "تصفح المنتجات" },
        { href: "/my-bids", label: "مزايداتي" },
        { href: "/my-favorites", label: "المفضلة" },
        { href: "/my-products", label: "منتجاتي" },
        { href: "/products/create", label: "إضافة منتج" },
    ];

    const publicMenuItems = [
        { href: "/products", label: "تصفح المنتجات" },
        { href: "/faq", label: "الأسئلة الشائعة" },
    ];

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className="flex items-center gap-4">
            <SearchButton />
            <nav className="relative" ref={menuRef}>
                {/* Menu Button (Mobile & Desktop) */}
                <button
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMenuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>

                {/* Menu Content */}
                <div
                    className={`
                        absolute left-0 top-full mt-2
                        bg-white rounded-lg shadow-lg
                        p-4 min-w-[250px]
                        transform transition-all duration-200 ease-in-out
                        ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
                        z-50
                    `}
                >
                    <div className="flex flex-col gap-3">
                        {isLoggedIn ? (
                            <>
                                {menuItems.map((item) => (
                                    <Link key={item.href} href={item.href} onClick={handleLinkClick}>
                                        <Button
                                            variant={url === item.href ? "primary" : "outline"}
                                            className="w-full justify-start px-4 py-2"
                                        >
                                            {item.label}
                                        </Button>
                                    </Link>
                                ))}

                                <hr className="my-2 border-gray-200" />

                                <Link href="/faq" onClick={handleLinkClick}>
                                    <Button
                                        variant={url === '/faq' ? "primary" : "outline"}
                                        className="w-full justify-start px-4 py-2"
                                    >
                                        الأسئلة الشائعة
                                    </Button>
                                </Link>

                                <Link href="/profile" onClick={handleLinkClick}>
                                    <Button
                                        variant={url === '/profile' ? "primary" : "outline"}
                                        className="w-full justify-start px-4 py-2"
                                    >
                                        الملف الشخصي
                                    </Button>
                                </Link>

                                <Link href="/logout" method="post" onClick={handleLinkClick}>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start px-4 py-2 text-red-600 hover:bg-red-50"
                                    >
                                        تسجيل الخروج
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                {publicMenuItems.map((item) => (
                                    <Link key={item.href} href={item.href} onClick={handleLinkClick}>
                                        <Button
                                            variant={url === item.href ? "primary" : "outline"}
                                            className="w-full justify-start px-4 py-2"
                                        >
                                            {item.label}
                                        </Button>
                                    </Link>
                                ))}
                                <Link href="/login" onClick={handleLinkClick}>
                                    <Button variant="primary" className="w-full px-4 py-2">
                                        تسجيل الدخول
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Overlay */}
                {isMenuOpen && (
                    <div
                        className="fixed inset-0 bg-black/20 z-40"
                        onClick={() => setIsMenuOpen(false)}
                    />
                )}
            </nav>
        </div>
    );
};
