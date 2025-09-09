import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsAndConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={0} />
      
      <main className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Terms & Conditions</h1>
            <p className="text-muted-foreground">
              Last updated: January 2024
            </p>
          </div>

          <div className="space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using Groc's services, you accept and agree to be bound by the terms 
                and provision of this agreement. These Terms of Service constitute a legally binding 
                agreement between you and Groc.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">2. Service Description</h2>
              <p className="text-muted-foreground">
                Groc provides an online platform for ordering groceries and essential items for delivery. 
                We reserve the right to modify, suspend, or discontinue any aspect of our service at any time.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">3. User Account</h2>
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li>• You must provide accurate, current, and complete information during registration</li>
                <li>• You are responsible for safeguarding your account credentials</li>
                <li>• You must notify us immediately of any unauthorized use of your account</li>
                <li>• One person or legal entity may not maintain more than one account</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">4. Orders and Payments</h2>
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li>• All orders are subject to availability and confirmation</li>
                <li>• Prices are subject to change without notice</li>
                <li>• Payment must be made at the time of ordering</li>
                <li>• We reserve the right to refuse or cancel orders at our discretion</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">5. Delivery Policy</h2>
              <p className="text-muted-foreground">
                We strive to deliver orders within the estimated time frame. However, delivery times 
                are approximate and may vary due to factors beyond our control. We are not liable 
                for delays in delivery.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">6. Refunds and Cancellations</h2>
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li>• Cancellations may be possible before the order is processed</li>
                <li>• Refunds for damaged or incorrect items will be processed as per our refund policy</li>
                <li>• Perishable items may not be eligible for return unless defective</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">7. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                Groc shall not be liable for any indirect, incidental, special, consequential, or 
                punitive damages resulting from your use of our service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">8. Contact Information</h2>
              <p className="text-muted-foreground">
                For questions about these Terms & Conditions, please contact us at:
                <br />Email: support@groc.com
                <br />Phone: +919628516557
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;