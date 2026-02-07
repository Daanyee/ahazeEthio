import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import { Building2, Users, MapPin, Contact, Info, Image as ImageIcon } from 'lucide-react';

const OrganizationRegistration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        managedBy: [],
        orgType: '',
        businessType: '',
        industry: '',
        tinNumber: '',
        establishedDate: '',
        region: '',
        zone: '',
        woreda: '',
        kebele: '',
        sefer: '',
        building: '',
        manager: '',
        phone: '',
        email: '',
        facebook: '',
        about: '',
        logo: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-brand-blue/5">
                <div className="bg-brand-violet py-8 px-10">
                    <h2 className="text-3xl font-extrabold text-white">Organization Registration</h2>
                    <p className="mt-2 text-white/80 font-medium">Verify your organization and start connecting</p>
                </div>

                <form className="p-10 space-y-10">
                    {/* 2.1 & 2.2 Profile Basics */}
                    <section className="space-y-6">
                        <div className="flex items-center space-x-2 border-b-2 border-brand-blue/5 pb-2">
                            <Building2 className="w-5 h-5 text-brand-violet" />
                            <h3 className="text-lg font-bold text-brand-blue uppercase tracking-wide">Identity</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="2.1 Organization Full Name"
                                name="fullName"
                                required
                                onChange={handleInputChange}
                            />
                            <Input
                                label="2.2 Managed By (User Phone/Email)"
                                name="manager"
                                required
                                placeholder="Search or add manager..."
                                onChange={handleInputChange}
                            />
                        </div>
                    </section>

                    {/* 2.3 Organization Type */}
                    <section className="space-y-6">
                        <div className="flex items-center space-x-2 border-b-2 border-brand-blue/5 pb-2">
                            <Users className="w-5 h-5 text-brand-violet" />
                            <h3 className="text-lg font-bold text-brand-blue uppercase tracking-wide">2.3 Organization Type</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Select
                                label="Organization Type"
                                name="orgType"
                                options={[
                                    { label: 'Business', value: 'business' },
                                    { label: 'Non-business', value: 'non_business' },
                                ]}
                                onChange={handleInputChange}
                            />
                            {formData.orgType === 'business' && (
                                <Select
                                    label="2.3.1.1.1 Business Type"
                                    name="businessType"
                                    options={[
                                        { label: 'Sole Proprietorship', value: 'sole' },
                                        { label: 'PLC', value: 'plc' },
                                        { label: 'Partnership', value: 'partnership' },
                                        { label: 'Share Company', value: 'share' },
                                    ]}
                                    onChange={handleInputChange}
                                />
                            )}
                        </div>
                        {formData.orgType === 'business' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input label="2.3.1.1.3.1 TIN Number" name="tinNumber" onChange={handleInputChange} />
                                <Input label="2.3.1.1.4.1 Date Established" type="date" name="establishedDate" onChange={handleInputChange} />
                            </div>
                        )}
                    </section>

                    {/* 2.4 Address */}
                    <section className="space-y-6">
                        <div className="flex items-center space-x-2 border-b-2 border-brand-blue/5 pb-2">
                            <MapPin className="w-5 h-5 text-brand-violet" />
                            <h3 className="text-lg font-bold text-brand-blue uppercase tracking-wide">2.4 Address (Required)</h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            <Input label="2.4.1.1 Region" name="region" required onChange={handleInputChange} />
                            <Input label="2.4.1.2 Zone" name="zone" required onChange={handleInputChange} />
                            <Input label="2.4.1.3 Woreda" name="woreda" required onChange={handleInputChange} />
                            <Input label="2.4.1.4 Kebele" name="kebele" required onChange={handleInputChange} />
                            <Input label="2.4.1.5 Sefer" name="sefer" required onChange={handleInputChange} />
                            <Input label="2.4.1.6 Building" name="building" required onChange={handleInputChange} />
                        </div>
                    </section>

                    {/* 2.5 Contacts */}
                    <section className="space-y-6">
                        <div className="flex items-center space-x-2 border-b-2 border-brand-blue/5 pb-2">
                            <Contact className="w-5 h-5 text-brand-violet" />
                            <h3 className="text-lg font-bold text-brand-blue uppercase tracking-wide">2.5 Contacts</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="2.5.1.2 Phone" name="phone" required placeholder="+251 ..." onChange={handleInputChange} />
                            <Input label="2.5.1.3 Email" name="email" type="email" placeholder="org@email.com" onChange={handleInputChange} />
                        </div>
                    </section>

                    {/* 2.6 About */}
                    <section className="space-y-4">
                        <div className="flex items-center space-x-2 border-b-2 border-brand-blue/5 pb-2">
                            <Info className="w-5 h-5 text-brand-violet" />
                            <h3 className="text-lg font-bold text-brand-blue uppercase tracking-wide">2.6 About</h3>
                        </div>
                        <textarea
                            name="about"
                            maxLength={5000}
                            placeholder="Tell us about the organization (max 5000 characters)"
                            className="w-full h-32 px-4 py-3 border-2 border-brand-blue/10 rounded-xl focus:border-brand-violet outline-none transition-all text-brand-blue"
                            onChange={handleInputChange}
                        ></textarea>
                    </section>

                    {/* 2.7 Logo */}
                    <section className="space-y-4">
                        <label className="block text-sm font-semibold text-brand-blue ml-1">2.7 Logo or Profile Picture</label>
                        <div className="w-full h-40 border-dashed border-4 border-brand-blue/10 rounded-3xl flex flex-col items-center justify-center hover:border-brand-violet/40 cursor-pointer transition-all bg-brand-blue/5">
                            <ImageIcon className="w-12 h-12 text-brand-blue/20" />
                            <span className="mt-2 text-sm font-bold text-brand-blue/40 uppercase tracking-widest">Upload Profile</span>
                        </div>
                    </section>

                    <Button type="submit" className="w-full text-xl py-5 rounded-2xl">
                        2.8 Register Button
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default OrganizationRegistration;
