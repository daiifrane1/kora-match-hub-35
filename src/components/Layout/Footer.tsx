
import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-kooora-dark text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-white">كورة</span>
              <span className="text-2xl font-bold text-kooora-primary">ماتش</span>
            </div>
            <p className="text-gray-300 mb-4">
              موقع كورة ماتش هو وجهتك الأولى لمتابعة أخبار كرة القدم المحلية والعالمية، مواعيد المباريات، 
              النتائج المباشرة، وترتيب البطولات والدوريات العربية والعالمية.
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="text-white hover:text-kooora-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-kooora-primary">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-kooora-primary">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-kooora-primary">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-kooora-primary pb-2">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-kooora-primary">الرئيسية</Link>
              </li>
              <li>
                <Link to="/matches" className="text-gray-300 hover:text-kooora-primary">المباريات</Link>
              </li>
              <li>
                <Link to="/leagues" className="text-gray-300 hover:text-kooora-primary">الدوريات</Link>
              </li>
              <li>
                <Link to="/teams" className="text-gray-300 hover:text-kooora-primary">الفرق</Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-300 hover:text-kooora-primary">الأخبار</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-kooora-primary pb-2">تواصل معنا</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">
                البريد الإلكتروني: info@kooramatch.com
              </li>
              <li className="text-gray-300">
                الهاتف: +123 456 7890
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-kooora-primary">صفحة الاتصال</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-kooora-primary">من نحن</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} كورة ماتش. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
