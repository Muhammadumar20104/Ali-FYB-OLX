import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedProduct,
  createProductAsync,
  deleteProductAsync,
  fetchProductByIdAsync,
  selectBrands,
  selectCategories,
  selectProductById,
  updateProductAsync,
} from "../../product-list/productSlice";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../../common/Modal";
import { useAlert } from "react-alert";
import { useRef } from "react";

function ProductForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const params = useParams();
  const selectedProduct = useSelector(selectProductById);
  const [openModal, setOpenModal] = useState(null);

  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [previousImages, setPreviousImages] = useState([]);
  const [dataImages, setDataImages] = useState([]);
  const fileInputRef = useRef(null);
  const maxImages = 5;

  const alert = useAlert();
  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    } else {
      dispatch(clearSelectedProduct());
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    if (selectedProduct && params.id) {
      setValue("title", selectedProduct.title);
      setValue("description", selectedProduct.description);
      setValue("price", selectedProduct.price);
      setValue("discountPercentage", selectedProduct.discountPercentage);
      setValue("stock", selectedProduct.stock);
      setValue("category", selectedProduct.category);
      editUser(selectedProduct);
    }
  }, [selectedProduct, params.id, setValue]);

  const handleDelete = () => {
    const product = { ...selectedProduct };
    product.deleted = true;
    dispatch(deleteProductAsync(product));
    
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const selectedImageArray = Array.from(files).slice(
        0,
        maxImages - selectedImages.length
      );
      setSelectedImages(selectedImageArray);

      const imagePreviewArray = selectedImageArray.map((image) =>
        URL.createObjectURL(image)
      );
      setImagePreviews(imagePreviewArray);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDeleteImage = (imageId, old) => {
    const newSelectedImages = selectedImages.filter(
      (image, index) => index !== imageId
    );
    const newImagePreviews = imagePreviews.filter(
      (previewUrl, index) => index !== imageId
    );
    setSelectedImages(newSelectedImages);
    setImagePreviews(newImagePreviews);

    if (old) {
      const del = dataImages.filter((image) => image.id == imageId);
      const set = dataImages.filter((image) => image.id != imageId);
      setDeletedImages([...deletedImages, ...del]);
      setDataImages(set);
    }
  };

  const handlePlusIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const editUser = (user) => {
    setDeletedImages([]);
    setSelectedImages([]);
    setImagePreviews([]);
    if (user) {
      setPreviousImages(user.images);
      setDataImages(user.images);
    } else {
      setPreviousImages([]);
      setDataImages([]);
    }
  };

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          const product = { ...data };

          product.selectedImages = selectedImages;
          product.rating = 0;

          product.price = +product.price;
          product.stock = +product.stock;
          product.discountPercentage = +product.discountPercentage;

          if (params.id) {
            product.id = params.id;
            product.deleteImages = JSON.stringify(deletedImages);
            product.previousImages = JSON.stringify(previousImages);
            product.rating = selectedProduct.rating || 0;
            dispatch(updateProductAsync(product));
            alert.success("Product Updated");
            reset();
          } else {
            dispatch(createProductAsync(product));
            alert.success("Product Created");
            // TODO: these alerts should check if API failed

            reset();
          }
          setSelectedImages([]);
          setDataImages([]);
          setDeletedImages([]);
          setPreviousImages([]);
          setImagePreviews([]);
        })}
      >
        <div className="space-y-12 bg-white p-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Add Product
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {selectedProduct && selectedProduct.deleted && (
                <h2 className="text-red-500 sm:col-span-6">
                  This product is deleted
                </h2>
              )}

              <div className="sm:col-span-6">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("title", {
                        required: "name is required",
                      })}
                      id="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    {...register("description", {
                      required: "description is required",
                    })}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about product.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Brand
                </label>
                <div className="mt-2">
                  <select
                    {...register("brand", {
                      required: "brand is required",
                    })}
                  >
                    <option value="">--choose brand--</option>
                    {brands?.data?.map((brand) => (
                      <option key={brand.value} value={brand.value}>
                        {brand.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <select
                    {...register("category", {
                      required: "category is required",
                    })}
                  >
                    <option value="">--choose category--</option>
                    {categories?.data?.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="number"
                      {...register("price", {
                        required: "price is required",
                        min: 1,
                        max: 10000,
                      })}
                      id="price"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="discountPercentage"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discount Percentage
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="number"
                      {...register("discountPercentage", {
                        required: "discountPercentage is required",
                        min: 0,
                        max: 100,
                      })}
                      id="discountPercentage"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="number"
                      {...register("stock", {
                        required: "stock is required",
                        min: 0,
                      })}
                      id="stock"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 mt-10 w-1/2 bg-gray-100 border-2 border-gray-300 rounded-lg">
              <div>
                <label
                  htmlFor="upload-button"
                  className="eventUploadFile w-100 text-center point p-5"
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="selected-images-container flex justify-center flex-wrap gap-3">
                    {dataImages?.map((item) => (
                      <div
                        key={item?.id}
                        className="selected-image-container relative"
                      >
                        <img
                          src={item?.url}
                          alt={`Selected`}
                          className="selected-image"
                          style={{ width: 100, height: 80 }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            width: 18,
                            height: 21,
                            background: "#fff",
                          }}
                        >
                          <button
                            className="delete-button mb-0"
                            style={{}}
                            onClick={() => handleDeleteImage(item.id, true)}
                          >
                            X
                          </button>
                        </div>
                      </div>
                    ))}
                    {imagePreviews?.map((previewUrl, index) => (
                      <div
                        key={previewUrl}
                        className="selected-image-container relative"
                      >
                        <img
                          src={previewUrl}
                          alt={`Selected`}
                          className="selected-image"
                          style={{ width: 100, height: 80 }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            width: 18,
                            height: 21,
                            background: "#fff",
                          }}
                        >
                          <button
                            className="delete-button mb-0"
                            style={{}}
                            onClick={() => handleDeleteImage(index, false)}
                          >
                            X
                          </button>
                        </div>
                      </div>
                    ))}
                    {selectedImages?.length < maxImages && (
                      <div
                        style={{ width: 90, height: 90 }}
                        className="add-more-icon border-4 cursor-pointer flex justify-center items-center"
                        onClick={handlePlusIconClick}
                      >
                        {/* <BiPlus color="black" className="text-4xl" /> */}
                      </div>
                    )}
                  </div>
                  <h3 className="mt-3 text-xl">Upload your file* here</h3>
                  <h4 className="text-base">
                    *Available format: Jpg, Png, jpeg
                  </h4>
                </label>

                <input
                  type="file"
                  id="upload-button"
                  accept="image/png, image/gif, image/jpeg"
                  className="hidden"
                  multiple
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                />
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Extra{" "}
            </h2>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  By Email
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900"
                      >
                        Comments
                      </label>
                      <p className="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-gray-900"
                      >
                        Candidates
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="offers"
                        className="font-medium text-gray-900"
                      >
                        Offers
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>

          {selectedProduct && !selectedProduct.deleted && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpenModal(true);
              }}
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Delete
            </button>
          )}

          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
      {selectedProduct && (
        <Modal
          title={`Delete ${selectedProduct.title}`}
          message="Are you sure you want to delete this Product ?"
          dangerOption="Delete"
          cancelOption="Cancel"
          dangerAction={handleDelete}
          cancelAction={() => setOpenModal(null)}
          showModal={openModal}
        ></Modal>
      )}
    </>
  );
}

export default ProductForm;
