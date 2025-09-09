import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
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
            <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
            <p className="text-muted-foreground">
              Last updated: January 2024
            </p>
          </div>

          <div className="space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">1. Information We Collect</h2>
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-foreground">Personal Information</h3>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li>• Name, email address, and phone number</li>
                  <li>• Delivery addresses and location data</li>
                  <li>• Payment information (processed securely through third-party providers)</li>
                  <li>• Order history and preferences</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">2. How We Use Your Information</h2>
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li>• To process and fulfill your orders</li>
                <li>• To communicate with you about your orders and account</li>
                <li>• To improve our services and user experience</li>
                <li>• To send promotional offers (with your consent)</li>
                <li>• To ensure security and prevent fraud</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">3. Information Sharing</h2>
              <p className="text-muted-foreground">
                We do not sell, trade, or rent your personal information to third parties. We may share 
                information with:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li>• Delivery partners to fulfill your orders</li>
                <li>• Payment processors for transaction processing</li>
                <li>• Legal authorities when required by law</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">4. Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. This includes encryption 
                of sensitive data and secure storage practices.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">5. Cookies and Tracking</h2>
              <p className="text-muted-foreground">
                We use cookies and similar technologies to enhance your experience, analyze usage patterns, 
                and provide personalized content. You can control cookie settings through your browser.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">6. Your Rights</h2>
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li>• Access and review your personal information</li>
                <li>• Update or correct inaccurate data</li>
                <li>• Request deletion of your account and data</li>
                <li>• Opt-out of marketing communications</li>
                <li>• Data portability (receive a copy of your data)</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">7. Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our service is not intended for children under 18. We do not knowingly collect personal 
                information from children under 18. If you believe we have inadvertently collected such 
                information, please contact us.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">8. Policy Updates</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of any significant 
                changes by posting the new policy on our website and updating the "Last updated" date.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">9. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
                <br />Email: privacy@groc.com
                <br />Phone: +919628516557
                <br />Address: Kanpur, Uttar Pradesh, India
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;