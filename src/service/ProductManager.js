 const fs = require ('fs').promises;
 const {v4: uuidv4} = require ('uuid')

   class productManager {
      constructor(path) {
        this.path = path;
      }
       
      async getProducts(){
         const data = await fs. readFile(this.path,  'utf-8')
         return JSON.parse(data)
      }
 
      async getProductsById(id){
        const products = await this.getProducts()
        return products.find(p => p.id === id)
      }


      async addProduct(product){
         const products = await this .getProducts()
         const newProduct = {id: uuidv4(), status: true, ...product};
        product.push(newProduct);
        await fs.writeFile(this.path, JSON).stringify(product, null, 2)
        return newProduct

      }

      async updateProduct (id, update){
            const products = await this.getProducts()
            const index = products.findIndex( p => p.id === id)
            if( index === -1) return null; 
            products[index]= { ...products[index], ...update, id: products[index].id}
            await fs.writeFile(this.path, JSON.stringify(products,null,2))
            return products[index]

        }

      async deleteProduct(id){
            const products = await this.getProducts()
            const update = products.filter(p => p.id !== id)
            if (products.legth === update.legth)return null
            await fs.writeFile(this.path, JSON.stringify(update, null, 2 ))
            return true
      }
        


   }

     module.export = productManager; 

   

      