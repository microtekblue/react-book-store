'use client';
import React, { Fragment } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { removeBook } from '@/app/redux/bookSlice';
import { getBooks } from '@/app/redux/bookSlice';
import Modal from '@/app/components/Modal';

export default function Home() {
  const books = useAppSelector(getBooks);
  const dispatch = useAppDispatch();
  const [showAddBookModal, setShowAddBookModal] = React.useState(false);
  const [showEditBookModal, setEditAddBookModal] = React.useState({
    edit: false,
    index: 0,
  });
  const bookItems = books.map((book, index) => (
    <Fragment key={book.id}>
      <li>
        <p>
          <b>Title:</b> {book.title}
        </p>
        <p>
          <b>Price:</b> ${book.price}
        </p>
        <p>
          <b>Category:</b> {book.category}
        </p>
        <p>
          <b>Description:</b> {book.description}
        </p>
        <p>
          <span className="hover:underline mr-5 cursor-pointer text-blue-600">
            <a
              onClick={() => setEditAddBookModal({ edit: true, index: index })}
            >
              Edit
            </a>
          </span>
          <span className="hover:underline cursor-pointer text-red-700">
            <a onClick={() => dispatch(removeBook(book))}>Delete</a>
          </span>
        </p>
      </li>
    </Fragment>
  ));
  return (
    <main className="flex flex-col items-center justify-between">
      <h1 className="text-3xl m-5">Book Store</h1>
      <div className="w-full bg-center bg-cover h-60 bg-[url('assets/images/books.jpg')]"></div>
      <div className="flex-col min-h-screen max-w-5xl w-full items-center font-mono text-sm flex p-8">
        <button
          className="bg-blue-700 text-white active:bg-blue-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-5"
          type="button"
          onClick={() => setShowAddBookModal(true)}
        >
          Add a Book
        </button>
        <ul className="[&>li_p]:mt-2 [&>li]:py-4 w-full divide-y divide-gray-400">
          {bookItems}
        </ul>
        {showAddBookModal || showEditBookModal.edit ? (
          <Modal
            data={showEditBookModal.edit ? books[showEditBookModal.index] : ''}
            close={
              showAddBookModal
                ? () => setShowAddBookModal(false)
                : () => setEditAddBookModal({ edit: false, index: 0 })
            }
            modalTitle={showAddBookModal ? 'Add a Book' : 'Edit Book'}
          />
        ) : null}
      </div>
    </main>
  );
}
