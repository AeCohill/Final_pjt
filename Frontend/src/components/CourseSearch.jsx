import { Link, useSearchParams } from "react-router-dom";

const products = [
   { id: 111, name: "Blaze", desc: "Keep warm on cold wintry nights." },
   { id: 222, name: "Comet", desc: "Light up the night without batteries." },
   { id: 333, name: "Doodle", desc: "Write on any surface." },
   { id: 444, name: "Bloom", desc: "Add a pleasing smell to any room." }
];

function ProductSearch() {
   const [searchParams, setSearchParams] = useSearchParams();

   let searchResults = [];

   // If user has entered search text, find what matches
   if (searchParams.get("prod")) {
      searchResults = products.filter(product => {
         const searchText = searchParams.get("prod").toLowerCase();
         return product.name.toLowerCase().includes(searchText);
      });
   }

   return (
      <>
         <h1>Product Search</h1>
         <input 
            type="search"
            placeholder="Search"
            value={searchParams.get("prod") || ""}
            onChange={(e) => setSearchParams({ "prod" : e.target.value })} />

         <ol>
            {searchResults.map(product => 
               <li key={product.id}>
                  <Link to={`/products/${product.id}`}>
                     {product.name}
                  </Link>
               </li>
            )}
         </ol>
      </>
   );
}

export default ProductSearch;