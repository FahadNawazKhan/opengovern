import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { MapPin, Users, Shield, Zap, AlertCircle, CheckCircle } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-light to-secondary py-20 px-4">
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-success/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            OpenGov
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Empowering citizens to report issues and connect with local authorities in real-time
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6 rounded-full shadow-lg"
              onClick={() => navigate('/auth')}
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 text-white border-white/30 hover:bg-white/20 text-lg px-8 py-6 rounded-full backdrop-blur-sm"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">
            How OpenGov Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card-kurzgesagt bg-gradient-to-br from-primary/5 to-primary/10">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Report Issues</h3>
              <p className="text-muted-foreground">
                Citizens can easily report local issues like potholes, broken streetlights, or safety concerns with precise location data.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card-kurzgesagt bg-gradient-to-br from-secondary/5 to-secondary/10">
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Real-Time Updates</h3>
              <p className="text-muted-foreground">
                Track your reports in real-time. Get instant notifications when authorities review or resolve your submissions.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card-kurzgesagt bg-gradient-to-br from-success/5 to-success/10">
              <div className="w-16 h-16 bg-success rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Authority Dashboard</h3>
              <p className="text-muted-foreground">
                Local authorities can efficiently manage, assign, and resolve citizen reports through a dedicated dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-foreground">
                Building Better Communities Together
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Transparency:</strong> Every report is tracked and visible, ensuring accountability.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Efficiency:</strong> Streamlined processes help authorities respond faster.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Community:</strong> Citizens and authorities work together to improve neighborhoods.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Analytics:</strong> Data-driven insights help prioritize community needs.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="card-kurzgesagt bg-gradient-to-br from-accent/10 to-secondary/10 p-8">
                <Users className="w-24 h-24 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-foreground">Join Thousands of Citizens</h3>
                <p className="text-muted-foreground mb-4">
                  Already making a difference in their communities through OpenGov.
                </p>
                <Button 
                  className="bg-primary text-primary-foreground hover:opacity-90 rounded-full"
                  onClick={() => navigate('/auth')}
                >
                  Start Reporting Today
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <AlertCircle className="w-16 h-16 text-accent mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Whether you're a citizen wanting to report an issue or an authority ready to serve your community better, OpenGov is here for you.
          </p>
          <Button 
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6 rounded-full shadow-lg"
            onClick={() => navigate('/auth')}
          >
            Join OpenGov Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
