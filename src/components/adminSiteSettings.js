"use client"
import React, { useState, useEffect } from 'react';
import { db } from '@/database/firebase';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';

const AdminSiteSettings = () => {
    const [siteTitle, setSiteTitle] = useState('');
    const [siteDescription, setSiteDescription] = useState('');
    const [siteLogo, setSiteLogo] = useState(null);
    const [siteFavicon, setSiteFavicon] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            const settingsRef = collection(db, 'siteSettings');
            const settingsSnapshot = await getDocs(settingsRef);
            if (!settingsSnapshot.empty) {
                const settingsData = settingsSnapshot.docs[0].data();
                setSiteTitle(settingsData.siteTitle || '');
                setSiteDescription(settingsData.siteDescription || '');
                setSiteLogo(settingsData.siteLogo || null);
                setSiteFavicon(settingsData.siteFavicon || null);
            }
        };
        fetchSettings();
    }, []);

    const handleSaveSettings = async () => {
        try {
            await setDoc(doc(db, 'siteSettings', 'settings'), {
                siteTitle,
                siteDescription,
                siteLogo,
                siteFavicon,
            });
            console.log('Settings saved successfully!');
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    };

    return (
        <form method='POST' onSubmit={handleSaveSettings} className="container mx-auto p-4">
            <h1 className="text-2xl text-center text-indigo-600 font-bold mb-4">Site Ayarları</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-full">
                    <label htmlFor="siteTitle" className="block text-sm font-medium text-indigo-500 leading-6">
                        Site Adı/Başlığı
                    </label>
                    <input
                        type="text"
                        id="siteTitle"
                        className="w-full block p-3 outline-none border border-1 border-gray-300 rounded-md"
                        value={siteTitle}
                        onChange={(e) => setSiteTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="col-span-full">
                    <label htmlFor="siteDescription" className="block text-sm font-medium text-indigo-500 leading-6">
                        Site Açıklaması
                    </label>
                    <textarea
                        type="text"
                        id="siteDescription"
                        className="w-full block p-3 outline-none border border-1 border-gray-300 rounded-md"
                        value={siteDescription}
                        onChange={(e) => setSiteDescription(e.target.value)}
                        rows={4}
                        required
                    />
                </div>
                <div className="col-span-full">
                    <label htmlFor="siteLogo" className="block text-sm font-medium text-indigo-500 leading-6">
                        Site Logosu
                    </label>
                    <input
                        type="file"
                        id="siteLogo"
                        className="w-full block p-3 outline-none border border-1 border-gray-300 rounded-md"
                        onChange={(e) => setSiteLogo(e.target.files[0])}
                        required
                    />
                </div>
                <div className="col-span-full">
                    <label htmlFor="siteFavicon" className="block text-sm font-medium text-indigo-500 leading-6">
                        Site Faviconu
                    </label>
                    <input
                        type="file"
                        id="siteFavicon"
                        className="w-full block p-3 outline-none border border-1 border-gray-300 rounded-md"
                        onChange={(e) => setSiteFavicon(e.target.files[0])}
                        required
                    />
                </div>
            </div>
            <button
                className="my-4 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-60"
                type='submit'
            >
                Ayarları Kaydet
            </button>
        </form>
    );
};

export default AdminSiteSettings;
