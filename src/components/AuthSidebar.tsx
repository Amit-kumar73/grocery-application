import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { X, User, Phone, ArrowLeft, Mail } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface AuthSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthSidebar = ({ isOpen, onClose }: AuthSidebarProps) => {
  const [step, setStep] = useState<'method' | 'phone' | 'email' | 'otp'>('method');
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithPhone, signInWithEmail, verifyOtp, verifyEmailOtp } = useAuth();
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (authMethod === 'phone') {
        // Format phone number to include country code if not present
        let formattedPhone = phoneNumber.trim();
        if (formattedPhone.startsWith('0')) {
          formattedPhone = '+91' + formattedPhone.substring(1);
        } else if (!formattedPhone.startsWith('+')) {
          formattedPhone = '+91' + formattedPhone;
        }

        const { error } = await signInWithPhone(formattedPhone);
        if (error) {
          toast({
            title: "Failed to send OTP",
            description: error.message,
            variant: "destructive",
          });
        } else {
          setStep('otp');
          toast({
            title: "OTP Sent!",
            description: "Please check your phone for the verification code.",
          });
        }
      } else {
        const { error } = await signInWithEmail(email);
        if (error) {
          toast({
            title: "Failed to send OTP",
            description: error.message,
            variant: "destructive",
          });
        } else {
          setStep('otp');
          toast({
            title: "OTP Sent!",
            description: "Please check your email for the verification code.",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Authentication error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      if (authMethod === 'phone') {
        let formattedPhone = phoneNumber.trim();
        if (formattedPhone.startsWith('0')) {
          formattedPhone = '+91' + formattedPhone.substring(1);
        } else if (!formattedPhone.startsWith('+')) {
          formattedPhone = '+91' + formattedPhone;
        }

        const { error } = await verifyOtp(formattedPhone, otp);
        if (error) {
          toast({
            title: "Invalid OTP",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome!",
            description: "You have been signed in successfully.",
          });
          onClose();
          resetForm();
        }
      } else {
        const { error } = await verifyEmailOtp(email, otp);
        if (error) {
          toast({
            title: "Invalid OTP",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome!",
            description: "You have been signed in successfully.",
          });
          onClose();
          resetForm();
        }
      }
    } catch (error) {
      toast({
        title: "Authentication error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setStep('method');
    setPhoneNumber('');
    setEmail('');
    setOtp('');
  };

  const handleBack = () => {
    if (step === 'otp') {
      setStep(authMethod);
      setOtp('');
    } else if (step === 'phone' || step === 'email') {
      setStep('method');
    }
  };

  const handleMethodSelect = (method: 'phone' | 'email') => {
    setAuthMethod(method);
    setStep(method);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="bg-background w-full max-w-md h-full overflow-y-auto">
        <Card className="border-0 rounded-none h-full">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {(step === 'otp' || step === 'phone' || step === 'email') && (
                  <Button variant="ghost" size="sm" onClick={handleBack} className="mr-2">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                )}
                {step === 'method' && <User className="h-5 w-5 text-primary" />}
                {(step === 'phone' || (step === 'otp' && authMethod === 'phone')) && <Phone className="h-5 w-5 text-primary" />}
                {(step === 'email' || (step === 'otp' && authMethod === 'email')) && <Mail className="h-5 w-5 text-primary" />}
                {step === 'method' && 'Choose Sign In Method'}
                {step === 'phone' && 'Sign In with Phone'}
                {step === 'email' && 'Sign In with Email'}
                {step === 'otp' && 'Verify OTP'}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-6 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Welcome to Groc</h2>
              <p className="text-muted-foreground">
                {step === 'method' && 'Choose how you\'d like to sign in'}
                {step === 'phone' && 'Enter your phone number to get started'}
                {step === 'email' && 'Enter your email address to get started'}
                {step === 'otp' && `Enter the 6-digit code sent to your ${authMethod === 'phone' ? 'phone' : 'email'}`}
              </p>
            </div>

            {step === 'method' && (
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full h-14 justify-start gap-4"
                  onClick={() => handleMethodSelect('phone')}
                >
                  <Phone className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <div className="font-medium">Continue with Phone</div>
                    <div className="text-sm text-muted-foreground">Get OTP via SMS</div>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full h-14 justify-start gap-4"
                  onClick={() => handleMethodSelect('email')}
                >
                  <Mail className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <div className="font-medium">Continue with Email</div>
                    <div className="text-sm text-muted-foreground">Get OTP via Email</div>
                  </div>
                </Button>
              </div>
            )}

            {step === 'phone' && (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    We'll send you a verification code via SMS
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Sending OTP...
                    </div>
                  ) : (
                    'Send OTP'
                  )}
                </Button>
              </form>
            )}

            {step === 'email' && (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    We'll send you a verification code via email
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Sending OTP...
                    </div>
                  ) : (
                    'Send OTP'
                  )}
                </Button>
              </form>
            )}

            {step === 'otp' && (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <div className="flex justify-center">
                    <InputOTP
                      value={otp}
                      onChange={setOtp}
                      maxLength={6}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Code sent to {authMethod === 'phone' ? phoneNumber : email}
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading || otp.length !== 6}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Verifying...
                    </div>
                  ) : (
                    'Verify & Sign In'
                  )}
                </Button>

                <div className="text-center">
                  <Button 
                    variant="link" 
                    onClick={handleBack}
                    className="text-muted-foreground text-sm"
                  >
                    Use different {authMethod === 'phone' ? 'number' : 'email'}
                  </Button>
                </div>
              </form>
            )}

            <div className="bg-muted/20 p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">
                Browse products freely! Sign in to add items to cart and place orders.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};