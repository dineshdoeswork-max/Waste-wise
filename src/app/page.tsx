import Link from "next/link";
import { Leaf, ArrowRight, ShieldCheck, Map, BarChart3, Truck, Users, Clock, Globe, ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <header className="px-6 lg:px-12 h-20 flex items-center border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2 group" href="#">
          <div className="bg-emerald-100 p-2 rounded-xl group-hover:bg-emerald-200 transition-colors">
            <Leaf className="h-6 w-6 text-emerald-600" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-slate-900">WasteWise</span>
        </Link>
        <nav className="ml-auto hidden md:flex gap-8">
          <Link className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors" href="#features">
            Features
          </Link>
          <Link className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors" href="#how-it-works">
            How it Works
          </Link>
          <Link className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors" href="#impact">
            Impact
          </Link>
        </nav>
        <div className="ml-auto md:ml-8 flex items-center gap-4">
          <Link 
            href="/login"
            className="hidden sm:inline-flex h-10 items-center justify-center rounded-lg bg-emerald-600 px-6 text-sm font-semibold text-white shadow-sm shadow-emerald-200 transition-all hover:bg-emerald-700 hover:shadow-emerald-300 active:scale-95"
          >
            Citizen Portal
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 lg:py-40 bg-slate-50 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-emerald-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          
          <div className="container px-4 md:px-6 relative z-10 mx-auto max-w-6xl">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800">
                <span className="flex w-2 h-2 rounded-full bg-emerald-600 mr-2 animate-pulse"></span>
                Now active in Mumbai Western Suburbs
              </div>
              <div className="space-y-6 max-w-4xl">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 leading-[1.1]">
                  Smarter Waste Management for <br className="hidden md:block"/> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Cleaner, Greener Cities</span>
                </h1>
                <p className="mx-auto max-w-[750px] text-slate-600 text-lg md:text-xl leading-relaxed">
                  Bridge the gap between citizens and municipalities. Report issues instantly, request priority collections, and let AI optimize the routing for a zero-waste tomorrow.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
                <Link 
                  href="/login"
                  className="inline-flex h-14 items-center justify-center rounded-xl bg-emerald-600 px-8 text-base font-bold text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-700 hover:shadow-emerald-300 hover:-translate-y-0.5 w-full sm:w-auto"
                >
                  Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  href="/admin"
                  className="inline-flex h-14 items-center justify-center rounded-xl border-2 border-slate-200 bg-white px-8 text-base font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 w-full sm:w-auto"
                >
                  View Admin Dashboard <ArrowUpRight className="ml-2 h-5 w-5 text-slate-400" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="impact" className="w-full py-12 bg-emerald-900 text-white">
          <div className="container px-4 md:px-6 mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-emerald-800">
              <div className="space-y-2">
                <h4 className="text-4xl font-bold text-emerald-400">12k+</h4>
                <p className="text-sm font-medium text-emerald-100/70 uppercase tracking-wider">Reports Resolved</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-4xl font-bold text-emerald-400">45%</h4>
                <p className="text-sm font-medium text-emerald-100/70 uppercase tracking-wider">Fuel Saved</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-4xl font-bold text-emerald-400">2.5hr</h4>
                <p className="text-sm font-medium text-emerald-100/70 uppercase tracking-wider">Avg Response Time</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-4xl font-bold text-emerald-400">8+</h4>
                <p className="text-sm font-medium text-emerald-100/70 uppercase tracking-wider">Active Zones</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="w-full py-20 md:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto max-w-6xl">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Everything you need to manage city waste</h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">A comprehensive suite of tools designed for both the civic body and the citizens they serve.</p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/50 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="h-7 w-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">Civic Reporting</h3>
                <p className="text-slate-600 leading-relaxed">Citizens can instantly report waste issues with photo evidence, exact GPS locations, and urgency levels.</p>
              </div>

              {/* Feature 2 */}
              <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Map className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">Smart Routing</h3>
                <p className="text-slate-600 leading-relaxed">AI-optimized daily routes for collection teams, drastically saving time, fuel, and municipal resources.</p>
              </div>

              {/* Feature 3 */}
              <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-100/50 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">Live Analytics</h3>
                <p className="text-slate-600 leading-relaxed">Real-time interactive dashboards for administrators to monitor hotspots, truck statuses, and performance.</p>
              </div>

              {/* Feature 4 */}
              <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100/50 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Truck className="h-7 w-7 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">Priority Collections</h3>
                <p className="text-slate-600 leading-relaxed">Schedule garbage pickups dynamically based on area priority, estimated volume, and truck availability.</p>
              </div>

              {/* Feature 5 */}
              <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-teal-200 hover:shadow-xl hover:shadow-teal-100/50 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-teal-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Globe className="h-7 w-7 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">Interactive Hotspot Maps</h3>
                <p className="text-slate-600 leading-relaxed">Visualize critical waste accumulation zones on a professional cartographic interface for quick dispatch.</p>
              </div>

              {/* Feature 6 */}
              <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="h-7 w-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">Community Engagement</h3>
                <p className="text-slate-600 leading-relaxed">Keep citizens in the loop with status updates, resolution photos, and community cleanliness scores.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="w-full py-20 md:py-32 bg-slate-50 border-t border-slate-200">
          <div className="container px-4 md:px-6 mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-16">How WasteWise Works</h2>
            
            <div className="grid md:grid-cols-3 gap-10 relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-slate-200 z-0"></div>
              
              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-white border-4 border-emerald-100 flex items-center justify-center text-3xl font-black text-emerald-600 mb-6 shadow-sm">1</div>
                <h3 className="text-xl font-bold mb-3">Report or Request</h3>
                <p className="text-slate-600">Citizens use the web app to flag a waste issue or request a bulk garbage pickup.</p>
              </div>
              
              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-white border-4 border-blue-100 flex items-center justify-center text-3xl font-black text-blue-600 mb-6 shadow-sm">2</div>
                <h3 className="text-xl font-bold mb-3">AI Processing</h3>
                <p className="text-slate-600">Our system assigns priorities, updates the live map, and calculates the optimal truck route.</p>
              </div>
              
              {/* Step 3 */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-white border-4 border-purple-100 flex items-center justify-center text-3xl font-black text-purple-600 mb-6 shadow-sm">3</div>
                <h3 className="text-xl font-bold mb-3">Resolution</h3>
                <p className="text-slate-600">Municipal teams clear the waste, and citizens are instantly notified of the completed job.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 bg-white">
          <div className="container px-4 md:px-6 mx-auto max-w-4xl">
            <div className="bg-emerald-900 rounded-3xl p-8 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              <div className="relative z-10 space-y-6">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Ready to transform your city?</h2>
                <p className="text-emerald-100 text-lg md:text-xl max-w-2xl mx-auto">
                  Join hundreds of neighborhoods already using WasteWise to maintain cleaner, healthier environments.
                </p>
                <div className="pt-6">
                  <Link 
                    href="/login"
                    className="inline-flex h-14 items-center justify-center rounded-xl bg-white px-10 text-base font-bold text-emerald-900 shadow-lg transition-all hover:bg-slate-50 hover:scale-105"
                  >
                    Get Started Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 space-y-4">
              <Link className="flex items-center gap-2" href="#">
                <Leaf className="h-6 w-6 text-emerald-600" />
                <span className="font-bold text-xl text-slate-900">WasteWise</span>
              </Link>
              <p className="text-slate-500 max-w-xs text-sm leading-relaxed">
                Empowering modern cities with data-driven, community-focused waste management solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Platform</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><Link href="#" className="hover:text-emerald-600">Citizen App</Link></li>
                <li><Link href="#" className="hover:text-emerald-600">Admin Dashboard</Link></li>
                <li><Link href="#" className="hover:text-emerald-600">Driver Routing</Link></li>
                <li><Link href="#" className="hover:text-emerald-600">Analytics API</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><Link href="#" className="hover:text-emerald-600">About Us</Link></li>
                <li><Link href="#" className="hover:text-emerald-600">Contact</Link></li>
                <li><Link href="#" className="hover:text-emerald-600">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-emerald-600">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>© 2026 WasteWise Municipal Platform. All rights reserved.</p>
            <div className="flex gap-4">
              <span>Made for a cleaner Mumbai</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
