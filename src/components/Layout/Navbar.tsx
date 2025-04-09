
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-kooora-primary">كورة</span>
              <span className="text-2xl font-bold text-kooora-dark">ماتش</span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
            <Link to="/" className="nav-link active-nav-link">الرئيسية</Link>
            <Link to="/matches" className="nav-link">المباريات</Link>
            <Link to="/leagues" className="nav-link">الدوريات</Link>
            <Link to="/teams" className="nav-link">الفرق</Link>
            <Link to="/news" className="nav-link">الأخبار</Link>
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col space-y-2 pt-2 pb-3">
              <Link 
                to="/" 
                className="block px-3 py-2 text-base font-medium text-kooora-primary border-r-4 border-kooora-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                الرئيسية
              </Link>
              <Link 
                to="/matches" 
                className="block px-3 py-2 text-base font-medium hover:text-kooora-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                المباريات
              </Link>
              <Link 
                to="/leagues" 
                className="block px-3 py-2 text-base font-medium hover:text-kooora-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                الدوريات
              </Link>
              <Link 
                to="/teams" 
                className="block px-3 py-2 text-base font-medium hover:text-kooora-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                الفرق
              </Link>
              <Link 
                to="/news" 
                className="block px-3 py-2 text-base font-medium hover:text-kooora-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                الأخبار
              </Link>
            </div>
            <div className="flex justify-around pt-4 border-t border-gray-200">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
