
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
import { Settings, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const API_KEY_STORAGE_KEY = "football_api_key";

interface ApiKeyModalProps {
  onApiKeyChange?: (apiKey: string) => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onApiKeyChange }) => {
  const [apiKey, setApiKey] = useState("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  // Load saved API key on mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (savedApiKey) {
      setApiKey(savedApiKey);
      if (onApiKeyChange) {
        onApiKeyChange(savedApiKey);
      }
    }
  }, [onApiKeyChange]);

  const handleSave = () => {
    // Validate API key format (basic validation)
    if (!apiKey.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال مفتاح API صالح.",
        variant: "destructive",
      });
      return;
    }
    
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

  const handleSetDefaultKey = () => {
    const defaultKey = "e8bccb552ecaed0a24a791db83129298";
    setApiKey(defaultKey);
    localStorage.setItem(API_KEY_STORAGE_KEY, defaultKey);
    
    if (onApiKeyChange) {
      onApiKeyChange(defaultKey);
    }
    
    toast({
      title: "تم الإعداد",
      description: "تم تعيين مفتاح API الافتراضي بنجاح.",
    });
    
    setOpen(false);
  };

  const savedApiKey = localStorage.getItem(API_KEY_STORAGE_KEY);
  const hasApiKey = Boolean(savedApiKey);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={hasApiKey ? "outline" : "default"} size="sm" className={`${hasApiKey ? 'h-8' : ''} flex items-center gap-1`}>
          {hasApiKey ? (
            <>
              <Check className="h-4 w-4 text-green-500" />
              <Settings className="h-4 w-4" />
            </>
          ) : (
            <>
              <Settings className="h-4 w-4" />
              <span>إضافة مفتاح API</span>
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>إعدادات API</DialogTitle>
          <DialogDescription>
            أدخل مفتاح API الخاص بك للحصول على بيانات المباريات الحقيقية.
            يمكنك الحصول على مفتاح مجاني من <a href="https://www.football-data.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">football-data.org</a>
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
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button type="button" variant="outline" onClick={handleSetDefaultKey}>
            استخدام المفتاح الافتراضي
          </Button>
          <Button type="button" variant="default" onClick={handleSave}>
            حفظ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyModal;
