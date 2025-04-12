
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const API_KEY_STORAGE_KEY = "football_api_key";
const DEFAULT_API_KEY = "e8bccb552ecaed0a24a791db83129298"; // Default API key

interface ApiKeyModalProps {
  onApiKeyChange?: (apiKey: string) => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onApiKeyChange }) => {
  const [apiKey, setApiKey] = useState("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  // Load saved API key on mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem(API_KEY_STORAGE_KEY) || DEFAULT_API_KEY;
    setApiKey(savedApiKey);
    if (onApiKeyChange) {
      onApiKeyChange(savedApiKey);
    }
  }, [onApiKeyChange]);

  const handleSave = () => {
    // Save API key to localStorage
    localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
    
    // Notify parent component
    if (onApiKeyChange) {
      onApiKeyChange(apiKey);
    }
    
    toast({
      title: "تم الحفظ",
      description: "تم حفظ مفتاح API بنجاح.",
    });
    
    setOpen(false);
  };

  const handleReset = () => {
    // Reset to default API key
    setApiKey(DEFAULT_API_KEY);
    localStorage.setItem(API_KEY_STORAGE_KEY, DEFAULT_API_KEY);
    
    if (onApiKeyChange) {
      onApiKeyChange(DEFAULT_API_KEY);
    }
    
    toast({
      title: "تم إعادة الضبط",
      description: "تم إعادة ضبط مفتاح API إلى القيمة الافتراضية.",
    });
    
    setOpen(false);
  };

  const savedApiKey = localStorage.getItem(API_KEY_STORAGE_KEY);
  const hasApiKey = Boolean(savedApiKey || DEFAULT_API_KEY);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={hasApiKey ? "outline" : "default"} size="sm" className={`${hasApiKey ? 'h-8' : ''} flex items-center gap-1`}>
          <Settings className="h-4 w-4" />
          {!hasApiKey && <span>إضافة مفتاح API</span>}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>إعدادات API</DialogTitle>
          <DialogDescription>
            أدخل مفتاح API الخاص بك للحصول على بيانات المباريات الحقيقية.
            يمكنك الحصول على مفتاح مجاني من <a href="https://dashboard.api-football.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">api-football.com</a>
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="grid flex-1 gap-2">
            <label htmlFor="apiKey" className="text-sm font-medium">
              مفتاح API
            </label>
            <Input
              id="apiKey"
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="أدخل مفتاح API هنا"
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start flex gap-2">
          <Button type="button" variant="default" onClick={handleSave}>
            حفظ
          </Button>
          <Button type="button" variant="outline" onClick={handleReset}>
            استخدام المفتاح الافتراضي
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyModal;
