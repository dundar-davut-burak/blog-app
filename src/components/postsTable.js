"use client";
import Link from "next/link";
import { collection, deleteDoc, getDocs, doc, query, orderBy } from "firebase/firestore";
import { db } from "@/database/firebase";
import { useEffect, useState } from "react";
import { SuccesssNotification } from "./notifications";
import { ErrorNotification } from "./notifications";
import { useRouter } from "next/navigation";

export default function PostsTable() {

  const navigate = useRouter();
  const [value, setValue] = useState('');
  const [docs, setDocs] = useState([]);
  //#
  const [currentPage, setCurrentPage] = useState(1);
  const nbPerPage = 10;
  const lastIndex = currentPage * nbPerPage;
  const startIndex = lastIndex - nbPerPage;
  const numberOfPages = Math.ceil(docs.length / nbPerPage);
  const records = docs.slice(startIndex, lastIndex);
  //#
  const filtereDocs = records.filter((doc) => {
    if (value == '') {
      return doc
    } else if (doc.title.toLowerCase().includes(value.toLowerCase() || doc.category.toLowerCase().includes(value.toLowerCase()))) {
      return doc
    }
  })
  //#
  const draftDocs = records.filter((doc) => {
    if (doc.published == false) {
      return doc
    }
  })
  //#
  const [isDataReady, setIsDataReady] = useState(false);
  const [showDraft, setShowDraft] = useState(false);
  const [showSuccessNatification, setShowSuccessNatification] = useState(false);
  const [showErrorNatification, setShowErrorNatification] = useState(false);

  //Delete article function
  const deleteArticle = (id) => {
    const docRef = doc(db, "posts", id);

    if (confirm("Silmek istediğinize emin misiniz?") == true) {
      deleteDoc(docRef)
        .then(() => {
          setShowSuccessNatification(true);
          setTimeout(() => {
            navigate.refresh();
          }, 2000);
        })
        .catch(() => {
          setShowErrorNatification(true);
        });
    }
  };
  //Getting posts datas from firebase
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(query(collection(db, "posts"), orderBy("date")));
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocs(data);
      setIsDataReady(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  //#
  useEffect(() => {
    fetchData();
  }, []);
  //Pagination functions
  function nextPage() {
    if (currentPage != numberOfPages) {
      setCurrentPage(prev => prev + 1)
    }
  }
  function prevPage() {
    if (currentPage != 1) {
      setCurrentPage(prev => prev - 1)
    }
  }

  const td = (showDraft) => {
    if (showDraft) {
      return draftDocs
    } else {
      return filtereDocs
    }
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Gönderiler
                </h2>
                <p className="text-sm text-gray-600">
                  Gönderi oluştur, düzenle veya sil.
                </p>
              </div>

              <div className="flex items-center gap-x-2">
                <div className="flex items-center gap-x-2">
                  <label htmlFor="search" className="sr-only">Search</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="search"
                      name="search"
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value);
                      }}
                      className="py-2 px-3 ps-11 block w-full outline-none border border-gray-200 rounded-lg text-sm focus:border-gray-400"
                      placeholder="Başlığa veya kategoriye göre gönderi Ara"
                      disabled={showDraft}
                    />
                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
                      <svg
                        className="flex-shrink-0 size-4 text-gray-400 dark:text-neutral-500"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="inline-flex gap-x-2">
                  <Link
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700"
                    href="/admin/blog/yeni-gonderi"
                  >
                    <svg
                      className="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                    Yeni Gönderi
                  </Link>
                  <button
                    type="button"
                    className={`${showDraft ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      } py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border`}
                    onClick={() => {
                      setShowDraft(!showDraft);
                    }}
                  >
                    Taslaklar
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full p-3 text-center bg-gray-50">
              {showSuccessNatification && (
                <SuccesssNotification message="Silme işlemi başarılı" />
              )}
              {showErrorNatification && (
                <ErrorNotification message="Silme işlemi başarısız" />
              )}
            </div>{" "}
            <hr />
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="p-4 text-left text-sm leading-6 font-semibold text-gray-900"
                  ></th>

                  <th
                    scope="col"
                    className="p-4 text-left text-sm leading-6 font-semibold text-gray-900"
                  >
                    <div className="flex items-center gap-x-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                        Başlık
                      </span>
                    </div>
                  </th>

                  <th
                    scope="col"
                    className="p-4 text-left text-sm leading-6 font-semibold text-gray-900"
                  >
                    <div className="flex items-center gap-x-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                        Kategori
                      </span>
                    </div>
                  </th>

                  <th
                    scope="col"
                    className="p-4 text-left text-sm leading-6 font-semibold text-gray-900"
                  >
                    <div className="flex items-center gap-x-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                        Oluşturulma Tarihi
                      </span>
                    </div>
                  </th>

                  <th
                    scope="col"
                    className="p-4 text-left text-sm leading-6 font-semibold text-gray-900"
                  >
                    <div className="flex items-center gap-x-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-800">
                        Yayınlandı
                      </span>
                    </div>
                  </th>

                  <th
                    scope="col"
                    className="p-4 text-left text-sm leading-6 font-semibold text-gray-900"
                  ></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                {isDataReady && records.length > 0 &&
                  td(showDraft).map((doc) => {
                    return (
                      <tr key={doc.id}>
                        <td className="p-4 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"></td>
                        <td className="p-4 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          <span className="block text-sm font-semibold text-gray-800">
                            {doc.title}
                          </span>
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          <span className="block text-sm text-gray-500">
                            {doc.category}
                          </span>
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          <span className="text-sm text-gray-500">
                            {doc.date}
                          </span>
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          <span className="text-sm text-gray-500">
                            {doc.published ? "Evet" : "Hayır"}
                          </span>
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                          <div className="flex items-center gap-x-3">
                            <Link
                              className="inline-flex items-center gap-x-1 text-sm text-white bg-yellow-500 p-1.5 rounded-md shadow-sm decoration-2 hover:bg-yellow-600 font-medium"
                              href={`/admin/blog/${doc.id}`}
                            >
                              Düzenle
                            </Link>
                            <button
                              type="button"
                              className="inline-flex items-center gap-x-1 text-sm text-white bg-red-500 p-1.5 rounded-md shadow-sm decoration-2 hover:bg-red-600 font-medium"
                              onClick={() => {
                                deleteArticle(doc.id);
                              }}
                            >
                              Sil
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
            <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-600">
                  Gönderi Sayısı:{" "}
                  <span
                    className={`font-semibold ${docs.length == 0
                      ? "text-red-600 text-lg"
                      : "text-green-600"
                      }`}
                  >
                    {docs.length}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-x-2">
                <span className="text-sm text-gray-600">Şuan {currentPage}. sayfadasınız</span>
                <button
                  type="button"
                  className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50"
                  disabled={currentPage === 1}
                  onClick={() => prevPage()}
                >
                  <svg
                    className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  Önceki
                </button>
                <button
                  type="button"
                  className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50"
                  onClick={() => nextPage()}
                >
                  Sonraki
                  <svg className="flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
