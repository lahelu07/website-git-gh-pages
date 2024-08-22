import { useState, useEffect } from "react";
import Navbar from "./wadah/Navbar";
import axios from "axios";
import Tabel from "./wadah/Tabel";
import Form from "./wadah/Form";

interface Article {
  id: number;
  title: string;
  author: string;
  content: string;
  email: string;
}

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const url = "http://127.0.0.1:8000/api/article";

  const getArticle = async () => {
    const response = await axios.get(url);
    setArticles(response.data);
  };

  const onDelete = (id: number) => {
    axios.delete(`${url}/${id}`).then(() => {
      getArticle();
    });
  };

  const onEdit = (data: Article) => {
    setCurrentArticle(data);
  };

  const onSubmit = async (data: Article) => {
    if (currentArticle) {
      // Update existing article
      await axios.put(`${url}/${data.id}`, data);
    } else {
      // Add new article
      await axios.post(url, data);
    }
    setCurrentArticle(null); // Reset form to "Submit" mode
    getArticle();
  };

  useEffect(() => {
    getArticle();
  }, []);

  // Determine next ID for a new article
  const nextId =
    articles.length > 0 ? Math.max(...articles.map((art) => art.id)) + 1 : 1;

  return (
    <>
      <Navbar />
      <Form
        article={
          currentArticle || {
            id: nextId,
            title: "",
            author: "",
            content: "",
            email: "",
          }
        }
        onSubmit={onSubmit}
        isEditing={currentArticle !== null}
      />
      <Tabel article={articles} onDelete={onDelete} onEdit={onEdit} />
    </>
  );
}

export default App;
