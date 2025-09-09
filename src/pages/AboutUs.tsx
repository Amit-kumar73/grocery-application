import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
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
            <h1 className="text-4xl font-bold text-foreground">About Groc</h1>
            <p className="text-xl text-muted-foreground">
              Your trusted partner for fresh groceries and essentials
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Our Mission</h2>
                <p className="text-muted-foreground">
                  At Groc, we're committed to delivering fresh, quality groceries and essentials 
                  directly to your doorstep. We believe shopping for daily necessities should be 
                  convenient, reliable, and affordable for everyone.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Why Choose Us?</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Fresh products sourced directly from trusted suppliers</li>
                  <li>• Fast delivery within minutes to your location</li>
                  <li>• Competitive prices with regular discounts</li>
                  <li>• Wide selection across multiple categories</li>
                  <li>• Reliable customer service and support</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Our Story</h2>
                <p className="text-muted-foreground">
                  Founded with the vision of making grocery shopping effortless, Groc started 
                  as a small initiative to serve local communities in Uttar Pradesh. Today, 
                  we're expanding our reach to bring convenience to more families across the region.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Our Values</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>Quality:</strong> We never compromise on product freshness</li>
                  <li>• <strong>Trust:</strong> Building lasting relationships with our customers</li>
                  <li>• <strong>Innovation:</strong> Continuously improving our service</li>
                  <li>• <strong>Community:</strong> Supporting local suppliers and communities</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;