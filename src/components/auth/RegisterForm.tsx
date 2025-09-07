import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onSwitchToOTP: (email: string) => void;
}

export function RegisterForm({ onSwitchToLogin, onSwitchToOTP }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return;
    }
    
    setLoading(true);
    
    const { error } = await signUp(formData.email, formData.password, formData.fullName);
    
    if (!error) {
      onSwitchToOTP(formData.email);
    }
    
    setLoading(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
        <CardDescription className="text-center">
          Enter your details to create a new account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password (min 6 characters)"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              minLength={6}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              required
            />
            {formData.password !== formData.confirmPassword && formData.confirmPassword && (
              <p className="text-sm text-destructive">Passwords do not match</p>
            )}
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading || formData.password !== formData.confirmPassword}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>
        
        <div className="mt-4 text-center">
          <div className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Button variant="link" onClick={onSwitchToLogin} className="p-0 h-auto">
              Sign in
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}