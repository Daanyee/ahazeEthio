import React, { useState } from 'react';
import { X, Image as ImageIcon, Loader2, MapPin } from 'lucide-react';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import { supabase } from '../lib/supabase';

const CreatePostModal = ({ isOpen, onClose, user, onPostCreated }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [postType, setPostType] = useState('normal');
    const [content, setContent] = useState('');
    const [mediaUrls, setMediaUrls] = useState([]);
    const [location, setLocation] = useState({
        region: user?.region || '',
        zone: user?.zone || '',
    });

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error("Please log in to post.");

            const { data, error: postError } = await supabase
                .from('posts')
                .insert({
                    author_id: session.user.id,
                    content_text: content,
                    post_type: postType,
                    media_urls: mediaUrls,
                    target_location: location
                })
                .select()
                .single();

            if (postError) throw postError;

            onPostCreated(data);
            onClose();
            setContent('');
            setPostType('normal');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-blue/20 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-brand-blue/5 animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-brand-blue/5 flex items-center justify-between bg-gray-50/50">
                    <h2 className="text-xl font-black text-brand-blue flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-xl bg-brand-violet/10 flex items-center justify-center">
                            <Plus className="w-5 h-5 text-brand-violet" />
                        </div>
                        <span>Create New Post</span>
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-red-50 text-red-400 hover:text-red-500 rounded-xl transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {error && (
                        <div className="p-4 bg-red-50 border-2 border-red-100 text-red-600 rounded-2xl font-bold text-sm">
                            {error}
                        </div>
                    )}

                    <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
                        {['normal', 'job', 'event', 'product', 'rent', 'live'].map((type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setPostType(type)}
                                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${postType === type
                                    ? 'bg-brand-violet text-white shadow-lg shadow-brand-violet/20'
                                    : 'bg-brand-blue/5 text-brand-blue/40 hover:bg-brand-blue/10'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={`Share something${postType !== 'normal' ? ` about this ${postType}` : ''}...`}
                        className="w-full h-40 p-6 bg-gray-50 border-2 border-transparent rounded-[2rem] focus:border-brand-violet/20 focus:bg-white outline-none transition-all font-medium text-brand-blue text-lg resize-none"
                        required
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Region"
                            name="region"
                            value={location.region}
                            onChange={(e) => setLocation(prev => ({ ...prev, region: e.target.value }))}
                        />
                        <Input
                            label="Zone"
                            name="zone"
                            value={location.zone}
                            onChange={(e) => setLocation(prev => ({ ...prev, zone: e.target.value }))}
                        />
                    </div>

                    <div className="flex items-center justify-between pt-4">
                        <button type="button" className="flex items-center space-x-2 text-brand-blue/40 font-bold hover:text-brand-violet transition-colors">
                            <ImageIcon className="w-6 h-6" />
                            <span>Add Photo</span>
                        </button>

                        <Button type="submit" disabled={loading} className="px-10 py-4 shadow-brand-violet/20">
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Post to Ahaze"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Plus = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

export default CreatePostModal;
