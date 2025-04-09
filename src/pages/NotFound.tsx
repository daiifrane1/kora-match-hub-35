
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from '@/components/Layout/MainLayout';
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-lg shadow-md p-10 max-w-md mx-auto">
          <h1 className="text-6xl font-bold text-kooora-primary mb-4">404</h1>
          <p className="text-xl text-kooora-dark mb-6">عفواً، الصفحة التي تبحث عنها غير موجودة</p>
          <Button asChild className="bg-kooora-primary hover:bg-kooora-dark">
            <a href="/" className="flex items-center">
              <Home className="ml-2" size={18} />
              العودة للصفحة الرئيسية
            </a>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
