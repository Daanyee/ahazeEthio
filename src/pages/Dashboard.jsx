import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Plus, Search, Bell, Menu, User,
    MessageSquare, Briefcase, Calendar,
    ShoppingBag, Key, Radio, Settings, Loader2
} from 'lucide-react';
import Button from '../components/ui/Button';
import { supabase } from '../lib/supabase';
import { useEffect } from 'react';
import CreatePostModal from '../components/CreatePostModal';

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('all');
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);

    const menuItems = [
        { id: 'all', label: 'All Posts', icon: MessageSquare },
        { id: 'job', label: 'Find Worker', icon: Briefcase },
        { id: 'event', label: 'Events', icon: Calendar },
        { id: 'product', label: 'Market', icon: ShoppingBag },
        { id: 'rent', label: 'Rent', icon: Key },
        { id: 'live', label: 'Live', icon: Radio },
    ];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // 1. Get current session
                const { data: { session } } = await supabase.auth.getSession();
                if (!session) {
                    navigate('/login');
                    return;
                }

                // 2. Fetch user profile
                const { data: profile, error: profileError } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .maybeSingle();

                if (profileError) {
                    console.error("Error fetching profile:", profileError);
                }

                setUser(profile);

                // 3. Fetch posts
                fetchPosts(activeTab);

            } catch (err) {
                console.error("Error fetching dashboard data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate, activeTab]);

    const fetchPosts = async (type) => {
        let query = supabase
            .from('posts')
            .select(`
                *,
                profiles:author_id (first_name, father_name),
                organizations:org_id (full_name),
                jobs (*),
                events (*)
            `)
            .order('created_at', { ascending: false });

        if (type !== 'all') {
            query = query.eq('post_type', type);
        }

        const { data, error } = await query;
        if (error) console.error("Error fetching posts:", error);
        else setPosts(data || []);
    };

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
                            <div className="w-12 h-12 rounded-2xl bg-brand-violet flex items-center justify-center text-white font-black text-xl">
                                {user?.first_name?.[0] || 'U'}
                            </div>
                            <div>
                                <h4 className="font-bold text-brand-blue">{user ? `${user.first_name} ${user.father_name}` : 'Loading...'}</h4>
                                <p className="text-xs font-bold text-brand-blue/40">{user?.work_status || 'Individual Profile'}</p>
                            </div>
                        </div>
                        <Button variant="secondary" size="sm" className="w-full text-xs" onClick={() => supabase.auth.signOut().then(() => navigate('/login'))}>
                            Sign Out
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
                        <Button className="rounded-2xl space-x-2" onClick={() => setIsPostModalOpen(true)}>
                            <Plus className="w-5 h-5" />
                            <span>New Post</span>
                        </Button>
                    </div>
                </header>

                {/* Feed */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8 hide-scrollbar">
                    <div className="max-w-2xl mx-auto space-y-8">
                        {/* Post Creation Area */}
                        <div
                            onClick={() => setIsPostModalOpen(true)}
                            className="bg-white rounded-3xl p-6 shadow-sm border border-brand-blue/5 flex items-center space-x-4 cursor-pointer hover:border-brand-violet/20 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-brand-violet/10 shrink-0 flex items-center justify-center text-brand-violet font-black group-hover:bg-brand-violet group-hover:text-white transition-all">
                                {user?.first_name?.[0] || 'U'}
                            </div>
                            <div className="flex-1 bg-gray-50 rounded-2xl px-6 py-3 text-brand-blue/30 font-bold group-hover:bg-gray-100 transition-colors">
                                What's on your mind, {user?.first_name || 'there'}?
                            </div>
                        </div>

                        {/* Real Posts */}
                        {loading && posts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                                <Loader2 className="w-12 h-12 text-brand-violet animate-spin" />
                                <p className="font-bold text-brand-blue/40 uppercase tracking-widest text-sm">Loading Posts...</p>
                            </div>
                        ) : posts.length === 0 ? (
                            <div className="bg-white rounded-[2rem] p-12 text-center border border-brand-blue/5">
                                <MessageSquare className="w-16 h-16 text-brand-blue/10 mx-auto mb-4" />
                                <h3 className="text-xl font-black text-brand-blue">No posts found</h3>
                                <p className="text-brand-blue/40 font-bold mt-2">Be the first to share something in this category!</p>
                            </div>
                        ) : (
                            posts.map((post) => (
                                <div key={post.id} className="bg-white rounded-[2rem] p-8 shadow-sm border border-brand-blue/5 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-violet to-brand-blue flex items-center justify-center text-white text-xl font-black">
                                                {(post.organizations?.full_name || post.profiles?.first_name || 'A')[0]}
                                            </div>
                                            <div>
                                                <h3 className="font-black text-brand-blue text-lg">
                                                    {post.organizations?.full_name || `${post.profiles?.first_name} ${post.profiles?.father_name}`}
                                                </h3>
                                                <p className="text-xs font-bold text-brand-blue/40">
                                                    {new Date(post.created_at).toLocaleDateString()} • {post.target_location?.region || 'Ethiopia'}
                                                </p>
                                            </div>
                                        </div>
                                        <Settings className="w-5 h-5 text-brand-blue/20 cursor-pointer" />
                                    </div>

                                    <div className="space-y-4">
                                        {post.content_text && (
                                            <p className="text-brand-blue text-lg leading-relaxed font-medium">
                                                {post.content_text}
                                            </p>
                                        )}

                                        {post.post_type === 'job' && post.jobs && (
                                            <div className="grid grid-cols-2 gap-4 p-4 bg-brand-blue/5 rounded-2xl border border-brand-blue/10">
                                                <div>
                                                    <p className="text-[10px] uppercase font-black text-brand-blue/40 tracking-widest">Payment</p>
                                                    <p className="font-bold text-brand-blue">{post.jobs.payment_amount} ETB</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] uppercase font-black text-brand-blue/40 tracking-widest">Needed</p>
                                                    <p className="font-bold text-brand-blue">{post.jobs.workers_needed} Workers</p>
                                                </div>
                                            </div>
                                        )}

                                        {post.post_type === 'event' && post.events && (
                                            <div className="p-4 bg-brand-violet/5 rounded-2xl border border-brand-violet/10 flex items-center justify-between">
                                                <div>
                                                    <p className="text-[10px] uppercase font-black text-brand-violet/60 tracking-widest">Date & Time</p>
                                                    <p className="font-bold text-brand-blue">{new Date(post.events.start_time).toLocaleString()}</p>
                                                </div>
                                                <div className="px-4 py-1.5 bg-brand-violet text-white rounded-xl text-xs font-black uppercase tracking-widest">
                                                    {post.events.entry_requirement}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {post.media_urls && post.media_urls.length > 0 && (
                                        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-brand-blue/5 border border-brand-blue/10">
                                            <img src={post.media_urls[0]} alt="Post media" className="w-full h-full object-cover" />
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between pt-6 border-t border-brand-blue/5">
                                        <div className="flex items-center space-x-6">
                                            <button className="flex items-center space-x-2 text-brand-blue font-bold hover:text-brand-violet transition-colors">
                                                <MessageSquare className="w-5 h-5" />
                                                <span>Discuss</span>
                                            </button>
                                            <button className="flex items-center space-x-2 text-brand-blue font-bold hover:text-brand-violet transition-colors">
                                                <Plus className="w-5 h-5" />
                                                <span>Save</span>
                                            </button>
                                        </div>
                                        <div className="text-sm font-black text-brand-blue/20">Interactions</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>

            <CreatePostModal
                isOpen={isPostModalOpen}
                onClose={() => setIsPostModalOpen(false)}
                user={user}
                onPostCreated={(newPost) => setPosts(prev => [newPost, ...prev])}
            />
        </div>
    );
};

export default Dashboard;
