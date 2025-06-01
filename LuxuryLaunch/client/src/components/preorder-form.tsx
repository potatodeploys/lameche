import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface PreorderData {
  name: string;
  email: string;
  preferredScent: string;
  newsletter: boolean;
}

export default function PreorderForm() {
  const [formData, setFormData] = useState<PreorderData>({
    name: '',
    email: '',
    preferredScent: '',
    newsletter: false
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const { toast } = useToast();

  const preorderMutation = useMutation({
    mutationFn: async (data: PreorderData) => {
      const response = await apiRequest("POST", "/api/preorders", data);
      return await response.json();
    },
    onSuccess: (data) => {
      setDiscountCode(data.discountCode);
      setShowSuccess(true);
      toast({
        title: "Success!",
        description: "Your preorder has been confirmed and discount code sent to your email.",
      });
    },
    onError: (error: any) => {
      // Check if email already exists
      if (error.message?.includes('already registered')) {
        toast({
          title: "Email Already Registered",
          description: "This email is already signed up for preorder. Check your inbox for your discount code!",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.preferredScent) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    preorderMutation.mutate(formData);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      preferredScent: '',
      newsletter: false
    });
    setShowSuccess(false);
    setDiscountCode('');
  };

  if (showSuccess) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="success-message rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4 font-serif">Welcome to La Mèche!</h3>
          <p className="text-lg mb-4">
            Your exclusive discount code has been sent to <strong>{formData.email}</strong>
          </p>
          <div className="bg-black/30 rounded-lg p-4 mb-4 font-mono text-lg">
            {discountCode}
          </div>
          <div className="text-sm mb-6 space-y-2">
            <p className="opacity-75">Save this code! You'll receive 10% off when we launch.</p>
            <p className="text-yellow-400 font-medium">
              IMPORTANT: Write down this serial code and tell it to us in person when purchasing.
            </p>
          </div>
          <Button 
            onClick={resetForm}
            className="glass-button px-8 py-3"
          >
            Perfect! I'm Ready
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="glass-card rounded-xl p-8 space-y-6 scroll-reveal">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-primary font-medium">Full Name *</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="glass-input"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-primary font-medium">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="glass-input"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferred-scent" className="text-primary font-medium">Preferred Scent Category *</Label>
          <Select value={formData.preferredScent} onValueChange={(value) => setFormData(prev => ({ ...prev, preferredScent: value }))}>
            <SelectTrigger className="glass-input">
              <SelectValue placeholder="Select your preference" />
            </SelectTrigger>
            <SelectContent className="glass-card border-primary/30">
              <SelectItem value="tropical-paradise">Tropical Paradise</SelectItem>
              <SelectItem value="toasted-marshmallow">Toasted Marshmallow</SelectItem>
              <SelectItem value="lavender">Lavender</SelectItem>
              <SelectItem value="vanilla">Vanilla</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-3">
          <Checkbox 
            id="newsletter"
            checked={formData.newsletter}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, newsletter: !!checked }))}
            className="border-primary"
          />
          <Label htmlFor="newsletter" className="text-sm text-muted-foreground">
            Send me updates about new collections and exclusive offers
          </Label>
        </div>

        <Button 
          type="submit" 
          disabled={preorderMutation.isPending}
          className="glass-button w-full py-4 text-lg font-semibold"
        >
          {preorderMutation.isPending ? (
            <div className="flex items-center space-x-2">
              <div className="loading-spinner w-5 h-5"></div>
              <span>Processing...</span>
            </div>
          ) : (
            "Send My Discount Code"
          )}
        </Button>

        <div className="text-sm text-muted-foreground text-center space-y-2">
          <p>No payment required. Just your email for the exclusive discount code.</p>
          <p className="text-yellow-400 font-medium">
            IMPORTANT: Please write down your serial code and tell it to us in person when purchasing. If the email doesn't come through, make sure to save your code.
          </p>
        </div>
      </form>
    </div>
  );
}
