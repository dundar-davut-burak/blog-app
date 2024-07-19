"use client"
import { ErrorNotification, SuccesssNotification } from '@/components/notifications';
import { AppContext } from '@/context/appContext';
import { useContext } from 'react';

export default function PostForm({ handleSubmit, refForm, formTitle, title, description, content, category, tags, image, published, buttonValue, isRequired }) {

    let { showSuccessNotification, showErrorNotification } = useContext(AppContext);

    return (
        <form className="border rounded-xl shadow-sm" method="POST" onSubmit={handleSubmit} ref={refForm}>
            {/* Notifications */}
            {showSuccessNotification && <SuccesssNotification />}
            {showErrorNotification && <ErrorNotification />}
            {/* Admin New Post Form Title */}
            <div className="flex flex-col text-center w-full mt-12 -m-y-4">
                <h1 className="sm:text-3xl text-2xl font-medium title-font my-3 text-indigo-600">
                    {formTitle}
                </h1>
            </div>
            {/* Post Form */}
            <div className="flex flex-col px-6 py-4">
                <div className='my-3'>
                    <label htmlFor="title" className="block text-sm mb-2">Başlık</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        defaultValue={title}
                        className="py-3 px-4 block w-full ring-1 ring-gray-300 rounded-lg text-sm outline-none focus:ring-indigo-500 focus:ring-2"
                        placeholder="Lütfen başlık giriniz"
                        title='Lütfen başlık giriniz'
                        maxLength={120}
                        pattern="[a-zA-ZöçıİğüÖÇĞÜşŞ0-9.,!?:' ]+"
                        required
                    />
                    <p className="text-xs text-gray-500 mt-2">Max. 100 karakter</p>
                </div>
                <div className='my-3'>
                    <label htmlFor="description" className="block text-sm mb-2">Açıklama (description for SEO)</label>
                    <textarea
                        id="description"
                        name="description"
                        defaultValue={description}
                        rows={3}
                        className="py-3 px-4 block w-full ring-1 ring-gray-300 rounded-lg text-sm outline-none focus:ring-indigo-500 focus:ring-2"
                        placeholder="Lütfen açıklama giriniz. Max. 300 kelime"
                        title='Lütfen açıklama giriniz. Max. 300 kelime'
                        maxLength={500}
                        pattern="[a-zA-ZöçıİğüÖÇĞÜşŞ0-9.,!?:' ]+"
                        required
                    >
                    </textarea>
                    <p className="text-xs text-gray-500 mt-2">Max. 500 kelime</p>
                </div>
                <div className='my-3'>
                    <label htmlFor="content" className="block text-sm mb-2">İçerik</label>
                    <textarea
                        id="content"
                        name="content"
                        defaultValue={content}
                        rows={20}
                        className="py-3 px-4 block w-full ring-1 ring-gray-300 rounded-lg text-sm outline-none focus:ring-indigo-500 focus:ring-2"
                        placeholder="Lütfen içerik giriniz"
                        title='Lütfen içerik giriniz'
                        minLength={500}
                        maxLength={5000}
                        pattern="[a-zA-ZöçıİğüÖÇĞÜşŞ0-9.,!?:' ]+"
                        required
                    >
                    </textarea>
                    <p className="text-xs text-gray-500 mt-2">Min. 500 karakter, Max. 5000 karakter</p>
                </div>
                <div className="my-3">
                    <label htmlFor="category" className="block text-sm mb-2">Kategori</label>
                    <select
                        id="category"
                        name="category"
                        defaultValue={category}
                        className="py-3 px-4 block w-full ring-1 ring-gray-300 rounded-lg text-sm outline-none focus:ring-indigo-500 focus:ring-2"
                        title="Kategori seçiniz"
                        required
                    >
                        <option value="default" disabled>Seçiniz</option>
                        <option value="Kültür ve Sanat">Kültür ve Sanat</option>
                        <option value="Kişisel Gelişim">Kişisel Gelişim</option>
                        <option value="Teknoloji">Teknoloji</option>
                        <option value="Diğer">Diğer</option>
                    </select>
                </div>
                <div className="my-3">
                    <label htmlFor="tags" className="block text-sm mb-2">Etiketler (keywords for SEO)</label>
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        defaultValue={tags}
                        className="py-3 px-4 block w-full ring-1 ring-gray-300 rounded-lg text-sm outline-none focus:ring-indigo-500 focus:ring-2"
                        placeholder="Etiketler (virgül ile ayırın)"
                        title="Etiketler (virgül ile ayırın)"
                        minLength={2}
                        maxLength={100}
                        pattern="[a-zA-ZöçıİğüÖÇĞÜşŞ0-9, ]+"
                        required
                    />
                    <p className="text-xs text-gray-500 mt-2">Max. 100 karakter. Virgül den sonra boşluk bırakmayın.</p>
                </div>
                <div className="my-3">
                    <label htmlFor="image" className="block text-sm mb-2">Resim</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        defaultValue={image}
                        className="py-3 px-4 block w-full ring-1 ring-gray-300 rounded-lg text-sm outline-none focus:ring-indigo-500 focus:ring-2"
                        placeholder="Gönderinizin için resim dosyası yükleyiniz"
                        title='Gönderinizin için resim dosyası yükleyiniz'
                        accept="image/*"
                        required={isRequired}
                    />
                    <p className="text-xs text-gray-500 mt-2">Max. 5mb</p>
                </div>
                <div className='my-3 flex items-center'>
                    <label htmlFor="published" className="text-sm mx-2">Yayına alınsın mı ?</label>
                    <input
                        id="published"
                        name="published"
                        defaultValue={published}
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-indigo-600"
                    />
                </div>
                <div className="p-2 my-4 w-full">
                    <button
                        type="submit"
                        className="w-full text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                    >
                        {buttonValue}
                    </button>
                </div>
            </div>
        </form>
    )
}