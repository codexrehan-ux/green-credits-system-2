import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Users, Target, Handshake, TreePine, Building2 } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            {/* Hero */}
            <div className="text-center mb-16">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                    <Leaf className="h-4 w-4" /> Our Mission
                </div>
                <h1 className="text-4xl font-bold sm:text-5xl mb-4">About GreenCredits</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    GreenCredits is a platform that rewards citizens for adopting eco-friendly habits.
                    Every sustainable action you take earns credits that can be redeemed at government-authorized places.
                </p>
            </div>

            {/* How Credits Work */}
            <div className="mb-16">
                <h2 className="text-2xl font-bold text-center mb-8">How Credits Are Calculated</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                        { title: "Recycling", rates: "Plastic: 5/kg • Paper: 3/kg • Glass: 4/kg • Metal: 6/kg • Organic: 2/kg • E-waste: 10/kg" },
                        { title: "Public Transport", rates: "2 credits per kilometer traveled by bus, metro, or train" },
                        { title: "Tree Plantation", rates: "10 credits for every tree you plant" },
                        { title: "Water Savings", rates: "1 credit per liter of water saved" },
                        { title: "Electricity Savings", rates: "2 credits per kWh of electricity saved" },
                        { title: "Emission Reduction", rates: "4 credits per avoided car trip or carpool equivalent" },
                    ].map((item) => (
                        <Card key={item.title} className="hover:shadow-md transition-all">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{item.rates}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Values */}
            <div className="mb-16">
                <h2 className="text-2xl font-bold text-center mb-8">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { icon: Target, title: "Transparency", desc: "Clear credit calculations with no hidden rules. Every green action is fairly rewarded." },
                        { icon: Users, title: "Community", desc: "Building a community of eco-warriors working together for a sustainable future." },
                        { icon: Handshake, title: "Accountability", desc: "Partnering with government bodies to ensure real impact and genuine redemption benefits." },
                    ].map((v) => (
                        <Card key={v.title} className="text-center p-6">
                            <v.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                            <h3 className="font-semibold text-lg mb-2">{v.title}</h3>
                            <p className="text-sm text-muted-foreground">{v.desc}</p>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Partners */}
            <div>
                <h2 className="text-2xl font-bold text-center mb-8">Our Partners</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { icon: Building2, name: "Government Hospitals" },
                        { icon: Building2, name: "Medical Shops" },
                        { icon: Building2, name: "Public Transport (Metro/Bus)" },
                        { icon: Building2, name: "Electricity Board" },
                        { icon: Building2, name: "Water Supply Board" },
                        { icon: TreePine, name: "Public Parks & Gardens" },
                        { icon: Building2, name: "Govt Schools/Colleges" },
                        { icon: Building2, name: "Recycling Centers" },
                    ].map((p, i) => (
                        <Card key={i} className="hover:shadow-md transition-all">
                            <CardContent className="p-4 flex items-center gap-3">
                                <p.icon className="h-5 w-5 text-primary shrink-0" />
                                <span className="text-sm font-medium">{p.name}</span>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
