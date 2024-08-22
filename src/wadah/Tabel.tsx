import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Article {
  id: number;
  title: string;
  author: string;
  content: string;
  email: string;
}

function Tabel({
  article,
  onDelete,
  onEdit,
}: {
  article: Article[];
  onDelete: (id: number) => void;
  onEdit: (data: Article) => void;
}) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter articles based on search term
  const filteredArticles = article.filter(
    (arti) =>
      arti.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      arti.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      arti.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      arti.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = pageIndex * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredArticles.slice(startIndex, endIndex);

  return (
    <>
      <section className="mx-auto container">
        <section id="search-bar" className="py-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </section>

        <section id="tabel">
          <Table className="">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((arti: Article) => (
                <TableRow key={arti.id}>
                  <TableCell>{arti.id}</TableCell>
                  <TableCell>{arti.title}</TableCell>
                  <TableCell>{arti.author}</TableCell>
                  <TableCell>{arti.content}</TableCell>
                  <TableCell>{arti.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      className="bg-blue-600 text-white"
                      onClick={() => onEdit(arti)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-red-600 text-white"
                      onClick={() => onDelete(arti.id)}
                    >
                      Delete{" "}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        <section id="pagination">
          <div className="flex items-center justify-between space-x-2 py-4">
            <div>
              <label htmlFor="pageSize" className="mr-2 font-medium">
                Show entries:
              </label>
              <select
                id="pageSize"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPageIndex(0);
                }}
                className="p-2 border rounded font-medium"
              >
                {[5, 10, 20, 30, 40, 50].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <Button
                variant="outline"
                onClick={() => {
                  setPageIndex((prevIndex) => prevIndex - 1);
                }}
                disabled={pageIndex === 0}
              >
                Previous
              </Button>
              <span className="mx-2">
                Page <strong>{pageIndex + 1}</strong> of{" "}
                {Math.ceil(filteredArticles.length / pageSize)}
              </span>
              <Button
                variant="outline"
                onClick={() => {
                  setPageIndex((prevIndex) => prevIndex + 1);
                }}
                disabled={endIndex >= filteredArticles.length}
              >
                Next
              </Button>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default Tabel;
