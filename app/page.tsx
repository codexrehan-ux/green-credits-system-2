import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Leaf,
  Recycle,
  Train,
  TreePine,
  Droplets,
  Zap,
  Award,
  ArrowRight,
  Building2,
  Stethoscope,
  Shield,
  TrendingUp,
  Users,
  Globe,
  Sparkles,
  CheckCircle2,
  Star,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col scroll-smooth">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-float" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary/10 px-4 py-2 text-sm font-semibold text-primary animate-scale-in">
              <Sparkles className="h-4 w-4" />
              Earn Credits for Every Green Action
            </div>
            
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight animate-fade-in-up">
                <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Turn Your Eco-Friendly
                </span>
                <span className="block bg-gradient-to-r from-primary/80 to-accent bg-clip-text text-transparent">
                  Habits Into Real Rewards
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg sm:text-xl text-foreground leading-relaxed animate-fade-in-up animation-delay-200">
                GreenCredits motivates you to recycle, use public transport, plant trees, and save resources. 
                Earn credits and redeem them at government hospitals, medical shops, public transport systems, and more.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-400">
              <Link href="/login">
                <Button size="lg" className="h-14 px-8 text-base font-medium rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:rotate-1">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button variant="outline" size="lg" className="h-14 px-8 text-base font-semibold rounded-2xl border-2 border-secondary bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-300 hover:scale-105 hover:-rotate-1">
                  How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "10K+", label: "Active Users", icon: Users, suffix: "K+" },
              { value: "500T", label: "CO₂ Saved (kg)", icon: Globe, suffix: "00T" },
              { value: "25K+", label: "Trees Planted", icon: TreePine, suffix: "K+" },
              { value: "100+", label: "Redemption Partners", icon: Building2, suffix: "+" },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center space-y-2 group">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Actions Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Log Actions, Earn Credits</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every eco-friendly action you take earns you green credits. Start building a sustainable future today!
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: Recycle, title: "Recycle", desc: "Up to 10 credits/kg", color: "from-primary to-primary/80", bg: "bg-primary/5" },
              { icon: Train, title: "Transport", desc: "2 credits per km", color: "from-secondary to-accent", bg: "bg-secondary/5" },
              { icon: TreePine, title: "Plantation", desc: "10 credits per tree", color: "from-primary to-accent", bg: "bg-primary/5" },
              { icon: Droplets, title: "Savings", desc: "Water & electricity", color: "from-accent to-primary", bg: "bg-accent/5" },
              { icon: Zap, title: "Reduction", desc: "4 credits per trip", color: "from-secondary to-primary", bg: "bg-secondary/5" },
            ].map((action, index) => (
              <Card key={action.title} className={`group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${action.bg} cursor-pointer`}>
                <CardContent className="p-6 text-center space-y-4">
                  <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${action.color} text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <action.icon className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{action.title}</span>
                    <p className="text-sm text-muted-foreground">{action.desc}</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-xs font-semibold text-primary">Click to learn more</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Why Choose GreenCredits?</h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Join thousands making a positive impact on the environment
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Secure & Reliable",
                description: "Your data is encrypted and transactions are secure. Built with enterprise-grade security.",
                features: ["Bank-level encryption", "GDPR compliant", "Regular security audits"],
                gradient: "from-blue-500 to-indigo-600"
              },
              {
                icon: TrendingUp,
                title: "Track Your Impact",
                description: "Monitor your environmental impact with detailed analytics and insights.",
                features: ["Real-time tracking", "CO₂ savings calculator", "Impact reports"],
                gradient: "from-green-500 to-emerald-600"
              },
              {
                icon: Award,
                title: "Real Rewards",
                description: "Redeem credits at hundreds of authorized locations nationwide.",
                features: ["Government hospitals", "Medical shops", "Public transport", "Utility bills"],
                gradient: "from-purple-500 to-pink-600"
              }
            ].map((feature, index) => (
              <Card key={feature.title} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 p-8 hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10 space-y-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:from-primary/80 group-hover:to-accent/80 transition-all duration-300">{feature.title}</h3>
                    <p className="text-foreground leading-relaxed">{feature.description}</p>
                    <div className="my-4 h-px bg-border" />
                    <ul className="space-y-3">
                      {feature.features.map((item, itemIndex) => (
                        <li key={item} className="flex items-center gap-3 text-sm group/item">
                          <div className="flex-shrink-0">
                            <CheckCircle2 className="h-5 w-5 text-green-500 group-hover/item:scale-125 transition-transform duration-200" />
                          </div>
                          <span className="group-hover/item:text-primary transition-colors duration-200">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Redemption Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Redeem at Authorized Places</h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Use your credits at government-authorized locations across the country
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Stethoscope, title: "Govt Hospitals", color: "from-primary to-secondary" },
              { icon: Building2, title: "Medical Shops", color: "from-secondary to-accent" },
              { icon: Train, title: "Metro / Bus", color: "from-accent to-primary" },
              { icon: Zap, title: "Electricity Bills", color: "from-primary/80 to-secondary" },
              { icon: Droplets, title: "Water Bills", color: "from-secondary to-primary/80" },
              { icon: Award, title: "Public Parks", color: "from-primary to-accent" },
              { icon: Recycle, title: "Recycling Centers", color: "from-accent to-primary" },
              { icon: TreePine, title: "Community Centers", color: "from-primary/90 to-accent" },
            ].map((place, index) => (
              <Card key={place.title} className="group border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${place.color} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <place.icon className="h-6 w-6" />
                  </div>
                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{place.title}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">What Our Users Say</h2>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Join thousands of users making a positive impact on the environment
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "GreenCredits has completely changed how I think about my daily habits. I've earned over 500 credits this month!",
                author: "Sarah M.",
                role: "Environmental Engineer",
                rating: 5
              },
              {
                quote: "The app makes it so easy to track my eco-actions. Redeeming credits at hospitals has been a game-changer.",
                author: "Dr. Rajesh K.",
                role: "Medical Practitioner",
                rating: 5
              },
              {
                quote: "As a student, I love how this motivates me to use public transport more. The rewards are fantastic!",
                author: "Priya S.",
                role: "University Student",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg text-foreground italic group-hover:text-foreground/80 transition-colors duration-300">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

 

{/* Features Section */}
<section className="py-20 bg-white">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="text-center space-y-4 mb-16">
      <h2 className="text-4xl font-bold">Why Choose GreenCredits?</h2>
      <p className="text-xl text-foreground max-w-2xl mx-auto">
        Join thousands making a positive impact on the environment
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          icon: Shield,
          title: "Secure & Reliable",
          description: "Your data is encrypted and transactions are secure. Built with enterprise-grade security.",
          features: ["Bank-level encryption", "GDPR compliant", "Regular security audits"],
          gradient: "from-blue-500 to-indigo-600"
        },
        {
          icon: TrendingUp,
          title: "Track Your Impact",
          description: "Monitor your environmental impact with detailed analytics and insights.",
          features: ["Real-time tracking", "CO₂ savings calculator", "Impact reports"],
          gradient: "from-green-500 to-emerald-600"
        },
        {
          icon: Award,
          title: "Real Rewards",
          description: "Redeem credits at hundreds of authorized locations nationwide.",
          features: ["Government hospitals", "Medical shops", "Public transport", "Utility bills"],
          gradient: "from-purple-500 to-pink-600"
        }
      ].map((feature, index) => (
        <Card key={feature.title} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 p-8 hover:-translate-y-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
          <div className="relative z-10 space-y-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 group-hover:scale-110 transition-transform duration-300">
              <feature.icon className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:from-primary/80 group-hover:to-accent/80 transition-all duration-300">{feature.title}</h3>
              <p className="text-foreground leading-relaxed">{feature.description}</p>
              <div className="my-4 h-px bg-border" />
              <ul className="space-y-3">
                {feature.features.map((item, itemIndex) => (
                  <li key={item} className="flex items-center gap-3 text-sm group/item">
                    <div className="flex-shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-green-500 group-hover/item:scale-125 transition-transform duration-200" />
                    </div>
                    <span className="group-hover/item:text-primary transition-colors duration-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
</section>

{/* Redemption Section */}
<section className="py-20 bg-white">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="text-center space-y-4 mb-16">
      <h2 className="text-4xl font-bold">Redeem at Authorized Places</h2>
      <p className="text-xl text-foreground max-w-2xl mx-auto">
        Use your credits at government-authorized locations across the country
      </p>
    </div>
    
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {[
        { icon: Stethoscope, title: "Govt Hospitals", color: "from-primary to-secondary" },
        { icon: Building2, title: "Medical Shops", color: "from-secondary to-accent" },
        { icon: Train, title: "Metro / Bus", color: "from-accent to-primary" },
        { icon: Zap, title: "Electricity Bills", color: "from-primary/80 to-secondary" },
        { icon: Droplets, title: "Water Bills", color: "from-secondary to-primary/80" },
        { icon: Award, title: "Public Parks", color: "from-primary to-accent" },
        { icon: Recycle, title: "Recycling Centers", color: "from-accent to-primary" },
        { icon: TreePine, title: "Community Centers", color: "from-primary/90 to-accent" },
      ].map((place, index) => (
        <Card key={place.title} className="group border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white">
          <CardContent className="p-6 flex items-center gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${place.color} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
              <place.icon className="h-6 w-6" />
            </div>
            <span className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{place.title}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>

{/* Testimonials Section */}
<section className="py-20 bg-white">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="text-center space-y-4 mb-16">
      <h2 className="text-4xl font-bold">What Our Users Say</h2>
      <p className="text-xl text-foreground max-w-2xl mx-auto">
        Join thousands of users making a positive impact on the environment
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          quote: "GreenCredits has completely changed how I think about my daily habits. I've earned over 500 credits this month!",
          author: "Sarah M.",
          role: "Environmental Engineer",
          rating: 5
        },
        {
          quote: "The app makes it so easy to track my eco-actions. Redeeming credits at hospitals has been a game-changer.",
          author: "Dr. Rajesh K.",
          role: "Medical Practitioner",
          rating: 5
        },
        {
          quote: "As a student, I love how this motivates me to use public transport more. The rewards are fantastic!",
          author: "Priya S.",
          role: "University Student",
          rating: 5
        }
      ].map((testimonial, index) => (
        <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 p-8">
          <div className="space-y-6">
            <div className="flex items-center gap-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-lg text-foreground italic group-hover:text-foreground/80 transition-colors duration-300">"{testimonial.quote}"</p>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                {testimonial.author.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-foreground">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
</section>

{/* CTA Section */}
<section className="py-20 bg-gradient-to-br from-primary to-primary/90 text-white relative overflow-hidden">
  <div className="mx-auto max-w-4xl px-4 text-center space-y-8">
    <h2 className="text-4xl font-bold">
      Ready to Make a Difference?
    </h2>
    <p className="text-xl text-blue-100 animate-fade-in-up animation-delay-200">
      Join thousands of users earning rewards for protecting our planet.
    </p>
    <Link href="/login">
      <Button size="lg" className="h-14 px-10 text-base font-medium rounded-2xl bg-background text-foreground hover:bg-background/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
        Start Earning Green Credits
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </Link>
  </div>
</section>
</div>)
}
