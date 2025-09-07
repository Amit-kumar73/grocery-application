import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface OTPVerificationFormProps {
  email: string;
  type: 'signup' | 'recovery';
  onSwitchToLogin: () => void;
}

export function OTPVerificationForm({ email, type, onSwitchToLogin }: OTPVerificationFormProps) {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { verifyOTP } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await verifyOTP(email, otp, type);
    
    if (!error) {
      // Verification successful, user will be redirected automatically
      setTimeout(() => {
        onSwitchToLogin();
      }, 1000);
    }
    
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Verify Your Email</CardTitle>
        <CardDescription className="text-center">
          Enter the 6-digit code sent to {email}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp">Verification Code</Label>
            <Input
              id="otp"
              type="text"
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="text-center text-lg tracking-widest"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading || otp.length !== 6}>
            {loading ? 'Verifying...' : 'Verify Email'}
          </Button>
        </form>
        
        <div className="mt-4 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Didn't receive the code? Check your spam folder or try again.
          </p>
          <Button variant="link" onClick={onSwitchToLogin} className="text-sm">
            Back to Sign In
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}