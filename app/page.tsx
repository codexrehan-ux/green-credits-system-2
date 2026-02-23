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
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300">
              <Sparkles className="h-4 w-4" />
              Earn Credits for Every Green Action
            </div>
            
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Turn Your Eco-Friendly
                </span>
                <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Habits Into Real Rewards
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
                GreenCredits motivates you to recycle, use public transport, plant trees, and save resources. 
                Earn credits and redeem them at government hospitals, medical shops, public transport systems, and more.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login">
                <Button size="lg" className="h-14 px-8 text-base font-medium rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button variant="outline" size="lg" className="h-14 px-8 text-base font-medium rounded-2xl border-2 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 hover:scale-105">
                  How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "10K+", label: "Active Users", icon: Users },
              { value: "500T", label: "CO₂ Saved (kg)", icon: Globe },
              { value: "25K+", label: "Trees Planted", icon: TreePine },
              { value: "100+", label: "Redemption Partners", icon: Building2 },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center space-y-2">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
                  <stat.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Actions Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Log Actions, Earn Credits</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every eco-friendly action you take earns you green credits. Start building a sustainable future today!
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: Recycle, title: "Recycle", desc: "Up to 10 credits/kg", color: "from-green-500 to-emerald-600", bg: "from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20" },
              { icon: Train, title: "Transport", desc: "2 credits per km", color: "from-blue-500 to-cyan-600", bg: "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20" },
              { icon: TreePine, title: "Plantation", desc: "10 credits per tree", color: "from-emerald-500 to-teal-600", bg: "from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20" },
              { icon: Droplets, title: "Savings", desc: "Water & electricity", color: "from-cyan-500 to-blue-600", bg: "from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20" },
              { icon: Zap, title: "Reduction", desc: "4 credits per trip", color: "from-amber-500 to-orange-600", bg: "from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20" },
            ].map((action, index) => (
              <Card key={action.title} className={`group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br ${action.bg}`}>
                <CardContent className="p-6 text-center space-y-4">
                  <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${action.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Why Choose GreenCredits?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands making a positive impact on the environment
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Secure & Reliable",
                description: "Your data is encrypted and transactions are secure. Built with enterprise-grade security.",
                features: ["Bank-level encryption", "GDPR compliant", "Regular security audits"]
              },
              {
                icon: TrendingUp,
                title: "Track Your Impact",
                description: "Monitor your environmental impact with detailed analytics and insights.",
                features: ["Real-time tracking", "CO₂ savings calculator", "Impact reports"]
              },
              {
                icon: Award,
                title: "Real Rewards",
                description: "Redeem credits at hundreds of authorized locations nationwide.",
                features: ["Government hospitals", "Medical shops", "Public transport", "Utility bills"]
              }
            ].map((feature, index) => (
              <Card key={feature.title} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 p-8">
                <div className="space-y-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
                    <feature.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    <div className="my-4 h-px bg-border" />
                    <ul className="space-y-2">
                      {feature.features.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span>{item}</span>
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
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Redeem at Authorized Places</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Use your credits at government-authorized locations across the country
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Stethoscope, title: "Govt Hospitals", color: "from-red-500 to-pink-600" },
              { icon: Building2, title: "Medical Shops", color: "from-purple-500 to-indigo-600" },
              { icon: Train, title: "Metro / Bus", color: "from-blue-500 to-cyan-600" },
              { icon: Zap, title: "Electricity Bills", color: "from-amber-500 to-orange-600" },
              { icon: Droplets, title: "Water Bills", color: "from-cyan-500 to-blue-600" },
              { icon: Award, title: "Public Parks", color: "from-green-500 to-emerald-600" },
              { icon: Recycle, title: "Recycling Centers", color: "from-teal-500 to-green-600" },
              { icon: TreePine, title: "Community Centers", color: "from-emerald-500 to-teal-600" },
            ].map((place, index) => (
              <Card key={place.title} className="group border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white dark:bg-slate-800">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${place.color} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <place.icon className="h-6 w-6" />
                  </div>
                  <span className="font-medium">{place.title}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
                  <p className="text-lg text-muted-foreground italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
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
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center space-y-8">
          <h2 className="text-4xl font-bold">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-blue-100">
            Join thousands of users earning rewards for protecting our planet.
          </p>
          <Link href="/login">
            <Button size="lg" className="h-14 px-10 text-base font-medium rounded-2xl bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Start Earning Green Credits
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
