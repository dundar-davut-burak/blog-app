"use client";
import { collection, deleteDoc, getDocs, doc, query, orderBy } from "firebase/firestore";
import { db } from "@/database/firebase";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PostTable from "@/components/postTable";
import { AppContext } from "@/context/appContext";

export default function Table() {
  // Router
  const navigate = useRouter();
  //Search
  const [value, setValue] = useState('');
  //Posts
  const [docs, setDocs] = useState([]);
  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const nbPerPage = 10;
  const lastIndex = currentPage * nbPerPage;
  const startIndex = lastIndex - nbPerPage;
  const numberOfPages = Math.ceil(docs.length / nbPerPage);
  const records = docs.slice(startIndex, lastIndex);
  //Search
  const filtereDocs = records.filter((doc) => {
    if (value == '') {
      return doc
    } else if (doc.title.toLowerCase().includes(value.toLowerCase()) || doc.category.toLowerCase().includes(value.toLowerCase())) {
      return doc
    }
  })
  //Draft
  const draftDocs = records.filter((doc) => {
    if (doc.published == false) {
      return doc
    }
  })

  //Check Data Ready
  const [isDataReady, setIsDataReady] = useState(false);
  const [showDraft, setShowDraft] = useState(false);
  // Notifications
  let { setShowSuccessNotification, setShowErrorNotification, setMessageNotification } = useContext(AppContext);

  //Delete article function
  const deleteArticle = (id) => {
    // Get Document Reference
    const docRef = doc(db, "posts", id);
    //Confirm
    if (confirm("Silmek istediğinize emin misiniz?") == true) {
      deleteDoc(docRef)
        .then(() => {
          setShowSuccessNotification(true);
          setMessageNotification("Gönderi silindi");
          //Refresh page
          setTimeout(() => {
            navigate.refresh();
          }, 1000);
        })
        .catch(() => {
          setShowErrorNotification(true);
          setMessageNotification("Gönderi silinmedi");
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
  //Initial fetch
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
  //Show draft posts
  const td = (showDraft) => {
    if (showDraft) {
      return draftDocs
    } else {
      return filtereDocs
    }
  }

  return (
    <PostTable
      value={value}
      setValue={setValue}
      showDraft={showDraft}
      setShowDraft={setShowDraft}
      createPostURL={"/admin/blog/yeni-gonderi"}
      isDataReady={isDataReady}
      records={records}
      td={td}
      deleteArticle={deleteArticle}      
      editPostURL={`/admin/blog`}
      docsLength={docs.length}
      currentPage={currentPage}
      nextPage={nextPage}
      prevPage={prevPage}
    />
  );
}
