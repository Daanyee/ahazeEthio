import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import { Camera, HelpCircle, User, MapPin, GraduationCap, Briefcase, Lock, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Signup = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        // 1.1 Name and contact
        firstName: '',
        fatherName: '',
        grandFatherName: '',
        mobileNumber: '',
        emailAddress: '',
        // 1.2 Gender
        gender: '',
        // 1.3 Birth Date
        birthDate: '',
        // 1.4 Residence address
        region: '',
        zone: '',
        woreda: '',
        kebele: '',
        village: '',
        // 1.5 Education
        education: '',
        educationFields: [], // Degree in..., Masters in...
        certificates: [],
        // 1.6 Work Status
        workStatus: '',
        availability: [],
        // 1.7 Experience
        experiences: [],
        // 1.8 Skills
        skills: [],
        // 1.9 Profile Photo
        profilePhoto: null,
        // 1.10 What to show to all
        showToAll: [],
        // 1.11 & 1.12 Password
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            // 1. Sign up user in Auth
            const email = formData.emailAddress || `${formData.mobileNumber}@ahaze.ethio`;
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password: formData.password,
            });

            if (authError) throw authError;

            // 2. Create Profile in profiles table
            const { error: profileError } = await supabase
                .from('profiles')
                .insert({
                    id: authData.user.id,
                    first_name: formData.firstName,
                    father_name: formData.fatherName,
                    grand_father_name: formData.grandFatherName,
                    mobile_number: formData.mobileNumber,
                    email_address: formData.emailAddress,
                    gender: formData.gender,
                    birth_date: formData.birthDate,
                    region: formData.region,
                    zone: formData.zone,
                    woreda: formData.woreda,
                    kebele: formData.kebele,
                    village: formData.village,
                    education_level: formData.education,
                });

            if (profileError) throw profileError;

            console.log("Signup successful!");
            navigate('/');
        } catch (err) {
            setError(err.message);
            console.error("Signup error:", err);
        } finally {
            setLoading(false);
        }
    };

    const InfoTooltip = ({ text }) => (
        <div className="group relative inline-block ml-1 align-middle">
            <HelpCircle className="w-4 h-4 text-brand-blue/40 cursor-help" />
            <div className="hidden group-hover:block absolute z-50 w-64 p-2 mt-1 -left-2 bg-brand-blue text-white text-xs rounded-lg shadow-xl">
                {text}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-brand-blue/5">
                <div className="bg-brand-violet py-8 px-10">
                    <h2 className="text-3xl font-extrabold text-white">Account Opening</h2>
                    <p className="mt-2 text-white/80 font-medium">Create your profile to connect across Ethiopia</p>
                </div>

                {error && (
                    <div className="mx-10 mt-6 p-4 bg-red-50 border-2 border-red-100 text-red-600 rounded-2xl font-bold flex items-center space-x-2 animate-in fade-in slide-in-from-top-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSignup} className="px-10 py-10 space-y-8">
                    {/* 1.1 Name and Contact */}
                    <section className="space-y-6">
                        <div className="flex items-center space-x-2 border-b-2 border-brand-blue/5 pb-2">
                            <User className="w-5 h-5 text-brand-violet" />
                            <h3 className="text-lg font-bold text-brand-blue">1.1 Name and Contact</h3>
                            <InfoTooltip text="We collect this to verify your identity and help employers or organizations reach out to you professionally." />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Input
                                label="1.1.1.1 Your Name"
                                name="firstName"
                                value={formData.firstName}
                                required
                                placeholder="Enter your name"
                                onChange={handleInputChange}
                            />
                            <Input
                                label="1.1.1.2 Father Name"
                                name="fatherName"
                                value={formData.fatherName}
                                required
                                placeholder="Father's name"
                                onChange={handleInputChange}
                            />
                            <Input
                                label="1.1.1.3 Grand Father Name"
                                name="grandFatherName"
                                value={formData.grandFatherName}
                                required
                                placeholder="Grandfather's name"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="1.1.1.4 Mobile Number"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                required
                                placeholder="+251 ..."
                                onChange={handleInputChange}
                            />
                            <Input
                                label="1.1.1.5 Email Address (Optional)"
                                name="emailAddress"
                                value={formData.emailAddress}
                                type="email"
                                placeholder="you@example.com"
                                onChange={handleInputChange}
                            />
                        </div>
                    </section>

                    {/* 1.2 & 1.3 Gender & Birth Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <section className="space-y-2">
                            <label className="block text-sm font-semibold text-brand-blue ml-1">1.2 Gender</label>
                            <div className="flex space-x-4">
                                {['Male', 'Female'].map(g => (
                                    <label key={g} className="flex items-center space-x-2 cursor-pointer bg-white px-4 py-2 border-2 border-brand-blue/10 rounded-xl hover:border-brand-violet transition-all">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value={g}
                                            checked={formData.gender === g}
                                            className="w-4 h-4 text-brand-violet accent-brand-violet"
                                            onChange={handleInputChange}
                                        />
                                        <span className="font-semibold">{g}</span>
                                    </label>
                                ))}
                            </div>
                        </section>

                        <Input
                            label="1.3 Birth Date"
                            name="birthDate"
                            value={formData.birthDate}
                            type="date"
                            required
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* 1.4 Residence address */}
                    <section className="space-y-6">
                        <div className="flex items-center space-x-2 border-b-2 border-brand-blue/5 pb-2">
                            <MapPin className="w-5 h-5 text-brand-violet" />
                            <h3 className="text-lg font-bold text-brand-blue">1.4 Residence Address</h3>
                            <InfoTooltip text="Location data helps us show you relevant jobs, events, and products in your area." />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Select
                                label="1.4.1.1 Region"
                                name="region"
                                value={formData.region}
                                required
                                options={[
                                    { label: 'Addis Ababa', value: 'addis_ababa' },
                                    { label: 'Oromia', value: 'oromia' },
                                    { label: 'Amhara', value: 'amhara' },
                                    { label: 'Tigray', value: 'tigray' },
                                    // ... more
                                ]}
                                onChange={handleInputChange}
                            />
                            <Select
                                label="1.4.1.2 Zone"
                                name="zone"
                                value={formData.zone}
                                required
                                options={[{ label: 'Select Zone', value: 'test' }]}
                                onChange={handleInputChange}
                            />
                            <Input label="1.4.1.3 Woreda (Optional)" name="woreda" value={formData.woreda} onChange={handleInputChange} />
                            <Input label="1.4.1.4 Kebele (Optional)" name="kebele" value={formData.kebele} onChange={handleInputChange} />
                            <Input label="1.4.1.5 Village (Optional)" name="village" value={formData.village} onChange={handleInputChange} />
                        </div>
                    </section>

                    {/* 1.5 Education */}
                    <section className="space-y-6">
                        <div className="flex items-center space-x-2 border-b-2 border-brand-blue/5 pb-2">
                            <GraduationCap className="w-5 h-5 text-brand-violet" />
                            <h3 className="text-lg font-bold text-brand-blue">1.5 Education</h3>
                            <InfoTooltip text="Educational background is key for matching you with appropriate job opportunities." />
                        </div>
                        <Select
                            label="Level"
                            name="education"
                            value={formData.education}
                            options={[
                                { label: 'Elementary: 1-8', value: 'elementary' },
                                { label: 'High School: 9-10', value: 'high_school' },
                                { label: 'Preparatory: 10-12', value: 'preparatory' },
                                { label: 'Degree', value: 'degree' },
                                { label: 'Masters', value: 'masters' },
                                { label: 'PHD', value: 'phd' },
                                { label: 'Certificates', value: 'certificates' },
                            ]}
                            onChange={handleInputChange}
                        />
                    </section>

                    {/* 1.11 & 1.12 Password */}
                    <section className="space-y-6 pt-6 border-t-2 border-brand-blue/5">
                        <div className="flex items-center space-x-2">
                            <Lock className="w-5 h-5 text-brand-violet" />
                            <h3 className="text-lg font-bold text-brand-blue">Account Security</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="1.11 Password"
                                name="password"
                                value={formData.password}
                                type="password"
                                required
                                onChange={handleInputChange}
                            />
                            <Input
                                label="1.12 Again Password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                type="password"
                                required
                                onChange={handleInputChange}
                            />
                        </div>
                    </section>

                    <Button type="submit" className="w-full text-xl py-4" disabled={loading}>
                        {loading ? (
                            <div className="flex items-center space-x-2">
                                <Loader2 className="w-6 h-6 animate-spin" />
                                <span>Creating Account...</span>
                            </div>
                        ) : (
                            "1.13 Signup Button"
                        )}
                    </Button>

                    <p className="text-center text-sm font-bold text-brand-blue/60">
                        Already have an account? <span onClick={() => navigate('/login')} className="text-brand-violet cursor-pointer hover:underline">Login here</span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
