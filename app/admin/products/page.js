'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaEdit, FaTrash } from 'react-icons/fa';

const schema = yup.object().shape({
  name: yup.string().required('Product name is required'),
  description: yup.string().required('Description is required'),
  price: yup
    .number()
    .required('Price is required')
    .positive('Price must be positive'),
  category: yup.string().required('Category is required'),
  stock: yup
    .number()
    .required('Stock is required')
    .integer('Stock must be an integer')
    .min(1, 'Stock must be at least 1'),
  image: yup
    .mixed()
    .test(
      'fileSize',
      'File size is too large',
      (value) => !value || (value && value.size <= 2000000)
    )
    .test(
      'fileType',
      'Unsupported file format',
      (value) =>
        !value ||
        (value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type))
    )
    .required('Product image is required'),
});

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const limit = 1;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        `/api/products?page=${currentPage}&limit=${limit}`
      );
      const data = await res.json();
      setProducts(data.products);
      setTotalPages(data.totalPages);
    };

    fetchProducts();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded ${
            i === currentPage
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-black'
          }`}>
          {i}
        </button>
      );
    }
    return pages;
  };

  const confirmDeleteProduct = (id) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
  };

  const deleteProduct = async () => {
    await fetch(`/api/products?id=${productToDelete}`, { method: 'DELETE' });
    setProducts(products.filter((product) => product.id !== productToDelete));
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setImageBase64(null);
    setSelectedProduct(null);
    reset();
  };

  const onSubmit = async (data) => {
    try {
      const productData = { ...data, imageUrl: imageBase64 };
      const res = await fetch(isEditing ? `/api/products` : `/api/products`, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          isEditing ? { ...productData, id: selectedProduct.id } : productData
        ),
      });
      const newProduct = await res.json();
      setProducts(
        isEditing
          ? products.map((p) => (p.id === newProduct.id ? newProduct : p))
          : [...products, newProduct]
      );
      toggleModal();
      reset();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEditClick = (product) => {
    setIsEditing(true);
    setSelectedProduct(product);
    setImageBase64(product.imageUrl);
    reset(product);
    setIsModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
      setValue('image', file);
    }
  };

  return (
    <div>
      <h1 className='text-2xl text-black font-bold mb-4'>Products</h1>
      <button
        onClick={() => {
          setIsEditing(false);
          toggleModal();
        }}
        className='mb-4 float-end bg-blue-500 text-white px-4 py-2 rounded-lg'>
        Add New Product
      </button>
      <table className='min-w-full bg-white shadow-lg rounded-lg overflow-hidden'>
        <thead>
          <tr>
            <th className='p-3 text-left text-black'>Image</th>
            <th className='p-3 text-left text-black'>Name</th>
            <th className='p-3 text-left text-black'>Price</th>
            <th className='p-3 text-left text-black'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className='p-3 '>
                {product.imageUrl && (
                  <img
                    src={`${product.imageUrl}`}
                    alt={product.name}
                    className='w-20 h-20 border object-cover rounded-3xl'
                  />
                )}
              </td>
              <td className='p-3 text-[#5b5252]'>{product.name}</td>
              <td className='p-3 text-[#5b5252]'>${product.price}</td>
              <td className='p-3 text-[#5b5252]'>
                <button
                  onClick={() => handleEditClick(product)}
                  className='text-blue-500 hover:text-blue-600 mr-2'
                  title='Edit'>
                  <FaEdit size={22} />
                </button>
                <button
                  onClick={() => confirmDeleteProduct(product.id)}
                  className='text-red-500 hover:text-red-600'
                  title='Delete'>
                  <FaTrash size={22} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex justify-center items-center mt-4 space-x-2'>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className='px-4 py-2 bg-gray-300 text-black rounded-md disabled:opacity-50'>
          Previous
        </button>

        {renderPaginationButtons()}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className='px-4 py-2 bg-gray-300 text-black rounded-md disabled:opacity-50'>
          Next
        </button>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
            <h2 className='text-xl text-black font-bold mb-4'>
              {isEditing ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type='text'
                placeholder='Product Name'
                {...register('name')}
                className='w-full p-2 text-[#5b5252] border rounded mb-2'
              />
              {errors.name && (
                <p className='text-red-500 text-sm'>{errors.name.message}</p>
              )}
              <input
                type='text'
                placeholder='Description'
                {...register('description')}
                className='w-full p-2 border text-[#5b5252] rounded mb-2'
              />
              {errors.description && (
                <p className='text-red-500 text-sm'>
                  {errors.description.message}
                </p>
              )}
              <input
                type='number'
                placeholder='Price'
                {...register('price')}
                className='w-full p-2 border text-[#5b5252] rounded mb-2'
              />
              {errors.price && (
                <p className='text-red-500 text-sm'>{errors.price.message}</p>
              )}
              <input
                type='text'
                placeholder='Category'
                {...register('category')}
                className='w-full p-2 text-[#5b5252] border rounded mb-2'
              />
              {errors.category && (
                <p className='text-red-500 text-sm'>
                  {errors.category.message}
                </p>
              )}
              <input
                type='number'
                placeholder='Stock'
                {...register('stock')}
                className='w-full p-2 border text-[#5b5252] rounded mb-2'
              />
              {errors.stock && (
                <p className='text-red-500 text-sm'>{errors.stock.message}</p>
              )}
              <input
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                className='w-full p-2 border text-[#5b5252] rounded mb-4'
              />
              {errors.image && (
                <p className='text-red-500 text-sm'>{errors.image.message}</p>
              )}
              {imageBase64 && (
                <img
                  src={imageBase64}
                  alt='Preview'
                  className='mb-2 w-full h-32 object-cover rounded'
                />
              )}
              <div className='flex justify-end space-x-2'>
                <button
                  type='button'
                  onClick={toggleModal}
                  className='px-4 py-2 bg-gray-500 text-white rounded-lg'>
                  Cancel
                </button>
                <button
                  type='submit'
                  className='px-4 py-2 bg-blue-500 text-white rounded-lg'>
                  {isEditing ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center'>
            <h2 className='text-xl text-black font-bold mb-4'>
              Confirm Deletion
            </h2>
            <p className='text-gray-700 mb-6'>
              Are you sure you want to delete this product?
            </p>
            <div className='flex justify-center space-x-4'>
              <button
                onClick={() => setShowDeleteModal(false)}
                className='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600'>
                Cancel
              </button>
              <button
                onClick={deleteProduct}
                className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600'>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
