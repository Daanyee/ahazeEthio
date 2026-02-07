import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Plus, Search, Bell, Menu, User,
    MessageSquare, Briefcase, Calendar,
    ShoppingBag, Key, Radio, Settings
} from 'lucide-react';
import Button from '../components/ui/Button';

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('all');

    const menuItems = [
        { id: 'all', label: 'All Posts', icon: MessageSquare },
        { id: 'jobs', label: 'Find Worker', icon: Briefcase },
        { id: 'events', label: 'Events', icon: Calendar },
        { id: 'market', label: 'Market', icon: ShoppingBag },
        { id: 'rent', label: 'Rent', icon: Key },
        { id: 'live', label: 'Live', icon: Radio },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-brand-blue/5 flex flex-col hidden lg:flex">
                <div className="p-8">
                    <h1 className="text-3xl font-black text-brand-violet tracking-tighter">Ahaze</h1>
                    <p className="text-[10px] uppercase font-black text-brand-blue tracking-[0.2em] mt-1 opacity-40">Connecting Ethiopia</p>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-bold transition-all duration-200 ${activeTab === item.id
                                    ? 'bg-brand-violet text-white shadow-xl shadow-brand-violet/20 scale-[1.02]'
                                    : 'text-brand-blue/60 hover:bg-brand-blue/5 hover:text-brand-blue'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-4 mt-auto">
                    <div className="bg-brand-blue/5 rounded-3xl p-6 border border-brand-blue/5">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-brand-violet flex items-center justify-center text-white font-black text-xl">D</div>
                            <div>
                                <h4 className="font-bold text-brand-blue">Dagne A.</h4>
                                <p className="text-xs font-bold text-brand-blue/40">Individual Profile</p>
                            </div>
                        </div>
                        <Button variant="secondary" size="sm" className="w-full text-xs" onClick={() => navigate('/login')}>
                            Switch Account
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-white border-b border-brand-blue/5 px-8 flex items-center justify-between z-10">
                    <div className="relative w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-blue/20" />
                        <input
                            type="text"
                            placeholder="Search Ahaze..."
                            className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-brand-violet/20 focus:bg-white outline-none transition-all font-medium text-brand-blue"
                        />
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="p-3 bg-gray-50 rounded-2xl text-brand-blue/40 hover:text-brand-violet transition-colors">
                            <Bell className="w-6 h-6" />
                        </button>
                        <Button className="rounded-2xl space-x-2">
                            <Plus className="w-5 h-5" />
                            <span>New Post</span>
                        </Button>
                    </div>
                </header>

                {/* Feed */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8 hide-scrollbar">
                    <div className="max-w-2xl mx-auto space-y-8">
                        {/* Post Creation Area placeholder */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-brand-blue/5 flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-2xl bg-brand-violet/10 shrink-0"></div>
                            <div className="flex-1 bg-gray-50 rounded-2xl px-6 py-3 text-brand-blue/30 font-bold cursor-pointer hover:bg-gray-100 transition-colors">
                                What's on your mind?
                            </div>
                        </div>

                        {/* Placeholder Posts */}
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-[2rem] p-8 shadow-sm border border-brand-blue/5 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-violet to-brand-blue flex items-center justify-center text-white text-xl font-black">A</div>
                                        <div>
                                            <h3 className="font-black text-brand-blue text-lg">Ahaze Official</h3>
                                            <p className="text-xs font-bold text-brand-blue/40">2 hours ago • Addis Ababa</p>
                                        </div>
                                    </div>
                                    <Settings className="w-5 h-5 text-brand-blue/20 cursor-pointer" />
                                </div>

                                <p className="text-brand-blue text-lg leading-relaxed font-medium">
                                    Welcome to the new Ahaze! Connect with workers, find products, and join events across Ethiopia with our premium professional platform. 🇪🇹
                                </p>

                                <div className="aspect-video w-full rounded-2xl bg-brand-blue/5 border border-brand-blue/10 flex items-center justify-center">
                                    <span className="font-black text-brand-blue/10 text-4xl uppercase tracking-tighter">Media Preview</span>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-brand-blue/5">
                                    <div className="flex items-center space-x-6">
                                        <button className="flex items-center space-x-2 text-brand-blue font-bold hover:text-brand-violet transition-colors">
                                            <MessageSquare className="w-5 h-5" />
                                            <span>42 Comments</span>
                                        </button>
                                        <button className="flex items-center space-x-2 text-brand-blue font-bold hover:text-brand-violet transition-colors">
                                            <Plus className="w-5 h-5" />
                                            <span>Save</span>
                                        </button>
                                    </div>
                                    <div className="text-sm font-black text-brand-blue/20">1.2k Views</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
