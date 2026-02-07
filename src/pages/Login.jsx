import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { LogIn, Smartphone, Mail } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        identifier: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Login button clicked!");
        console.log("Login data:", formData);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-brand-blue/5">
                <div className="bg-brand-violet py-10 px-8 text-center">
                    <h2 className="text-4xl font-black text-white tracking-tight">Ahaze</h2>
                    <p className="mt-2 text-white/80 font-bold uppercase tracking-widest text-xs">Connecting Ethiopia</p>
                </div>

                <form onSubmit={handleLogin} className="p-8 space-y-6">
                    <div className="space-y-4">
                        <Input
                            label="4.1 Mobile Number or Email"
                            name="identifier"
                            value={formData.identifier}
                            required
                            placeholder="e.g. +251... or name@email.com"
                            onChange={handleInputChange}
                        />
                        <Input
                            label="4.2 Password"
                            name="password"
                            value={formData.password}
                            type="password"
                            required
                            placeholder="••••••••"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded accent-brand-violet" />
                            <span className="text-sm font-bold text-brand-blue/70">Remember me</span>
                        </label>
                        <span className="text-sm font-bold text-brand-violet cursor-pointer hover:underline">Forgot password?</span>
                    </div>

                    <Button type="submit" className="w-full text-lg py-3.5 flex items-center space-x-2">
                        <LogIn className="w-5 h-5" />
                        <span>4.3 Login Button</span>
                    </Button>

                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-brand-blue/10"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-brand-blue/40 font-bold">Or continue with</span>
                        </div>
                    </div>

                    <p className="text-center text-sm font-bold text-brand-blue/60">
                        Don't have an account? <span onClick={() => navigate('/signup')} className="text-brand-violet cursor-pointer hover:underline">Create one</span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
