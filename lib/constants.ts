// Credit calculation rates
export const CREDIT_RATES = {
    recycle: {
        plastic: 5,
        paper: 3,
        glass: 4,
        metal: 6,
        organic: 2,
        "e-waste": 10,
    } as Record<string, number>,
    transport: 2, // per km
    plantation: 10, // per tree
    savings: {
        water: 1, // per liter
        electricity: 2, // per kWh
    },
    reduction: 4, // per avoided car trip
};

// CO2 estimation: rough factor (credits → kg CO2 saved)
export const CO2_PER_CREDIT = 0.5;

// Authorized redemption places
export const REDEMPTION_PLACES = [
    { id: "govt-hospital", name: "Government Hospital", icon: "🏥", description: "Redeem credits for medical services at government hospitals" },
    { id: "medical-shop", name: "Medical Shop", icon: "💊", description: "Use credits at authorized medical shops for medicines" },
    { id: "metro-recharge", name: "Metro/Bus Recharge", icon: "🚇", description: "Recharge your metro or bus cards using green credits" },
    { id: "electricity-bill", name: "Electricity Bill Payment", icon: "⚡", description: "Pay electricity bills with earned green credits" },
    { id: "water-bill", name: "Water Bill Payment", icon: "💧", description: "Pay water bills using your green credits" },
    { id: "govt-school-canteen", name: "Govt School/College Canteen", icon: "🍽️", description: "Use credits at government school and college canteens" },
    { id: "public-parks", name: "Public Parks & Gardens", icon: "🌳", description: "Get entry passes and memberships for public parks" },
    { id: "recycling-center", name: "Recycling Drop-off Center", icon: "♻️", description: "Bonus credits when using authorized recycling centers" },
    { id: "public-library", name: "Public Library", icon: "📚", description: "Access premium library services with credits" },
    { id: "community-gym", name: "Community Gym/Sports Center", icon: "🏋️", description: "Avail gym and sports facilities with your credits" },
];
