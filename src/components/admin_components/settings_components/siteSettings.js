"use client"
import React, { useState, useEffect, useRef, useContext } from 'react';
import { db, storage } from '@/database/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from "firebase/storage";
import { SuccesssNotification } from '@/components/notifications';
import { useRouter } from 'next/navigation';
import { AppContext } from '@/context/appContext';

export default function SiteSettings() {
    // using Form Ref for get values
    const form = useRef();
    // Router
    const navigate = useRouter();
    // Notifications states
    let { showSuccessNotification, setShowSuccessNotification, showErrorNotification, setShowErrorNotification, setMessageNotification } = useContext(AppContext)
    // Site Settings
    const [siteTitle, setSiteTitle] = useState('');
    const [siteDescription, setSiteDescription] = useState('');
    const [siteKeywords, setSiteKeywords] = useState('');
    const [siteInstagramUrl, setSiteInstagramUrl] = useState('');
    const [siteTwitterUrl, setSiteTwitterUrl] = useState('');
    const [siteLinkedinUrl, setSiteLinkedinUrl] = useState('');
    // Get Site Settings
    const settingsRef = doc(db, 'siteSettings', 'settings');
    // Get Site Settings
    useEffect(() => {
        const fetchSettings = async () => {
            const settingsRef = collection(db, 'siteSettings');
            const settingsSnapshot = await getDocs(settingsRef);
            if (!settingsSnapshot.empty) {
                const settingsData = settingsSnapshot.docs[0].data();
                setSiteTitle(settingsData.siteTitle || '');
                setSiteDescription(settingsData.siteDescription || '');
                setSiteKeywords(settingsData.siteKeywords || '');
                setSiteInstagramUrl(settingsData.siteInstagramUrl || '');
                setSiteTwitterUrl(settingsData.siteTwitterUrl || '');
                setSiteLinkedinUrl(settingsData.siteLinkedinUrl || '');
            }
        };
        fetchSettings();
    }, []);

    const handleSaveSettings = async (e) => {

        e.preventDefault();
        // Get Form Data
        const formData = new FormData(form.current);
        // Get Form Values
        const siteTitle = formData.get('siteTitle');
        const siteDescription = formData.get('siteDescription');
        const siteKeywords = formData.get('siteKeywords').split(',');
        const siteInstagramUrl = formData.get('siteInstagramUrl');
        const siteTwitterUrl = formData.get('siteTwitterUrl');
        const siteLinkedinUrl = formData.get('siteLinkedinUrl');
        const siteLogo = formData.get('siteLogo');
        const siteFavicon = formData.get('siteFavicon');
        // Create Storage References
        const logoStorageRef = ref(storage, `/site-images/${siteLogo.name}`);
        const iconStorageRef = ref(storage, `/site-images/${siteFavicon.name}`);

        // Update Site Settings
        try {
            await updateDoc(settingsRef, {
                siteTitle: siteTitle,
                siteDescription: siteDescription,
                siteKeywords: siteKeywords,
                siteInstagramUrl: siteInstagramUrl,
                siteTwitterUrl: siteTwitterUrl,
                siteLinkedinUrl: siteLinkedinUrl,
                siteLogo: logoStorageRef.name === '' ? siteLogo : logoStorageRef.name,
                siteFavicon: iconStorageRef.name === '' ? siteFavicon : iconStorageRef.name,
            }).catch((error) => {
                setShowErrorNotification(true);
                setMessageNotification('Ayarlar güncellenemedi. Lütfen tekrar deneyin.' + error);
            });
            // get image from form and create storage reference
            if (siteLogo !== null || siteLogo !== undefined || siteLogo !== '') {
                await uploadBytes(logoStorageRef, siteLogo).catch((error) => {
                    setShowErrorNotification(true);
                    setMessageNotification('Logo yükleme işlemi başarısız oldu. Lütfen tekrar deneyin.' + error);
                });
            }
            if (siteFavicon !== null || siteFavicon !== undefined || siteFavicon !== '') {
                await uploadBytes(iconStorageRef, siteFavicon).catch((error) => {
                    setShowErrorNotification(true);
                    setMessageNotification('Favicon yükleme işlemi başarısız oldu. Lütfen tekrar deneyin' + error);
                });
            }
            // Show Success Message
            setShowSuccessNotification(true);
            setMessageNotification('Ayarlar başarıyla güncellendi.');
            // Redirect to Admin Dashboard
            setTimeout(() => {
                navigate.refresh();
            }, 2000);
        } catch (error) {
            // Show Error Message
            setShowErrorNotification(true);
            setMessageNotification('Ayarlar güncellenemedi.');
        }
    };

    return (
        <form ref={form} method='POST' onSubmit={handleSaveSettings} className="container mx-auto p-4 mt-10">
            {/* Admin Site Settings Title */}
            <h1 className="text-2xl text-center text-indigo-600 font-bold mb-4">Site Ayarları</h1>
            {/* Site Settings Form */}
            <div className="grid grid-cols-1 gap-4">
                <div className="col-span-full">
                    <label htmlFor="siteTitle" className="block text-sm font-medium text-indigo-500 leading-6">
                        Site Adı/Başlığı
                    </label>
                    <input
                        type="text"
                        id="siteTitle"
                        name='siteTitle'
                        className="w-full block p-3 outline-none border border-1 border-gray-300 rounded-md"
                        defaultValue={siteTitle}
                        required
                    />
                    <p className='text-sm text-gray-400 mt-2'>Sitenizin adını veya başlığını girin.</p>
                </div>
                <div className="col-span-full">
                    <label htmlFor="siteDescription" className="block text-sm font-medium text-indigo-500 leading-6">
                        Site Açıklaması
                    </label>
                    <textarea
                        type="text"
                        id="siteDescription"
                        name='siteDescription'
                        className="w-full block p-3 outline-none border border-1 border-gray-300 rounded-md"
                        rows={4}
                        defaultValue={siteDescription}
                        required
                    />
                    <p className='text-sm text-gray-400 mt-2'>Sitenizin açıklamasını girin.</p>
                </div>
                <div className="col-span-full">
                    <label htmlFor="siteKeywords" className="block text-sm font-medium text-indigo-500 leading-6">
                        Site için Anahtar Kelimeler
                    </label>
                    <input
                        type="text"
                        id="siteKeywords"
                        name='siteKeywords'
                        className="w-full block p-3 outline-none border border-1 border-gray-300 rounded-md"
                        defaultValue={siteKeywords}
                        required
                    />
                    <p className='text-sm text-gray-400 mt-2'>Sitenizin anahtar kelimelerini virgül ile ayırarak girin.</p>
                </div>
                <div className="col-span-full">
                    <label htmlFor="siteLogo" className="block text-sm font-medium text-indigo-500 leading-6">
                        Site Logosu
                    </label>
                    <input
                        type="file"
                        id="siteLogo"
                        name='siteLogo'
                        className="w-full block p-3 outline-none border border-1 border-gray-300 rounded-md"
                        accept='image/*'
                    />
                    <p className='text-sm text-gray-400 mt-2'>Sitenizin logosu seçin.</p>
                </div>
                <div className="col-span-full">
                    <label htmlFor="siteFavicon" className="block text-sm font-medium text-indigo-500 leading-6">
                        Site Faviconu
                    </label>
                    <input
                        type="file"
                        id="siteFavicon"
                        name='siteFavicon'
                        className="w-full block p-3 outline-none border border-1 border-gray-300 rounded-md"
                        accept='image/*'
                    />
                    <p className='text-sm text-gray-400 mt-2'>Sitenizin faviconu seçin.</p>
                </div>
                <div className="col-span-full">
                    <label htmlFor="siteInstagramUrl" className="block text-sm font-medium text-indigo-500 leading-6">
                        Instagram URL
                    </label>
                    <input
                        type="url"
                        id="siteInstagramUrl"
                        name='siteInstagramUrl'
                        className="w-full block p-3 outline-none border border-1 border-gray-300 rounded-md"
                        defaultValue={siteInstagramUrl}
                        required
                    />
                    <p className='text-sm text-gray-400 mt-2'>Sitenizin Instagram sayfasının url adresini girin.</p>
                </div>
                <div className="col-span-full">
                    <label htmlFor="siteTwitterUrl" className="block text-sm font-medium text-indigo-500 leading-6">
                        Twitter URL
                    </label>
                    <input
                        type="url"
                        id="siteTwitterUrl"
                        name='siteTwitterUrl'
                        className="w-full block p-3 outline-none border border-1 border-gray-300 rounded-md"
                        defaultValue={siteTwitterUrl}
                        required
                    />
                    <p className='text-sm text-gray-400 mt-2'>Sitenizin Instagram sayfasının url adresini girin.</p>
                </div>
                <div className="col-span-full">
                    <label htmlFor="siteLinkedinUrl" className="block text-sm font-medium text-indigo-500 leading-6">
                        Linkedin URL
                    </label>
                    <input
                        type="url"
                        id="siteLinkedinUrl"
                        name='siteLinkedinUrl'
                        className="w-full block p-3 outline-none border border-1 border-gray-300 rounded-md"
                        defaultValue={siteLinkedinUrl}
                        required
                    />
                    <p className='text-sm text-gray-400 mt-2'>Sitenizin Instagram sayfasının url adresini girin.</p>
                </div>
            </div>
            <button
                className="my-4 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-60"
                type='submit'
            >
                Ayarları Kaydet
            </button>
            {/* Notifications */}
            <div className='p-4 bg-gray-50'>
                {showSuccessNotification && <SuccesssNotification />}
                {showErrorNotification && <ErrorNotification />}
            </div>
        </form>
    );
};