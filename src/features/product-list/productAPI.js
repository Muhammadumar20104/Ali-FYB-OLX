import secureLocalStorage from "react-secure-storage";

export function fetchProductById(id) {
  try {
    const token = secureLocalStorage.getItem("token");

    return new Promise(async (resolve) => {
      //TODO: we will not hard-code server URL here
      const response = await fetch("http://localhost:8080/products/" + id, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      resolve({ data });
    });
  } catch (error) {
    console.log(error);
  }
}

export function deleteProductById(id) {
  try {
    const token = secureLocalStorage.getItem("token");
    return new Promise(async (resolve) => {
      //TODO: we will not hard-code server URL here
      const response = await fetch(
        "http://localhost:8080/products/delete/" + id,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      resolve({ data });
    });
  } catch (error) {
    console.log(error);
  }
}

export function createProduct(product) {
  try {
    console.log(product);
    const token = secureLocalStorage.getItem("token");

    const formData = new FormData();

    formData.append("brand", product.brand);
    formData.append("category", product.category);
    formData.append("description", product.description);
    formData.append("discountPercentage", product.discountPercentage);
    formData.append("price", product.price);
    formData.append("rating", product.rating);
    formData.append("stock", product.stock);
    formData.append("title", product.title);

    product.selectedImages.forEach((file) => {
      formData.append(`images`, file);
    });

    return new Promise(async (resolve) => {
      const response = await fetch("http://localhost:8080/products/", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`, // Include the Authorization header with the token
        },
      });
      const data = await response.json();
      resolve({ data });
    });
  } catch (error) {
    console.log(error);
  }
}

export function updateProduct(product) {
  try {
    const token = secureLocalStorage.getItem("token");
    const formData = new FormData();

    formData.append("brand", product.brand);
    formData.append("category", product.category);
    formData.append("description", product.description);
    formData.append("discountPercentage", product.discountPercentage);
    formData.append("price", product.price);
    formData.append("rating", product.rating);
    formData.append("deleteImages", product.deleteImages);
    product.selectedImages.forEach((file) => {
      formData.append(`images`, file);
    });
    formData.append("previousImages", product.previousImages);
    formData.append("stock", product.stock);
    formData.append("title", product.title);
    return new Promise(async (resolve) => {
      const response = await fetch(
        "http://localhost:8080/products/" + product.id,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)
      resolve({ data });
    });
  } catch (error) {
    console.log(error);
  }
}

export function fetchProductsByFilters(filter, sort, pagination, admin) {
  try {
    let queryString = "";
    for (let key in filter) {
      const categoryValues = filter[key];
      if (categoryValues.length) {
        const lastCategoryValue = categoryValues[categoryValues.length - 1];
        queryString += `${key}=${lastCategoryValue}&`;
      }
    }
    for (let key in sort) {
      queryString += `${key}=${sort[key]}&`;
    }
    for (let key in pagination) {
      queryString += `${key}=${pagination[key]}&`;
    }
    if (admin) {
      queryString += `admin=true`;
    }

    return new Promise(async (resolve) => {
      //TODO: we will not hard-code server URL here
      const response = await fetch(
        "http://localhost:8080/products?" + queryString
      );
      const data = await response.json();
      const totalItems = data?.data?.totalDocs;
      resolve({
        data: { products: data?.data?.product, totalItems: +totalItems },
      });
    });
  } catch (error) {
    console.log(error);
  }
}

export function fetchCategories() {
  try {
    const token = secureLocalStorage.getItem("token");

    return new Promise(async (resolve) => {
      const response = await fetch("http://localhost:8080/categories", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      resolve({ data });
    });
  } catch (error) {
    console.log(error);
  }
}

export function fetchBrands() {
  try {
    const token = secureLocalStorage.getItem("token");

    return new Promise(async (resolve) => {
      const response = await fetch("http://localhost:8080/brands", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      resolve({ data });
    });
  } catch (error) {
    console.log(error);
  }
}
