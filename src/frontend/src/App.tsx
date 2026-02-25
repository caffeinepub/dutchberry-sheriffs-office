import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Shield, Menu, X, AlertCircle, Users, Phone, Clock } from "lucide-react";
import { useSubmitForm } from "@/hooks/useQueries";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const submitFormMutation = useSubmitForm();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const re = /^[\d\s\-\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, "").length >= 10;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = (): boolean => {
    const errors = {
      name: "",
      email: "",
      phone: "",
      message: "",
    };
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone is required";
      isValid = false;
    } else if (!validatePhone(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstErrorField = Object.keys(formErrors).find(
        (key) => formErrors[key as keyof typeof formErrors]
      );
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.focus();
      }
      return;
    }

    try {
      await submitFormMutation.mutateAsync(formData);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("Form submission error:", error);
    }
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="dutchberry-theme">
      <div className="min-h-screen">
        <Toaster />

      <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm shadow-lg">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => scrollToSection("hero")}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <img 
                src="/assets/generated/dutchberry-logo-transparent.dim_200x200.png" 
                alt="Dutchberry Sheriffs Office Logo" 
                className="h-8 w-8"
              />
              <span className="font-heading font-bold text-xl text-primary-foreground">
                Dutchberry Sheriffs Office
              </span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-primary-foreground"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollToSection("about")}
                className="text-primary-foreground hover:text-primary-foreground/80 transition-colors font-medium"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-primary-foreground hover:text-primary-foreground/80 transition-colors font-medium"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-primary-foreground hover:text-primary-foreground/80 transition-colors font-medium"
              >
                Contact
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-primary-foreground/20">
              <div className="flex flex-col gap-3 mt-4">
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-primary-foreground hover:text-primary-foreground/80 transition-colors font-medium text-left py-2"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-primary-foreground hover:text-primary-foreground/80 transition-colors font-medium text-left py-2"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-primary-foreground hover:text-primary-foreground/80 transition-colors font-medium text-left py-2"
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      <main className="pt-20">
        <section
          id="hero"
          className="relative min-h-[calc(100vh-5rem)] flex items-center bg-gradient-to-br from-primary via-primary to-accent diagonal-divider"
        >
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-3xl animate-fade-in">
              <h1 className="font-heading font-bold text-5xl md:text-7xl text-primary-foreground mb-6 leading-tight">
                Serving and Protecting <br />
                Dutchberry Community
              </h1>
              <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
                Dedicated to public safety, community partnership, and professional law enforcement
                excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => scrollToSection("contact")}
                  className="text-lg"
                >
                  Contact Us
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection("services")}
                  className="text-lg bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10"
                >
                  Our Services
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 diagonal-divider-reverse bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6">
                About Our Department
              </h2>
              <div className="space-y-6 text-lg leading-relaxed">
                <p className="text-muted-foreground">
                  The Dutchberry Sheriffs Office has proudly served our community for decades,
                  upholding the highest standards of law enforcement professionalism and integrity.
                  Our mission is to protect lives, prevent crime, and preserve the peace through
                  proactive policing and community engagement.
                </p>
                <p className="text-muted-foreground">
                  We are committed to building trust with the residents we serve by maintaining
                  transparency, accountability, and respect in all our interactions. Our deputies
                  undergo rigorous training and continuous education to ensure they are equipped
                  with the skills and knowledge necessary to handle the diverse challenges of modern
                  law enforcement.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mt-12">
                  <Card className="border-2">
                    <CardHeader>
                      <Shield className="h-12 w-12 text-primary mb-2" />
                      <CardTitle className="font-heading">Our Mission</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        To protect and serve the Dutchberry community with honor, integrity, and
                        professionalism.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-2">
                    <CardHeader>
                      <Users className="h-12 w-12 text-primary mb-2" />
                      <CardTitle className="font-heading">Our Values</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Integrity, accountability, respect, and excellence in everything we do.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-2">
                    <CardHeader>
                      <AlertCircle className="h-12 w-12 text-primary mb-2" />
                      <CardTitle className="font-heading">Our Commitment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Building safer neighborhoods through community partnership and proactive
                        policing.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-12 text-center">
                Our Services
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-l-4 border-l-primary hover:shadow-glow transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading text-2xl">Patrol Services</CardTitle>
                    <CardDescription>24/7 law enforcement presence</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Round-the-clock patrol coverage throughout Dutchberry, ensuring rapid response
                      to incidents and maintaining a visible deterrent to criminal activity.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-primary hover:shadow-glow transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading text-2xl">Emergency Response</CardTitle>
                    <CardDescription>Immediate assistance when you need it</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Trained deputies ready to respond to emergencies, accidents, and critical
                      situations with professional expertise and life-saving skills.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-primary hover:shadow-glow transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading text-2xl">Community Programs</CardTitle>
                    <CardDescription>Building stronger communities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Educational outreach, neighborhood watch coordination, youth programs, and
                      public safety workshops to foster positive relationships.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-primary hover:shadow-glow transition-shadow">
                  <CardHeader>
                    <CardTitle className="font-heading text-2xl">Crime Prevention</CardTitle>
                    <CardDescription>Proactive safety measures</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Strategic initiatives, intelligence-led policing, and collaboration with
                      residents to prevent crime before it occurs.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-12 p-6 bg-accent/10 border border-accent/20 rounded-lg">
                <div className="flex items-start gap-4">
                  <AlertCircle className="h-6 w-6 text-accent shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading font-bold text-xl mb-2">Emergency Information</h3>
                    <p className="text-muted-foreground mb-4">
                      For life-threatening emergencies, always call <strong>911</strong>.
                    </p>
                    <p className="text-muted-foreground">
                      For non-emergency matters, use the contact form below or call our
                      administrative line during business hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-12 text-center">
                Contact Us
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading">Office Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-1 shrink-0" />
                      <div>
                        <p className="font-medium">Office Hours</p>
                        <p className="text-sm text-muted-foreground">
                          Monday - Friday: 8:00 AM - 5:00 PM
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Emergency Services: 24/7
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-1 shrink-0" />
                      <div>
                        <p className="font-medium">Phone Numbers</p>
                        <p className="text-sm text-muted-foreground">
                          Emergency: <strong>911</strong>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Non-Emergency: (555) 123-4567
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <p className="font-medium mb-2">Address</p>
                      <p className="text-sm text-muted-foreground">
                        123 Main Street
                        <br />
                        Dutchberry, State 12345
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading">Send Us a Message</CardTitle>
                    <CardDescription>
                      For non-emergency inquiries, questions, or feedback
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name">
                          Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className={formErrors.name ? "border-destructive" : ""}
                          autoComplete="name"
                          required
                        />
                        {formErrors.name && (
                          <p className="text-sm text-destructive mt-1">{formErrors.name}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email">
                          Email <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className={formErrors.email ? "border-destructive" : ""}
                          autoComplete="email"
                          required
                        />
                        {formErrors.email && (
                          <p className="text-sm text-destructive mt-1">{formErrors.email}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone">
                          Phone <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className={formErrors.phone ? "border-destructive" : ""}
                          autoComplete="tel"
                          required
                        />
                        {formErrors.phone && (
                          <p className="text-sm text-destructive mt-1">{formErrors.phone}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="message">
                          Message <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          className={formErrors.message ? "border-destructive" : ""}
                          rows={4}
                          required
                        />
                        {formErrors.message && (
                          <p className="text-sm text-destructive mt-1">{formErrors.message}</p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={submitFormMutation.isPending}
                      >
                        {submitFormMutation.isPending ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/generated/dutchberry-logo-transparent.dim_200x200.png" 
                alt="Dutchberry Sheriffs Office Logo" 
                className="h-6 w-6"
              />
              <span className="font-heading font-bold text-primary-foreground">
                Dutchberry Sheriffs Office
              </span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              © 2026. Built with love using{" "}
              <a
                href="https://caffeine.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-foreground transition-colors underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
    </ThemeProvider>
  );
}

export default App;
