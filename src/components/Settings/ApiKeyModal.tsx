
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
import { Settings, ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

const API_KEY_STORAGE_KEY = "football_api_key";

interface ApiKeyModalProps {
  onApiKeyChange?: (apiKey: string) => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onApiKeyChange }) => {
  const [apiKey, setApiKey] = useState("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedApiKey = localStorage.getItem(API_KEY_STORAGE_KEY) || '';
    setApiKey(savedApiKey);
  }, []);

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال مفتاح API صالح",
        variant: "destructive",
      });
      return;
    }
    
    localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
    
    if (onApiKeyChange) {
      onApiKeyChange(apiKey);
    }
    
    toast({
      title: "تم الحفظ",
      description: "تم حفظ مفتاح API بنجاح. سيتم تحديث البيانات.",
    });
    
    setOpen(false);
  };

  const handleClear = () => {
    setApiKey('');
    localStorage.removeItem(API_KEY_STORAGE_KEY);
    
    if (onApiKeyChange) {
      onApiKeyChange('');
    }
    
    toast({
      title: "تم المسح",
      description: "تم مسح مفتاح API. سيتم استخدام البيانات الافتراضية.",
    });
    
    setOpen(false);
  };

  const hasApiKey = apiKey.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={hasApiKey ? "outline" : "secondary"} 
          size="sm" 
          className={`h-8 flex items-center gap-1 ${!hasApiKey ? "bg-amber-100 text-amber-800 hover:bg-amber-200" : ""}`}
        >
          <Settings className="h-4 w-4" />
          <span>{hasApiKey ? "إعدادات API" : "إضافة مفتاح API"}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>إعدادات API</DialogTitle>
          <DialogDescription>
            أدخل مفتاح API الخاص بك للحصول على بيانات المباريات الحقيقية.
          </DialogDescription>
        </DialogHeader>
        
        <Alert className="my-4">
          <AlertDescription>
            <p className="mb-2">للحصول على مفتاح API مجاني:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>قم بزيارة <a href="https://dashboard.api-football.com/register" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center">
                dashboard.api-football.com/register
                <ExternalLink className="h-3 w-3 mr-1" />
              </a></li>
              <li>سجل حساب جديد واختر الخطة المجانية</li>
              <li>انسخ مفتاح API وألصقه هنا</li>
            </ol>
          </AlertDescription>
        </Alert>

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
              className="text-left"
              dir="ltr"
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start flex gap-2">
          <Button type="button" variant="default" onClick={handleSave}>
            حفظ
          </Button>
          {hasApiKey && (
            <Button type="button" variant="outline" onClick={handleClear}>
              مسح المفتاح
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyModal;
