export const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/products");
      if (!response.ok) {
        throw new Error("Error Getting Entities");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
};

export const GetProductById = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error("Error getting entity");
      }
  
      const product = await response.json();
      return product;
  
    } catch (error) {
      throw error;
    }
  };

  export  async function PostProduct(product) {


    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
  /*
      if (response.ok) {
        alert("Sucessfully Saved!");
      } else {
        alert("Error Saving Entity.");
      }*/
     
    } catch (error) {
      console.error("Error:", error);
    }
  
    return (
      <div>
      
      </div>
    );
}

export async function PutProduct(product) {

  const productData = product

  try {
      const response = await fetch(`http://localhost:3000/products/${product.id}`,{
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(productData)
      });
  
      
      if (!response.ok) {
          throw new Error(`Error updating product with id ${product.id}`);
      }

      return { message: `product with id ${product.id} updated successfully` };
  
    } catch (error) {
      throw error;
    }

}

export async function DeleteProduct(id) {

  try {
      const response = await fetch(`http://localhost:3000/products/${id}`,{

          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          throw new Error(`Error deleting Product with id ${id}`);
      }

      return { message: `Product with id ${id} deleted successfully` };
  
    } catch (error) {
      throw error;
    }

}

