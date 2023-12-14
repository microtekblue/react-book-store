import React, { useState } from 'react';
import { useAppDispatch } from '@/app/redux/hooks';
import { addBook, updateBook } from '@/app/redux/bookSlice';
import { getId } from '@/app/redux/bookSlice';
export default function Modal(props: any) {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    id: props.data.id || getId,
    title: props.data.title,
    price: props.data.price,
    category: props.data.category,
    description: props.data.description,
  });
  const handleChange = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const [errors, setErrors] = useState({
    title: '',
    price: '',
    category: '',
    description: '',
  });
  const validateValues = (inputValues: any) => {
    if (!inputValues.title) {
      setErrors((errors) => ({
        ...errors,
        title: 'Please enter a book title',
      }));
    } else {
      setErrors((errors) => ({ ...errors, title: '' }));
    }
    if (!inputValues.price) {
      setErrors((errors) => ({
        ...errors,
        price: 'Please enter a book price',
      }));
    } else {
      setErrors((errors) => ({ ...errors, price: '' }));
    }
    if (!inputValues.category || inputValues.category === 'Select') {
      setErrors((errors) => ({
        ...errors,
        category: 'Please select a book category',
      }));
      formData.category = '';
    } else {
      setErrors((errors) => ({ ...errors, category: '' }));
    }
    if (!inputValues.description) {
      setErrors((errors) => ({
        ...errors,
        description: 'Please enter a book description',
      }));
    } else {
      setErrors((errors) => ({ ...errors, description: '' }));
    }
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    validateValues(formData);
    if (
      formData.title &&
      formData.price &&
      formData.category &&
      formData.description
    ) {
      if (props.data.id === formData.id) {
        dispatch(updateBook(formData));
      } else {
        dispatch(addBook(formData));
      }
      props.close(true);
    }
  };
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <form className="w-full" onSubmit={handleSubmit} noValidate>
          <div className="relative mx-auto my-6 w-full max-w-3xl">
            <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
              <div className="flex items-start justify-between rounded-t border-b border-solid p-5 border-blueGray-200">
                <h3 className="text-3xl font-semibold">{props.modalTitle}</h3>
                <button
                  type="button"
                  className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black outline-none focus:outline-none"
                  onClick={() => props.close()}
                >
                  <span className="block h-6 w-6 bg-transparent text-2xl text-black outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              <div className="relative flex-auto p-6">
                <div className="mb-5">
                  <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-bold text-gray-900 dark:text-white"
                  >
                    Book Title
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="title"
                    name="title"
                    defaultValue={props.data.title}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 p-2.5 focus:border-blue-500 focus:ring-blue-500 dark:placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required
                  />
                  {errors.title ? (
                    <p className="text-red-700">{errors.title}</p>
                  ) : (
                    ''
                  )}
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="price"
                    className="mb-2 block text-sm font-bold text-gray-900 dark:text-white"
                  >
                    Book Price
                  </label>
                  <input
                    onChange={handleChange}
                    type="number"
                    id="price"
                    name="price"
                    defaultValue={props.data.price}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 p-2.5 focus:border-blue-500 focus:ring-blue-500 dark:placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required
                  />
                  {errors.price ? (
                    <p className="text-red-700">{errors.price}</p>
                  ) : (
                    ''
                  )}
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-bold text-gray-900 dark:text-white"
                  >
                    Book Category
                  </label>
                  <select
                    onChange={handleChange}
                    id="category"
                    name="category"
                    defaultValue={props.data.category}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 p-2.5 focus:border-blue-500 focus:ring-blue-500 dark:placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required
                  >
                    <option value="Select">Select...</option>
                    <option value="Biography/Memoir">Biography/Memoir</option>
                    <option value="Business and Leadership">
                      Business and Leadership
                    </option>
                    <option value="Classic Literature">
                      Classic Literature
                    </option>
                    <option value="Crime/True Crime">Crime/True Crime</option>
                    <option value="Historical Fiction">
                      Historical Fiction
                    </option>
                    <option value="Mystery/Thriller">Mystery/Thriller</option>
                    <option value="Psychology/Sociology">
                      Psychology/Sociology
                    </option>
                    <option value="Science Fiction/Fantasy">
                      Science Fiction/Fantasy
                    </option>
                    <option value="Science/Popular Science">
                      Science/Popular Science
                    </option>
                    <option value="Self-Help/Personal Development">
                      Self-Help/Personal Development
                    </option>
                  </select>
                  {errors.category ? (
                    <p className="text-red-700">{errors.category}</p>
                  ) : (
                    ''
                  )}
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-bold text-gray-900 dark:text-white"
                  >
                    Book Description
                  </label>
                  <textarea
                    rows={4}
                    onChange={handleChange}
                    id="description"
                    name="description"
                    defaultValue={props.data.description}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 p-2.5 focus:border-blue-500 focus:ring-blue-500 dark:placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required
                  />
                  {errors.description ? (
                    <p className="text-red-700">{errors.description}</p>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div className="flex items-center justify-end rounded-b border-t border-solid p-6 border-blueGray-200">
                <button
                  className="mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear background-transparent focus:outline-none"
                  type="button"
                  onClick={() => props.close()}
                >
                  Close
                </button>
                <button
                  name="submit"
                  className="mr-1 mb-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                  type="submit"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );
}
