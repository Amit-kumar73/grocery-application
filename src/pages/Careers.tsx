import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MapPin, Clock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Careers = () => {
  const navigate = useNavigate();

  const jobOpenings = [
    {
      title: "Delivery Partner",
      location: "Kanpur, UP",
      type: "Full-time / Part-time",
      description: "Join our delivery team and help us bring groceries to customers' doorsteps."
    },
    {
      title: "Customer Service Representative",
      location: "Kanpur, UP",
      type: "Full-time",
      description: "Provide excellent customer support and resolve queries via phone and chat."
    },
    {
      title: "Warehouse Associate",
      location: "Kanpur, UP", 
      type: "Full-time",
      description: "Handle inventory management and ensure proper storage of products."
    }
  ];

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
            <h1 className="text-4xl font-bold text-foreground">Join Our Team</h1>
            <p className="text-xl text-muted-foreground">
              Be part of the revolution in grocery delivery
            </p>
          </div>

          <div className="text-center space-y-4 py-8">
            <h2 className="text-2xl font-semibold text-foreground">Why Work With Us?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <Users className="h-8 w-8 text-primary mx-auto" />
                <h3 className="font-semibold">Great Team</h3>
                <p className="text-sm text-muted-foreground">Work with passionate people who care about customer experience</p>
              </div>
              <div className="text-center space-y-2">
                <Clock className="h-8 w-8 text-primary mx-auto" />
                <h3 className="font-semibold">Flexible Hours</h3>
                <p className="text-sm text-muted-foreground">Choose schedules that work best for your lifestyle</p>
              </div>
              <div className="text-center space-y-2">
                <MapPin className="h-8 w-8 text-primary mx-auto" />
                <h3 className="font-semibold">Local Impact</h3>
                <p className="text-sm text-muted-foreground">Make a difference in your local community</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Current Openings</h2>
            <div className="grid gap-6">
              {jobOpenings.map((job, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-start">
                      <span>{job.title}</span>
                      <Button>Apply Now</Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {job.type}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{job.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center space-y-4 py-8 border-t">
            <h2 className="text-2xl font-semibold text-foreground">Don't See Your Role?</h2>
            <p className="text-muted-foreground">
              We're always looking for talented individuals. Send us your resume at careers@groc.com
            </p>
            <Button>Send Resume</Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;